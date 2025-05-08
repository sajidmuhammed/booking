const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['accept', 'reject', 'reschedule', ''], 
    default: '' 
  },
});

const userBookingSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  bookings: [bookingSchema],
});

const User = mongoose.model('userbooking', userBookingSchema);

module.exports = User;
