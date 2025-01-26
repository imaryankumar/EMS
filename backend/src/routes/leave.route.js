import express from "express";
import {
  allLeaveApproved,
  applyLeaveForm,
  updateLeaveStatus,
} from "../controllers/leave.controller.js";
import UserAuth from "../middleware/UserAuth.js";
import AllowedRoles from "../middleware/AllowedRoles.js";

const router = express.Router();

router.post("/leave-apply", UserAuth, applyLeaveForm);
router.put(
  "/leave-update",
  UserAuth,
  AllowedRoles(["HR", "Team Lead", "Admin"]),
  updateLeaveStatus
);

router.get("/leave-approved", UserAuth, allLeaveApproved);

export default router;
