const router = require("express").Router();
const UserBookings = require('../../models/postAppoinment');

router.get('/getUserBookings/:username', async (req, res) => {
    try {
        const { username } = req.params;

        const user = await UserBookings.findOne({ username });

        if (!user) {
            return res.status(200).json([]);
        }

        res.status(200).json(user.bookings);
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        res.status(500).json({ message: "Server Error: Unable to fetch bookings." });
    }
});

module.exports = router;
