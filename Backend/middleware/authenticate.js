//importing modules and packages
const jwt = require('jsonwebtoken');
require('dotenv').config();

//authentication middleware
const authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      throw new Error('Unauthorized: Token not provided so Login First');
    }

    //verifying token
    jwt.verify(token, process.env.key, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          throw new Error('Unauthorized: Token has expired'.red);
        }
        throw new Error('Unauthorized: Invalid token');
      }

      // Add the decoded user ID to the request object
      req.userId = decoded.userId;
      req.role = decoded.role;

      next();
    });
  } catch (error) {
    console.error(('Error in middleware: ', error.message))
    res.status(401).json({ error: error.message });
  }
};

//exporting authenticate middleware
module.exports = authenticate;