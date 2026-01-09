import { JWT_SECRET } from "../config/env.js";
import jwt from 'jsonwebtoken';
import User from "../models/users.model.js";  // Changed to users.model.js

const authorize = async (req, res, next) => {
    try {
        let token;

        // Extract token from header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'Unauthorized' 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Find user
        const user = await User.findById(decoded.userId).select('-password');  // Exclude password

        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: 'User not found. Token invalid.' 
            });
        }

        // Attach user to request
        req.user = user;
        next();

    } catch (error) {
        console.error('Auth middleware error:', error.message);
        res.status(401).json({ 
            success: false,
            message: 'Authentication failed', 
            error: error.message 
        });
    }
};

export default authorize;