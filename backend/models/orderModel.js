import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    paymentMethod: { type: String, required: true }, // Add paymentMethod field
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now() }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
