const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");

// register endpoint
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("mobile", "Please enter a 10 digit mobile number").isLength({
      min: 10,
      max: 10,
    }),
    check("address", "Address is required").not().isEmpty(),
    check("email", "Enter a valid email address").isEmail(),
    check("password", "Please enter a password with 6 or more chars").isLength({
      min: 4,
    }),
    check("aadhaar", "Please upload your aadhaar").not().isEmpty(),
    check("photo", "Please upload your profile picture").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, mobile, address, email, password, aadhaar, photo } = req.body;

    try {
      const aadhaarBuf = Buffer.from(aadhaar);
      const photoBuf = Buffer.from(photo);

      const user = new User({
        name: name,
        mobile: mobile,
        address: address,
        email: email,
        password: password,
        aadhaar: aadhaarBuf,
        photo: photoBuf,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      return res.status(201).json({ message: "User saved successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Sever error");
    }
  }
);

// profile endpoint
router.get("/", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User does not exist" });
    }

    let aadhaar64 = user.aadhaar.toString();
    let photo64 = user.photo.toString();

    const { name, mobile, address, email } = user;

    const profile = {
      name: name,
      mobile: mobile,
      address: address,
      email: email,
      aadhaar: aadhaar64,
      photo: photo64,
    };

    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
