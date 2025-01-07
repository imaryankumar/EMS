import express from "express";
import UserAuth from "../middleware/UserAuth.js";
import {
  allEmployeeDetails,
  deleteEmployeeDetails,
  employeeLogin,
  employeeLogout,
  employeeSignup,
  updateEmployeeDetails,
} from "../controllers/employee.controller.js";
import AllowedRoles from "../middleware/AllowedRoles.js";

const router = express.Router();

router.post("/signup", employeeSignup);
router.post("/login", employeeLogin);
router.post("/logout", UserAuth, employeeLogout);

router.patch(
  "/:employeeId",
  UserAuth,
  AllowedRoles(["HR", "Admin"]),
  updateEmployeeDetails
);
router.delete(
  "/:employeeId",
  UserAuth,
  AllowedRoles(["HR", "Admin"]),
  deleteEmployeeDetails
);
router.get("/all", allEmployeeDetails);

export default router;
