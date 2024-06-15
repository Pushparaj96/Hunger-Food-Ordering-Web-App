import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = token_decode.id; // Attach userId to req object
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Invalid token. Please login again" });
    }
};

export default authMiddleware;
