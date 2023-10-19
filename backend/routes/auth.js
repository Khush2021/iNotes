const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
require("dotenv").config();
const router = express.Router();

const jwt_secret = process.env.JWT_SECRET;

//ROUTE 1; creating a user using: POST "api/auth/signup", No login required
router.post(
  "/signup",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Minimum length of password is 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ success, errors: result.array() });
    }

    try {
      let x = await User.findOne({ email: req.body.email });
      if (x) {
        return res
          .status(400)
          .send({ success, error: "Email already exists!" });
      }
      const salt = await bcryptjs.genSalt(10);
      const secPass = await bcryptjs.hash(req.body.password, salt);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      }).save();
      // user.save();
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, jwt_secret);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ success, error: "Internal Server Error!" });
    }
  }
);

//ROUTE 2; authenticating user using: POST "api/auth/login",
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ success, errors: result.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials.",
        });
      }

      const passwordCompare = await bcryptjs.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials.",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, jwt_secret);
      success = true;
      res.json({ success, authtoken: authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ success, error: "Internal Server Error!" });
    }
  }
);

//ROUTE 3: GET user details using: POST "api/auth/getuser"
router.post("/getuser", fetchUser, async (req, res) => {
  let success = false;

  try {
    const userID = req.user.id;
    //selecting user excluding password
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success, error: "Internal Server Error!" });
  }
});

module.exports = router;
