const Order = require("../../models/orderModel")

const getOrder = async(req,res)=>{
    const orderId = req.userId;
    console.log("yes");
    console.log(orderId);
    try{
        const allProduct = await Order.find().sort({ createdAt : -1 }).populate("productId").populate("userId")
console.log(allProduct);
        res.json({
            message : "All Product",
            success : true,
            error : false,
            data : allProduct
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }

}

module.exports = getOrder