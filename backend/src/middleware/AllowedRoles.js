const AllowedRoles = async (roles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role;
      if (!userRole) {
        return res.status(400).json({
          success: false,
          message: "user doesn't defined",
        });
      }
      if (roles.includes(userRole)) {
        next();
      } else {
        return res.status(403).json({
          success: false,
          message: "Access denied!!",
        });
      }
    } catch (error) {
      console.log(error?.message);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error!!",
      });
    }
  };
};
