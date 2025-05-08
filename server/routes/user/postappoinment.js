const router = require("express").Router();
const User = require('../../models/postAppoinment');

router.post('/postappoinment', async (req, res) => {
  try {
    const { username, doctorName, date, time, description } = req.body;

    if (!username || !doctorName || !date || !time || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }


    let user = await User.findOne({ username });

    if (!user) {

      user = new User({
        username,
        bookings: [{ doctorName, date, time, description }],
      });
    } else {
      user.bookings.push({ doctorName, date, time, description });
    }

    await user.save();

    res.status(200).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Server Error: Unable to book appointment." });
  }
});

module.exports = router;
