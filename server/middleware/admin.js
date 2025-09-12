// // E:\StayHotel\server\middleware\admin.js

// const User = require("../models/User");

// module.exports = async function (req, res, next) {
//   // This middleware should run AFTER the 'auth' middleware,
//   // so we can expect req.user to be available.
//   try {
//     // If req.user is just an id, fetch the user from DB
//     let user = req.user;
//     if (!user || !user.role) {
//       user = await User.findById(user);
//     }
//     if (!user || user.role !== "admin") {
//       return res
//         .status(403)
//         .json({ msg: "Access denied. Admin rights required." });
//     }
//     req.user = user; // Attach full user object for downstream use
//     next();
//   } catch (err) {
//     res.status(500).json({ msg: "Server error in admin middleware." });
//   }
// };
// server/middleware/admin.js

module.exports = function (req, res, next) {
  // This check runs AFTER auth.js, so req.user is available
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ msg: "Access denied. Admin rights required." });
  }
  next();
};
