# BookGarnus Backend API

Backend API for BookGarnus - A modern booking management system.

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- ES6 Modules

## Features
- RESTful API architecture
- CRUD operations for bookings
- MongoDB Atlas integration
- Environment-based configuration
- Error handling middleware

## API Endpoints

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

## Setup

1. Clone the repository
2. Install dependencies:
```bash
   npm install
```
3. Create `.env.development` file:
```
   PORT=8080
   MONGO_URI=your_mongodb_uri
   NODE_ENV=development
```
4. Run development server:
```bash
   npm run dev
```

## Project Structure
```
├── config/          # Configuration files
├── database/        # Database connection
├── models/          # Mongoose models
├── controllers/     # Business logic
├── routes/          # API routes
└── server.js        # Entry point
```

## Coming Soon
- User authentication with JWT
- Input validation with express-validator
- Rate limiting
- API documentation with Swagger
