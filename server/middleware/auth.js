// // E:\StayHotel\server\middleware\auth.js

// const jwt = require('jsonwebtoken');

// module.exports = function(req, res, next) {
//   // Get token from the 'x-auth-token' header
//   const token = req.header('x-auth-token');

//   // Check if no token is found
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   // Verify the token
//   try {
//     // process.env.JWT_SECRET is your secret key stored in your .env file
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // FIX: Assign the entire decoded payload to req.user,
//     // because the payload is { id: '...', role: '...' }
//     req.user = decoded;
    
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };


// server/middleware/auth.js

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Correctly assigns the { id, role } payload
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};