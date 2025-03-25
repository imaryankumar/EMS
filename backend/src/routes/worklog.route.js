import express from "express";
import {
  AddProjectWork,
  AddWorkLog,
  GetAllWorkLog,
  GetLogsData,
  ProjectWiseData,
  RemoveProjectWork,
  UpdateWorkLog,
} from "../controllers/worklog.controller.js";
import UserAuth from "../middleware/UserAuth.js";
import AllowedRoles from "../middleware/AllowedRoles.js";

const router = express.Router();

router.post("/add-work", UserAuth, AddWorkLog);
router.get("/all-logs", UserAuth, GetAllWorkLog);
router.put("/update-work/:workId", UpdateWorkLog);
router.get("/all-works", UserAuth, GetLogsData);

router.post(
  "/addProject",
  UserAuth,
  AllowedRoles(["Admin", "HR"]),
  AddProjectWork
);
router.post(
  "/removeProject",
  UserAuth,
  AllowedRoles(["Admin", "HR"]),
  RemoveProjectWork
);

router.get(
  "/:employeeId/:projectName",
  UserAuth,
  AllowedRoles(["Admin", "HR"]),
  ProjectWiseData
);

export default router;
