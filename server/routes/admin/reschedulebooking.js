const express = require("express");
const router = express.Router();
const User = require('../../models/postAppoinment');

router.post('/reschedule', async (req, res) => {
    
    const { patientname, doctorname, date, time } = req.body;
    if (!patientname || !doctorname || !date || !time) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const user = await User.findOne({ username: patientname });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const booking = user.bookings.find((b) => b.doctorName === doctorname);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        booking.date = date;
        booking.time = time;
        booking.status = 'reschedule';

        await user.save();

        res.status(200).json({ message: 'Booking rescheduled successfully.' });
    } catch (error) {
        console.error('Error rescheduling booking:', error);
        res.status(500).json({ message: 'An error occurred while rescheduling the booking.' });
    }
});

module.exports = router;
