import express from "express";
import {
  companyLogin,
  companySignup,
  companyVerified,
} from "../controllers/company.controller.js";

const router = express.Router();

router.post("/signup", companySignup);
router.post("/login", companyLogin);
router.patch("/access-verify/:companyId", companyVerified);

export default router;
