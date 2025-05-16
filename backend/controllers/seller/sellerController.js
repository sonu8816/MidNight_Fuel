const { createToken } = require("../../config/jwt");
const Seller = require("../../model/sellerModel");

async function signupSeller(req, res) {
  // console.log("signupSeller");
  const { name, email, password, phone, UID, hostel, room } = req.body;

  // console.log(typeOf (hostel), typeOf (room));
  try {
    if (!name || !email || !password || !phone || !UID || !hostel || !room) {
      return res.status(200).json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      console.log(existingSeller);
      return res.status(200).json({
        success: false,
        message: "Seller already exists",
      });
    }
    let seller = new Seller({
      name,
      email,
      password,
      phone,
      UID,
      hostel,
      room,
    });
    const sellerSaved = await seller.save();
    // console.log("ss: ", sellerSaved);
    // const token = createToken({ email, sellerId: sellerSaved._id });
    // res.cookie("authToken", token, {
    //   httpOnly: true, // Makes the cookie inaccessible via JavaScript
    //   secure: false, // Ensures cookie is sent over HTTPS (set to false for local development)
    //   sameSite: "Strict", // Prevents CSRF attacks
    //   maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
    // });
    // req.user = { sellerId: seller._id };
    res.status(201).json({
      success: "true",
      data: sellerSaved,
      message: "Request sent to Admin",
    });
  } catch (err) {
    console.log("eror is ", err);
    res.status(200).json({
      success: "false",
      message: err,
    });
  }
}

async function loginSeller(req, res) {
  const { email, password } = req.body;
  //console.log('login',email, password)
  try {
    if (!email || !password) {
      return res.status(200).json({
        success: false,
        message: "Email and password are required",
      });
    }
    let seller = await Seller.findOne({ email, password });
    if (!seller) {
      return res.status(200).json({
        success: "false",
        message: "Invalid credentials",
      });
    }
    if (!seller.varified) {
      return res.status(200).json({
        success: false,
        message: "Seller is not varified Please wait...",
      });
    }
    const token = createToken({ email, sellerId: seller._id });
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    req.user = { sellerId: seller._id };
    // console.log("req.user : ", req.user);
    res.status(200).json({
      success: "true",
      data: seller,
      token,
    });
  } catch (err) {
    console.log("eror is ", err);
    res.status(200).json({
      success: "false",
      message: err,
    });
  }
}

async function logoutSeller(req, res) {
  try {
    res.clearCookie("authToken", {
      httpOnly: true, // Ensure this matches the original cookie settings
      secure: false, // Use true if your app is running over HTTPS
      sameSite: "Strict", // sameSite setting should match
      maxAge: 0,
    });
    res.status(200).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    console.log("logout seller: ", error);
    res.status(200).json({
      success: false,
    });
  }
}

async function resetPassword(req, res) {
  const { email, UID, newPassword } = req.body;
  console.log("reset called : ", email, UID, newPassword);
  try {
    if (!email || !UID || !newPassword) {
      return res.status(200).json({
        success: false,
        message: "insufficient Data",
      });
    }

    const userData = await Seller.findOne({ email, UID });
    if (!userData) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }

    userData.password = newPassword;
    await userData.save();

    res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log("logout seller: ", error);
    res.status(200).json({
      success: false,
    });
  }
}

module.exports = { signupSeller, loginSeller, logoutSeller, resetPassword };
