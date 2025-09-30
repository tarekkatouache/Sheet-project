const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// const logAction = require("../utils/logAction");
const uploadProfileImage = require("../middleware/uploadProfileImage");
const upload = require("../middleware/upload");
const AuditLog = require("../models/AuditLog");

const router = express.Router(); // create a new router instance
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"; // secret key for JWT signing

// Register; // POST /api/auth/register http://localhost:5000/api/auth/register
router.post(
  "/register",
  uploadProfileImage.single("profileImage"),

  async (req, res) => {
    console.log("Received registration data:", req.file);
    //
    try {
      const {
        name,
        lastName,
        jobTitle,
        service,
        username,
        password,
        email,
        image,
        role,
      } = req.body;

      const existingUser = await User.findOne({ where: { username } });
      if (existingUser)
        return res.status(400).json({ message: "Username already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const imagePath = req.file
        ? `/uploads/profiles/${req.file.filename}`
        : null;

      const newUser = await User.create({
        name,
        lastName,
        jobTitle,
        service,
        username,
        password: hashedPassword,
        email,
        role,
        image: imagePath,
      });
      console.log("New user created:", newUser);
      await AuditLog.create({
        action: `logged`,
        userId: newUser.id,
        description: `New user registered: ${newUser.username}`,
        userLogged: newUser.username,
        entity: "User",
        createdAt: new Date(),
      });

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// Login //post /   http://localhost:5000/api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user)
      return res
        .status(400)
        .json({ message: "Nom d'utilisateur ou mot de passe invalide" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Nom d'utilisateur ou mot de passe invalide" });

    const token = jwt.sign(
      {
        // id: user.id,
        // email: user.email,
        // role: user.role,

        userId: user.id,
        username: user.username,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        service: user.service,
      },

      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log("Audit log created for user login");
    res.json({ message: "Login successful", token, user });
    await AuditLog.create({
      userId: "145", // user performing the action (from JWT)
      action: "LOGIN",
      userLogged: "req.user.username",
      entity: "User",
      entityId: "user.id",
      createdAt: new Date(),
      description: `User  logged in`,
    });
    // console.log("login successful", user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
