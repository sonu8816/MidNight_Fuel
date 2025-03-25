const jwt = require('jsonwebtoken');

const adminAuthenticate = async(req, res, next)=>{
    // console.log(req.headers);
    const {admintoken} = req.headers;
    // console.log(admintoken);
    if(!admintoken){

        return res.status(200).json({
            success: false,
            message: "Unauthorised user !"
        })
    }

    try {
        const decode = jwt.verify(admintoken, process.env.ADMIN_JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        console.log("error called in authentication : ", error);
        res.status(200).json({
            success: false,
            message: "unauthorised user !"
        })
    }
}

module. exports = {adminAuthenticate};