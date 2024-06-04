const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const OrderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    productId:{
        type: mongoose.Types.ObjectId,
        ref:"product"
    },
    address:{
        type:Object
    },
    quantity:{
type:Number
    },
    placedDate:{
        type:Date,
    },
    status:{
        type:String
    },
    payment:{
        type:String
    }
   
},{
    timestamps : true
})

const orderModel = new mongoose.model('Order',    OrderSchema);
module.exports = orderModel;