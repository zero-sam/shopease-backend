// /middleware/roleAuth.js
module.exports = function(allowedRoles = []) {
  // allowedRoles can be ['buyer'], ['seller'], ['admin'], ['buyer', 'seller'], etc.
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role.' });
    }
    next();
  };
};
