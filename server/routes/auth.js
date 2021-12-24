const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const cors = require('cors');

//registration
router.post("/registration", async (req, res) => {
    try {
        //generate crypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //create new User
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        //save user and response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
});

//login
router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");    
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("wrong password!");

        res.status(200).json(user);
    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }
});
module.exports = router;