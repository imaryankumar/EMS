import mongoose from "mongoose";
import Employee from "../models/employee.model.js";

const AllowedRoles = (roles) => {
  return async (req, res, next) => {
    try {
      const user = req.user.id;
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not defined",
        });
      }
      if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({
          success: false,
          message: "Invalid userId!!",
        });
      }
      const userRole = await Employee.findById(user);
      if (roles.includes(userRole.role)) {
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

export default AllowedRoles;
