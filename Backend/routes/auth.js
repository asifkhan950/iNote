const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator"); //import validator from express.js
const bcrypt = require("bcryptjs"); //imported bcrypt function
const jwt = require("jsonwebtoken");
//create user using: POST "/api/auth/createuser" doesnt required auth
const JWT_SECRECT = "EMPEROR";
var fetchuser = require('../middleware/fetchuser');
// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  //for validation of user input of email username and password
  [
    body("email", "Please Enter a Valid Email").isEmail(),
    body("name", "Please Enter a Valid Name").isLength({ min: 3 }),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    try {
      //using salt and hash should always be in try and catch and also it has to be a aysnc function
      const salt = await bcrypt.genSalt(10); // this syntax is for salt crypt
      const secPass = await bcrypt.hash(req.body.password, salt); // here we have secure password with hashing the
      //password will be in string form in the database
      const user = await User.create({
        email: req.body.email,
        password: secPass, // secure password with hash variable is used secpass
        name: req.body.name,
      });
      // here data object is used to get id of user in the database and mixed up with JWT_SECRECT to make a token
      const data = {
        user: {
          id: user.id, // id from database of user
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRECT); //signature of id
      
      success = true;
      res.json({ success,authtoken }); //output to the user a token of entry
    } catch (error) {
      // handle the error
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  //for validation of user input of email username and password
  [
    body("email", "Please Enter a Valid Email").isEmail(),
    body("password", "Password must be atleast 5 characters").exists(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body; // deconstruting email and password to verify
    try {
      let user = await User.findOne({ email }); // used findone function on Userfile to extract email if email exists in database
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "please login again with correct creditionals" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ error: "please login again with correct creditionals" });
      }

      const data = {
        user: {
          id: user.id, // id from database of user
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRECT); //signature of id
      success = true;
      res.json({ success, authtoken }); //output to the user a token of entry
    } catch (error) {
      // handle the error
      console.error(error);
      res.status(500).send("Server error + login");
    }
  }
);

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id; // here we take referece of id  
    const user = await User.findById(userId).select("-password")// here we collect all the data of User and puts into user except -password
    res.send(user) //res.send()is a function that sends the user object as a response to a request in a web server.
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router;
