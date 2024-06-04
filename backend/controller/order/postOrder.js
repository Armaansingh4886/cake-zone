const Order = require("../../models/orderModel");
const addToCartModel = require("../../models/cartProduct")
const postOrder = async (req, res) => {
    const userId  = req.userId;
    if (!userId ) {
        return res.send({ error: "please fill all input fields" })
    }
    try {
        
        try {
            // Fetch the user document
            const allProduct = await addToCartModel.find({
                userId : userId
            })
            
            if (!allProduct) {
              console.log('User not found');
              return;
            }
        
            // Iterate over the items in the user's cart
            for (const cartItem of allProduct) {
              // Create a new order object
              const newOrder = new Order({
                userId: userId,
                productId: cartItem.productId,
                quantity:cartItem.quantity,
                address: req.body.address,
                status:"Ordered",
                payment:req.body.payment,
                placedDate : Date.now()
              });
        
              // Save the order object to the database
              await newOrder.save();
            }
            for (const cartItem of allProduct) {
                // Create a new order object
                 await addToCartModel.deleteOne({ _id : cartItem._id});
                };
            
            res.send({success:true,message:"ordered placed succesfully"})
            console.log('Orders created successfully');
        }catch (error) {
            console.error('Error creating orders:', error);
          } 
    } catch (error) {
        console.log(error)
    }
}
module.exports = postOrder