const router = require("express").Router();
const Appoinments = require('../../models/postAppoinment');

router.get('/enquiries/:doctorName', async (req, res) => {
    
    const { doctorName } = req.params;
    try {
        const appoinments = await Appoinments.find(
            { "bookings.doctorName": doctorName },
            { username: 1, "bookings.$": 1 }
        );

        const enquiries = appoinments.map(user => {
            const booking = user.bookings[0];
            return {
                _id: user._id,
                username: user.username,
                doctorName: booking.doctorName,
                time: booking.time,
                date: booking.date,
                description: booking.description,
                status: booking.status,
            };
        });

        res.status(200).json(enquiries);
    } catch (error) {
        console.error("Error fetching enquiries:", error);
        res.status(500).json({ message: "Server Error: Unable to fetch enquiries" });
    }
});

module.exports = router;
