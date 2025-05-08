const router = require("express").Router();
const Appoinment = require("../../models/postAppoinment");

router.post('/assign', async (req, res) => {
  const { username, doctorUsername, newDoctorname } = req.body;

  if (!username || !doctorUsername || !newDoctorname) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {

    const user = await Appoinment.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const alreadyAppointed = user.bookings.some((b) => b.doctorName === newDoctorname);

    if (alreadyAppointed) {
      return res.status(200).json({ message: 'User is already appointed with this doctor.' });
    }

    const booking = user.bookings.find((b) => b.doctorName === doctorUsername);

    if (!booking) {
      return res.status(404).json({ error: 'No bookings found for the specified doctor.' });
    }

    booking.doctorName = newDoctorname;

    await user.save();

    res.status(200).json({ message: 'Doctor assigned successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
