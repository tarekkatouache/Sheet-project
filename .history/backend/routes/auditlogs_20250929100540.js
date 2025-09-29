const authenticateToken = require("../middleware/auth");
const authorizeRole = require("../middleware/authorizeRole"); // custom middleware to check admin role
const express = require("express");
const router = express.Router();
