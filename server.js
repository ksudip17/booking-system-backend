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


pp.use(cors({
    origin: [
      'http://localhost:5173',
      'https://bookgarnus.vercel.app', 
      'https://*.vercel.app'
    ],
    credentials: true
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/auth", authRouter);


app.use(errorMiddleware)


let bookings = [];
// Health check route
// Add this after app.use(express.json()) and before app.use("/api/v1/bookings")
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'active',
    message: 'BookGarnus API is running',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/v1/auth/register',
        login: 'POST /api/v1/auth/login'
      },
      bookings: {
        getAll: 'GET /api/v1/bookings (protected)',
        create: 'POST /api/v1/bookings (protected)',
        update: 'PUT /api/v1/bookings/:id/edit (protected)',
        delete: 'DELETE /api/v1/bookings/:id (protected)'
      }
    }
  });
});


app.listen(PORT, async() => {
    console.log(`Server is Listening on http://localhost:${PORT}`);
    await connectToDatabase();
});