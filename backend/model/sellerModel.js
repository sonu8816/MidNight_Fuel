const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role: {
        type: String,
        default: 'seller'
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true

    },
    UID:{
        type:Number,
        required:true
    },
    hostel:{
        type:String,
        required:true
    },
    room:{
        type:String,
        required:true
    },
    varified:{
        type:Boolean,
        default:false
    }
});

const userModel = new mongoose.model('Sellers',userSchema);
module.exports = userModel;