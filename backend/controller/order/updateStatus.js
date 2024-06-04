const Order = require("../../models/orderModel");
const addToCartModel = require("../../models/cartProduct")
const updateStatus = async (req, res) => {
    // const userId  = req.userId;
    // if (!userId ) {
    //     return res.send({ error: "please fill all input fields" })
    // }
    try {
        
        try {
            // Fetch the user document
           await Order.updateOne({_id:req.body.id},{$set:{status:req.body.status}})
            
            
        
            
            
            
            res.send({success:true,message:"ordered status changed succesfully"})
            console.log('Orders created successfully');
        }catch (error) {
            console.error('Error creating orders:', error);
          } 
    } catch (error) {
        console.log(error)
    }
}
module.exports = updateStatus