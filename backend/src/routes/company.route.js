import express from "express";
import {
  companyDeleteDetails,
  companyLogin,
  companyLogout,
  companyProfileUpdate,
  companySignup,
  companyVerified,
} from "../controllers/company.controller.js";
import CompanyAuth from "../middleware/CompanyAuth.js";

const router = express.Router();

router.post("/signup", companySignup);
router.post("/login", companyLogin);
router.post("/logout", CompanyAuth, companyLogout);
router.patch("/access-verify/:companyId", companyVerified);
router.put("/update-details/:companyId", CompanyAuth, companyProfileUpdate);
router.delete("/delete-details/:companyId", CompanyAuth, companyDeleteDetails);

export default router;
