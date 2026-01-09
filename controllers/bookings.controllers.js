import Bookings from "../models/bookings.model.js";

// Get all bookings for logged-in user
export const getAllBookings = async (req, res, next) => {
    try {
        
        const allBookings = await Bookings.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: allBookings.length,
            data: allBookings,
        });
    } catch (err) {
        next(err);
    }
};

// Get single booking by ID
export const getBookingById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = await Bookings.findOne({ 
            _id: id, 
            user: req.user._id 
        });

        if (!booking) {
            const error = new Error('Booking not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Booking found successfully',
            data: booking,
        });

    } catch (error) {
        next(error);
    }
};

// Create new booking
export const createBooking = async (req, res, next) => {
    try {
        
        const { name, email, phone, date } = req.body;

        if (!name || !date) {
            const error = new Error("Name and date are required");
            error.statusCode = 400;
            throw error;
        }

        // Create booking with user reference
        const booking = new Bookings({
            name,
            email,
            phone,
            date,
            user: req.user._id  // Associate with logged-in user
        });
        
        await booking.save();

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: booking,
        });

    } catch (err) {
        console.error(' Error creating booking:', err.message);
        next(err);
    }
};

// Update booking
export const updateBookingById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Find booking that belongs to this user
        const booking = await Bookings.findOne({ 
            _id: id, 
            user: req.user._id 
        });

        if (!booking) {
            const error = new Error('Booking not found');
            error.statusCode = 404;
            throw error;
        }

        // Update booking
        const updatedBooking = await Bookings.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Booking updated successfully',
            data: updatedBooking,
        });

    } catch (error) {
        next(error);
    }
};

// Delete booking
export const deleteBookingById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Find and delete booking that belongs to this user
        const booking = await Bookings.findOneAndDelete({ 
            _id: id, 
            user: req.user._id 
        });

        if (!booking) {
            const error = new Error('Booking not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully',
            data: {}
        });

    } catch (error) {
        next(error);
    }
};