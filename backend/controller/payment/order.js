const Order = require("../../models/orderModel")

const Razorpay = require("razorpay");
const crypto = require("crypto");

const orderPayment= async(req,res)=>{
    try {
		console.log("yes");
		const instance = new Razorpay({
			key_id: "rzp_test_Q7DtEmCmUWr3xD",
			key_secret: "AcYgKzfg2yNuIolhxR1o0kvD",
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, async (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			await order;
		console.log(order);
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}

}

module.exports = orderPayment