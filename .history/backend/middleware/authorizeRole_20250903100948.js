// middleware/authorizeRole.js

module.exports = function authorizeRole(role1, role2) {
  return (req, res, next) => {
    if (!req.user || (req.user.role !== role1 && req.user.role !== role2)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient permissions " });
    }
    next();
  };
};
