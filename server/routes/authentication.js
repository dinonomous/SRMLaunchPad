const express = require("express");
const UserModel = require("../models/user");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { secretOrKey } = require('../config/keys');

router.get('/',(req,res)=>{
    res.send("welcome to auth")
})

router.options("/login", (req, res) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
  });

router.post('/login',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");

        UserModel.findOne({ email: req.body.email }).then((user) => {
          if (!user) {
            return res.status(401).send({
              success: false,
              message: "no user found",
            });
          }
    
          if (!compareSync(req.body.password, user.password)) {
            return res.status(401).send({
              success: false,
              message: "wrong password try again",
            });
          }
    
          const payload = {
            email: user.email,
            id: user._id,
            userType: "internal",
          };
    
          const token = jwt.sign(payload, `${secretOrKey}`, { expiresIn: "1d" });
          
          res.cookie("token", token, {
            path: "/",  // Available across the entire app
            domain: "srm-launch-pad-api.vercel.app",  // Your backend's domain
            httpOnly: false,  // Allow JavaScript to read the cookie (if needed)
            secure: false,  // Set to true if you're using HTTPS
            sameSite: 'Lax',  // Basic CSRF protection
          });
          

          return res.status(200).send({
            success: true,
            message: "logged in!",

            email: user.email,
          });
        });
})

router.options('/register', (req, res) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_API_URL);
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
  });

router.post('/register',(req,res)=>{
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_API_URL);
    res.header('Access-Control-Allow-Credentials', 'true');
    let user = new UserModel({
        email: req.body.email,
        password: hashSync(req.body.password,10)
    })

    user.save().then(user => {
        res.send({
            success: true,
            message: "user created",
            user:{
                id: user._id,
                username: user.username
            }

        })
    }).catch(err => {
        res.send({
            success: false,
            message: "not created",
            error: err

        })
    })
});

router.post('/check-email', async (req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
  
    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  });

module.exports = router;