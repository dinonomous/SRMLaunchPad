const express = require("express");
const UserModel = require("../models/user");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("welcome to auth")
})

router.post('/login',(req,res)=>{
    UserModel.findOne({ email : req.body.email }).then(user => {
        if(!user){
            return res.status(401).send({
                success: false,
                message: "no user found",
            })
        }

        if(!compareSync(req.body.password,user.password)){
            return res.status(401).send({
                success: false,
                message: "wrong password try again",
            })
        }

        const payload = {
            email: user.email,
            id: user._id
        }

        const token = jwt.sign(payload,"this is a secret key", { expiresIn: "1d" })

        return res.status(200).send({
            success: true,
            message: "logged in!",
            token: "Bearer " + token,
            email: user.email
        })
    })
})

router.post('/register',(req,res)=>{
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
})

module.exports = router;