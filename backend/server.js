const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const sellerProductRoute = require('./routes/seller/productRoutes');
const sellerRoute = require('./routes/seller/sellerRoutes');
const userRouter = require('./routes/user/userRouters.js')
const userProductRouter = require('./routes/user/userProductorRouter.js')
const adminRouter = require('./routes/admin/adminRoutes.js')
const adminControl = require('./routes/admin/controlRoutes.js')
const { authentication } = require('./middleware/authMiddleware');


const app = express();
dotenv.config();
PORT = process.env.PORT || 8888;
// console.log(process.env.DB_URL)

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Failed to connect ", error);
  });



  const corsOptions = {
    origin:["http://localhost:2001","http://localhost:2002","http://localhost:2003",], // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token", "admintoken" ], // Add your custom headers here
    credentials: true,
  };
  
  
  
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api/seller',sellerProductRoute)
app.use('/api/seller',sellerRoute)
app.use('/api/user',userRouter)
app.use('/api/user',userProductRouter)
app.use('/api/admin',adminRouter)
app.use('/api/admin',adminControl)


app.listen(PORT, (err)=>{
    if(err)
    console.log(err);
    else
    console.log("server started : ", PORT)
})
