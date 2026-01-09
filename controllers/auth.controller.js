import User from "../models/users.model.js";
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';

export const Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            const error = new Error('Name, email, and password are required');
            error.statusCode = 400;
            throw error;
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // Create new user (password will be hashed by model's pre-save hook)
        const newUser = await User.create({ name, email, password });

        // Generate JWT
        const token = jwt.sign(
            { userId: newUser._id }, 
            JWT_SECRET, 
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Remove password from response
        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            createdAt: newUser.createdAt
        };

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                token,
                user: userResponse
            }
        });

    } catch (error) {
        next(error);
    }
};

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            const error = new Error('Email and password are required');
            error.statusCode = 400;
            throw error;
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            throw error;
        }

        // Compare password using model method
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            throw error;
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id }, 
            JWT_SECRET, 
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Remove password from response
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        };

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            data: {
                token,
                user: userResponse
            }
        });

    } catch (error) {
        next(error);
    }
};