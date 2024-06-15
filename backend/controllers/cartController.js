import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        const { userId } = req; // Get userId from req object
        const { itemId } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const { userId } = req; // Get userId from req object
        const { itemId } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (!cartData[itemId] || cartData[itemId] <= 0) {
            return res.status(400).json({ success: false, message: "Item not in cart" });
        }

        cartData[itemId] -= 1;

        if (cartData[itemId] <= 0) {
            delete cartData[itemId];
        }

        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        const { userId } = req; // Get userId from req object

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, cartData: userData.cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { addToCart, removeFromCart, getCart };
