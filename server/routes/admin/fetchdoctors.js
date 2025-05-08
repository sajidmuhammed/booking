const router=require("express").Router();
const Admin=require('../../models/admin');

router.get('/fetchdoctors', async (req, res) => {
    try {
        const admins = await Admin.find({}, 'username email profession phoneNumber');
        res.status(200).json(admins);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: "Server Error: Unable to fetch doctors" });
    }
});

module.exports=router;
