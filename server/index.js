const express=require("express");
const app=express();
const mongoose=require('mongoose');
const cors = require('cors');

const helmet=require('helmet');
const morgan=require('morgan');

const authMiddleware = require('./middleware/authMiddleware');

const authRoute=require("./routes/auth");

const fetchDoctorRoute=require("./routes/admin/fetchdoctors");
const fetchEnquiries = require("./routes/admin/fetchenquiries");
const changeBookingStatus = require("./routes/admin/changestatus");
const rescheduleBooking = require("./routes/admin/reschedulebooking");
const assignBookingToAnotherDoctor = require("./routes/admin/assignbooking");


const postAppoinment=require("./routes/user/postappoinment");
const fetchSingleUserBooking = require("./routes/user/fetchuserbookings");
const cancelAppoinment = require("./routes/user/cancelappoinment");

mongoose.connect('mongodb://127.0.0.1:27017/bookingapp')
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`${error} did not connect`));
  
  app.use(cors());
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("common"));

  //authentication
  app.use("/api/auth", authRoute);


  //for admin routing
  app.use("/api/admin", authMiddleware(['user', 'admin']), fetchDoctorRoute);
  app.use("/api/admin", authMiddleware(['user', 'admin']), fetchEnquiries);

  app.use("/api/admin", authMiddleware('admin'), changeBookingStatus);
  app.use("/api/admin", authMiddleware('admin'), rescheduleBooking);
  app.use("/api/admin", authMiddleware('admin'), assignBookingToAnotherDoctor);


  //for user routing
  app.use("/api/user", authMiddleware('user'), postAppoinment);
  app.use("/api/user", authMiddleware(['user', 'admin']), fetchSingleUserBooking);
  app.use("/api/user", authMiddleware('user'), cancelAppoinment);



app.listen(8800,()=>{
    console.log('backend server running');
})

