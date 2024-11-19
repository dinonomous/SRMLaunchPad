const UserModel = require("../../models/user");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { secretOrKey } = require("../../config/keys");

exports.login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user || !compareSync(req.body.password, user.password)) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      userType: "internal",
    };
    const token = jwt.sign(payload, secretOrKey, { expiresIn: "1d" });

    const cookieOptions =
      process.env.NODE_ENV === "development"
        ? { path: "/", httpOnly: true, maxAge: 86400000, sameSite: "Lax" }
        : {
            path: "/",
            httpOnly: true,
            maxAge: 86400000,
            sameSite: "None",
            secure: true,
          };

    const expiryDate = new Date(Date.now() + 86400000).toUTCString(); // 24 hours from now
    res.setHeader(
      "Set-Cookie",
      `token=${token}; Expires=${expiryDate}; ${Object.entries(cookieOptions)
        .map(([key, value]) => `${key}=${value}`)
        .join("; ")}`
    );

    // Send uid and email in the response body for client-side setting
    res.status(200).send({
      success: true,
      message: "Logged in!",
      email: user.email,
      uid: user._id,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Server error during login",
      error: err.message,
    });
  }
};

exports.googleSignIn = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
});

exports.googleCallback = (req, res) => {
  const { token } = req.user;
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.redirect("http://localhost:5174/");
};

exports.checkAuth = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "User not authenticated",
    });
  }

  jwt.verify(token, secretOrKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        success: false,
        message: "Invalid token",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User is authenticated",
      user: decoded,
    });
  });
};

exports.logout = (req, res) => {
  try {
    const cookieOptions =
      process.env.NODE_ENV === "development"
        ? { path: "/", httpOnly: true, maxAge: 0, sameSite: "Lax" }
        : {
            path: "/",
            httpOnly: true,
            maxAge: 0,
            sameSite: "None",
            secure: true,
          };

    res.setHeader("Set-Cookie", [
      `token=; ${Object.entries(cookieOptions)
        .map(([key, value]) => `${key}=${value}`)
        .join("; ")}`,
    ]);

    res.status(200).send({
      success: true,
      message: "Logged out successfully, all cookies cleared",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Logout failed",
    });
  }
};
