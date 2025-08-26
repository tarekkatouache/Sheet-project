const express = require("express");
const    = express.Router();
const User = require("../models/User");
const authenticateToken = require("../middleware/auth");
const authorizeRole = require("../middleware/authorizeRole"); // custom middleware to check admin role
const logAction = require("../utils/logAction");
const AuditLog = require("../models/AuditLog");

// ✅ Get own profile
router.get("/me", authenticateToken, async (req, res) => {
  const user = await User.findByPk(req.user.userId, {
    attributes: { exclude: ["password"] },
  });
  res.json(user);
});

// Update profile (Admin and User)
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("Received body:", req.body);

    const { name, lastName, jobTitle, service, email, image } = req.body;

    // Find the user first
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update allowed fields only
    user.name = name ?? user.name;
    user.lastName = lastName ?? user.lastName;
    user.jobTitle = jobTitle ?? user.jobTitle;
    user.service = service ?? user.service;
    user.email = email ?? user.email;
    user.image = image ?? user.image;

    await user.save();

    // Return updated user without password
    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    await AuditLog.create({
      userId: user.id, // the user performing the action
      action: "UPDATE",
      entity: "User",
      entityId: user.id,
      description: `User ${
        user.username
      } updated their profile from ${JSON.stringify(
        req.body
      )} to ${JSON.stringify(updatedUser)}  `,
    });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error updating profile." });
  }
});

// update role (Admin only)
// PUT /api/users/:id/role
router.put(
  "/:id/role",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    console.log("Updating user role...");
    const { role } = req.body;
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      oldRole = user.role; // Store old role for audit log
      user.role = role;
      console.log("User role before save:", user.role);

      await user.save();

      // Audit Log
      await AuditLog.create({
        userId: user.id, // the user performing the action
        action: "UPDATE",
        entity: "User",
        entityId: user.id,
        description: ` User ${user.username} - ${user.lastName} role changed from ${oldRole} to ${role} by ${req.user.username}`,
      });

      res.status(200).json({ message: "Role updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);
// ✅ Get user by ID
router.get("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] }, // exclude password from response
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// // get all users
// router.get("/", authenticateToken, async (req, res) => {
//   console.log("Fetching all users...");
//   try {
//     const users = await User.findAll({
//       attributes: { exclude: ["password"] },
//     });
//     res.json(users);
//   } catch (error) {
//     console.error("Failed to fetch users:", error);
//     res.status(500).json({
//       message: "Server error while fetching users.",
//       error: error.message,
//     });
//   }
// });
// get all users
// get all users
// get all users or filter by query
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { id, jobTitle, role } = req.query;

    // build dynamic filter
    const where = {};
    if (id) where.id = id;
    if (jobTitle) where.jobTitle = jobTitle;
    if (role) where.role = role;

    const users = await User.findAll({
      where,
      attributes: { exclude: ["password"] },
    });

    res.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({
      message: "Server error while fetching users.",
      error: error.message,
    });
  }
});

module.exports = router;

// // ✅ Get all users (Admin only)
// router.get("/", authenticateToken, async (req, res) => {
//   try {
//     const users = await User.findAll({
//       // attributes: { exclude: ["password"] },
//     });
//     res.json(users);
//   } catch (error) {
//     console.error("Failed to fetch users:", error);
//     res.status(500).json({
//       message: "Server error while fetching users.",
//       error: error.message,
//     });
//   }
// });

//
