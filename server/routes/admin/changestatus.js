const router = require("express").Router();
const User = require("../../models/postAppoinment");

router.post('/enquiries/changestatus', async (req, res) => {
  const { username, doctorName, status } = req.body;

  if (!username || !doctorName || !status) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const result = await User.updateOne(
      {
        username,
        "bookings.doctorName": doctorName,
      },
      {
        $set: { "bookings.$.status": status },
      }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: "No matching booking found to update." });
    }

    res.status(200).json({ message: `Booking status updated to ${status} successfully.` });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
