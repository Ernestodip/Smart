
const authMiddleware = (req, res, next) => {
    req.user = { isAdmin: true }; 
    next();
  };
  
  module.exports = authMiddleware;
  