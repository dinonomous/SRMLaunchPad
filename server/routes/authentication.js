const express = require("express");
const UserModel = require("../models/user");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { secretOrKey } = require("../config/keys");

router.get("/", (req, res) => {
  res.send("welcome to auth");
});

router.options("/login", (req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_API_URL);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

router.post("/login", async (req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_API_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  const email = req.body.email;

//   if (email.includes("@srmist.edu.in")) {
//     const username = email;
//     const password = req.body.password;

//     const cli_time = Date.now();
//     const serviceurl = encodeURIComponent(
//       "https://academia.srmist.edu.in/portal/academia-academic-services/redirectFromLogin"
//     );

//     const requestBody = `mode=primary&cli_time=${cli_time}&servicename=ZohoCreator&service_language=en&serviceurl=${serviceurl}`;

//     const response = await fetch(
//       `https://academia.srmist.edu.in/accounts/p/10002227248/signin/v2/lookup/${username}`,
//       {
//         method: "POST",
//         headers: {
//           Accept: "*/*",
//           "Content-Length": Buffer.byteLength(requestBody), // Calculate the length of the request body
//           "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
//           Cookie:
//             "74c3a1eecc=86320f99d3a5ec2b36381b7353a57d1a; zccpn=685736da-54a9-46dd-9bae-e138f51d331b; ZCNEWUIPUBLICPORTAL=true; cli_rgn=IN; f0e8db9d3d=983d6a65b2f29022f18db52385bfc639; iamcsr=ffce2ff9-0fa3-4583-92a5-651c5724f33b; _zcsr_tmp=ffce2ff9-0fa3-4583-92a5-651c5724f33b; JSESSIONID=EFE3E9A80B14A039EFA5EA5070FD8F3F",
//           Host: "academia.srmist.edu.in",
//           Origin: "https://academia.srmist.edu.in",
//           Referer:
//             "https://academia.srmist.edu.in/accounts/p/10002227248/signin?hide_fp=true&servicename=ZohoCreator&service_language=en&css_url=/49910842/academia-academic-services/downloadPortalCustomCss/login&dcc=true&serviceurl=https%3A%2F%2Facademia.srmist.edu.in%2Fportal%2Facademia-academic-services%2FredirectFromLogin",
//           "X-Zcsrf-Token": "iamcsrcoo=ffce2ff9-0fa3-4583-92a5-651c5724f33b",
//         },
//         body: requestBody,
//       }
//     );

//     const data = await response.json();
//     const userNameCorrect = data.message;

//     if (userNameCorrect === "User exists") {
//       const identifier = data.lookup.identifier;
//       const digest = data.lookup.digest;
//       const passwordUrl = `https://academia.srmist.edu.in/accounts/p/10002227248/signin/v2/primary/${identifier}/password?digest=${digest}&cli_time=${cli_time}&servicename=ZohoCreator&service_language=en&serviceurl=${serviceurl}`;
//       const passwordBody = {
//         passwordauth: {
//           password: password,
//         },
//       };

//       const passwordResponse = await fetch(passwordUrl, {
//         method: "POST",
//         headers: {
//           Accept: "*/*",
//           "Content-Length": Buffer.byteLength(JSON.stringify(passwordBody)),
//           "Content-Type": "application/json;charset=UTF-8",
//           Cookie:
//             "74c3a1eecc=86320f99d3a5ec2b36381b7353a57d1a; zccpn=685736da-54a9-46dd-9bae-e138f51d331b; ZCNEWUIPUBLICPORTAL=true; cli_rgn=IN; f0e8db9d3d=983d6a65b2f29022f18db52385bfc639; iamcsr=ffce2ff9-0fa3-4583-92a5-651c5724f33b; _zcsr_tmp=ffce2ff9-0fa3-4583-92a5-651c5724f33b; JSESSIONID=EFE3E9A80B14A039EFA5EA5070FD8F3F",
//           Host: "academia.srmist.edu.in",
//           Origin: "https://academia.srmist.edu.in",
//           Referer:
//             "https://academia.srmist.edu.in/accounts/p/10002227248/signin?hide_fp=true&servicename=ZohoCreator&service_language=en&css_url=/49910842/academia-academic-services/downloadPortalCustomCss/login&dcc=true&serviceurl=https%3A%2F%2Facademia.srmist.edu.in%2Fportal%2Facademia-academic-services%2FredirectFromLogin",
//           "X-Zcsrf-Token": "iamcsrcoo=ffce2ff9-0fa3-4583-92a5-651c5724f33b",
//         },
//         body: JSON.stringify(passwordBody),
//       });

//       const passwordData = await passwordResponse.json();
//       if (passwordData.message === "Sign in success") {
//         const payload = {
//             email: email,
//             userType: "external",
//           };
    
//           const token = jwt.sign(payload, `${secretOrKey}`, { expiresIn: "1d" });
    
//           return res.status(200).send({
//             success: true,
//             message: "logged in!",
//             token: "Bearer " + token,
//             email: email,
//           });
//       } else {
//         return res.status(401).send({
//             success: false,
//             message: "wrong password try again",
//           });
//       }
//     } else {
    //     return res.status(401).send({
    //         success: false,
    //         message: "no user found",
    //     });
    // }
//   } else {
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

      return res.status(200).send({
        success: true,
        message: "logged in!",
        token: "Bearer " + token,
        email: user.email,
      });
    });
//   }
});

router.options("/register", (req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_API_URL);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

router.post("/register", (req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_API_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  let user = new UserModel({
    email: req.body.email,
    password: hashSync(req.body.password, 10),
  });

  user
    .save()
    .then((user) => {
      res.send({
        success: true,
        message: "user created",
        user: {
          id: user._id,
          username: user.username,
        },
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "not created",
        error: err,
      });
    });
});

router.post("/check-email", async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    return res.status(200).json({ exists: true });
  } else {
    return res.status(200).json({ exists: false });
  }
});

module.exports = router;
