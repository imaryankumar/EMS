import express from "express";
import UserAuth from "../middleware/UserAuth.js";
import {
  allEmployeeDetails,
  deleteEmployeeDetails,
  employeeForgotPassword,
  employeeLogin,
  employeeLogout,
  employeeResetPassword,
  employeeSignup,
  getEmployeeDetail,
  updateEmployeeDetails,
} from "../controllers/employee.controller.js";
import AllowedRoles from "../middleware/AllowedRoles.js";
import CompanyAuth from "../middleware/CompanyAuth.js";

const router = express.Router();

router.post("/signup",CompanyAuth, employeeSignup);
router.post("/login", employeeLogin);
router.post("/logout", UserAuth, employeeLogout);
router.post("/forgot", employeeForgotPassword);
router.patch("/reset/:tokenId", employeeResetPassword);
router.get("/single",UserAuth,getEmployeeDetail);

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
