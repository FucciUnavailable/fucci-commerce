// const jwt = require('jsonwebtoken');

// const isAdmin = (req, res, next) => {
//   const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err || !decoded.isAdmin) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }
//     req.user = decoded;
//     next();
//   });
// };

// module.exports = isAdmin;
