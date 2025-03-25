const jwt = require('jsonwebtoken')

const authentication = async(req, res, next)=>{
  const token = req.cookies.authToken;
  // console.log("cookies : " ,req.cookies.authToken);
  // console.log("token is : " , token);
  if(!token){
    // console.log("token not found");
    return res.status(400).json({
      success : false,
      message : 'Unauthorised user !'
    })
  }
  // console.log(process.env.JWT_SECRET_KEY)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("decoded is : " , decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("error called in authentication : ", error);
    res.status(401).json({
      success : false,
      message : 'Unauthorised user !'
    })
  }

}


// function authentication(req,res,next){
//   const authHeader = req.headers['authorization'];
//   console.log("dejgghhjhfgdhggjh");
//     if(!authHeader){
//        return res.status(401).json({success:false, message:"not authenticate"});
//       }
//     const token = authHeader.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ success: false, message: 'Not authenticated: Token missing' });
//     }
//   try {
//     const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY); //it will return the payload i.e. user
//     req.user = decodedPayload;
//     console.log("dejgghhjhfgdhggjh",decodedPayload);
//     next();
//   }
//    catch (err) {
//     res.status(401).json({ success: false, message: 'Invalid token', error: err });
//   }
  
// }


module.exports = {authentication}
