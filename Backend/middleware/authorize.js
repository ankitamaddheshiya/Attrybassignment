//importing packages and middleware
const jwt = require('jsonwebtoken');
require('dotenv').config();

//authorize middleware
const authorize = (roles) => {
  return (req, res, next) => {
    try {
      // Check if the user's role is allowed
      if (!roles.includes(req.role) && req.role !== "dealer") {
        return res.status(403).send({
          error: "Forbidden",
          message: "You do not have permission to access this resource.",
        });
      }

      next();
    } catch (error) {
      res.status(500).send({
        error: "Internal Server Error",
        message: "An error occurred.",
      });
    }
  };
};

//exporting authorize middleware
module.exports = authorize;
