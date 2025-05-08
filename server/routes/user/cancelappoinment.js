const router = require("express").Router();
const UserBookings = require('../../models/postAppoinment');

router.delete('/cancelAppointment', async (req, res) => {
  try {
    const { username, doctorName } = req.body;

    const user = await UserBookings.findOneAndUpdate(
      { username },
      { $pull: { bookings: { doctorName } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User or appointment not found" });
    }

    res.status(200).json({ message: "Appointment canceled successfully", bookings: user.bookings });
  } catch (error) {
    console.error("Error canceling appointment:", error);
    res.status(500).json({ message: "Server Error: Unable to cancel appointment" });
  }
});

module.exports = router;
