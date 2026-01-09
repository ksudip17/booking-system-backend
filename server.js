import express from "express";
import cors from "cors";
import { NODE_ENV, PORT } from "./config/env.js";
import connectToDatabase from "./database/monodb.js";
import cookieParser from "cookie-parser";
import Bookings from "./models/bookings.model.js";
import bookingRouter from "./routes/bookings.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import authRouter from "./routes/auth.routes.js";



const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/auth", authRouter);


app.use(errorMiddleware)


let bookings = [];
// Health check route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'BookGarnus API is running',
        version: '1.0.0',
        environment: NODE_ENV
    });
});


app.listen(PORT, async() => {
    console.log(`Server is Listening on http://localhost:${PORT}`);
    await connectToDatabase();
});