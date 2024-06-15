import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';

// Placing user order from frontend

const placeOrder = async (req, res) => {

    try {
        const newOrder = new orderModel({
            userId: req.userId, // Use userId from the request object
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            paymentMethod: 'COD' // Store the payment method as COD
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

        res.json({ success: true, message: "Order placed successfully with Cash on Delivery." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error placing order." });
    }
};

// user orders for frontend 

const userOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

// listing orders for admin panel

const listOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log({success:false,message:"error"});
    }
}

// api for updating order status

const updateStatus = async (req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"status updated"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export { placeOrder,userOrders,listOrders,updateStatus };
