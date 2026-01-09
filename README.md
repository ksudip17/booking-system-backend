# BookGarnus Backend API

🚀 **Live API:** https://bookgarnus-api.onrender.com/

## Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user

### Bookings (Protected)
- `GET /api/v1/bookings` - Get all user bookings
- `POST /api/v1/bookings` - Create booking
- `GET /api/v1/bookings/:id` - Get single booking
- `PUT /api/v1/bookings/:id/edit` - Update booking
- `DELETE /api/v1/bookings/:id` - Delete booking

All booking routes require `Authorization: Bearer <token>` header.
