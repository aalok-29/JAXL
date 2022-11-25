const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/verify", async (req, res) => {
	
	try {
		otp=genOtp();
    console.log(otp);
	res.sendFile(__dirname+"/otp-validation.html");
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send();

		const validOtp = await bcrypt.compare(
			req.body.otp,
			user.otp
		);
		if (!validOtp)
			return res.status(401).send({ message: "Wrong Otp" });

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server " });
	}
	
});



module.exports = router;
