const { verifyToken } = require("../../config/jwt.js");
const ordersModel = require("../../model/ordersModel.js");
const productModel = require("../../model/productModel.js");
const userModel = require('../../model/userModel.js');
const addToCart = async (req, res) => {
  try {
    const { token } = req.headers;
    const decoded = verifyToken(token);

    const { userId } = decoded;
    const { productId } = req.body;

    const user = await userModel.findById(userId);

    const productIndex = user.cart.findIndex(
      (product) => product.id == productId
    );

    if (productIndex > -1) {
      user.cart[productIndex].quantity += 1;
      user.markModified("cart");
    } else {
      user.cart.push({ id: productId, quantity: 1 });
    }

    await user.save();

    res.json({ message: "Product added to cart", success: true });
  } catch (err) {
    console.error("Error is:", err);

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const removeCartItems = async (req, res) => {
  try {
    const { token } = req.headers;
    const decoded = verifyToken(token);
    const { userId } = decoded;
    const { productId } = req.body;
    const user = await userModel.findById(userId);

    const productIndex = user.cart.findIndex(
      (product) => product.id == productId
    );
    if (productIndex > -1) {
      user.cart.splice(productIndex, 1);
      await user.save();
      res.json({ message: "Product removed from cart", success: true });
    } else {
      res.json({ message: "Product not found in cart", success: false });
    }
  } catch (error) {
    console.error("Error is:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateCartItems = async (req, res) => {
  try {
    const { token } = req.headers;
    const decoded = verifyToken(token);
    console.log(decoded);

    const { userId } = decoded;
    const { productId, quantity } = req.body;

    const user = await userModel.findById(userId);

    const productIndex = user.cart.findIndex(
      (product) => product.id == productId
    );

    if (productIndex > -1) {
      user.cart[productIndex].quantity = quantity;
      user.markModified("cart");
    } else {
      user.cart.push({ id: productId, quantity });
      console.log("Added new product to cart:", { id: productId, quantity });
    }

    await user.save();

    res.json({ message: "Product update to cart", success: true });
  } catch (err) {
    console.error("Error is:", err);

    res.status(400).json({
      success: "false",
      message: err.message,
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { token } = req.headers;
    // console.log(token);

    const decoded = verifyToken(token);
    const { userId } = decoded;
    const user = await userModel.findById(userId);
    const cartData = user.cart;
    res.send({ success: true, cartData });
  } catch (error) {
    console.error("Error is:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const orderplaced = async (req, res) => {
  const { token } = req.headers;
  const { cartData, address } = req.body;
  console.log(req.body);

  try {
    const decoded = verifyToken(token);
    const { userId } = decoded;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found", success: false });

    const commonDetail = {
      userId: userId,
      address: address,
      paymentMethod: address?.paymentMode || "COD", // Handle undefined paymentMode
      orderStatus: false,
      orderDate: new Date(), // ✅ FIXED: Store correct Date format
    };

    // Function to get product details
    async function findProductDetails(id) {
      const product = await productModel.findById(id);
      return {
        price: product ? product.price : 0,
        sellerId: product ? product.sellerId : null,
        productName: product ? product.productName : null,
      };
    }

    // Resolve product details with Promise.all
    const order = await Promise.all(
      cartData.map(async (element) => {
        const { price, sellerId, productName } = await findProductDetails(element.id);
        return {
          ...commonDetail,
          productId: element.id,
          orderAmount: price * element.quantity,
          sellerId: sellerId,
          productName: productName,
          quantity: element.quantity,
        };
      })
    );

    // Save orders to database
    const savedOrders = await ordersModel.insertMany(order);

    // Empty the user's cart
    user.cart = [];
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      orders: savedOrders,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const orders = async (req,res)=>{
  try {
    const { token } = req.headers;
    const decoded = verifyToken(token);
    const { userId } = decoded;
    // console.log(userId);
    const user = await userModel.findById(userId);
    const orders = await ordersModel.find({ userId: userId });
    return res.status(200).json({success:true, message: "Orders retrieved successfully", orders
      });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error",success:false });
      }
}



module.exports = {
  addToCart,
  removeCartItems,
  updateCartItems,
  getUserCart,
  orderplaced,
  orders
};
