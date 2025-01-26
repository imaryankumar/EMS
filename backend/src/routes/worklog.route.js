import express from "express";
import {
  AddWorkLog,
  GetAllWorkLog,
  UpdateWorkLog,
} from "../controllers/worklog.controller.js";
import UserAuth from "../middleware/UserAuth.js";

const router = express.Router();

router.post("/add-work", UserAuth, AddWorkLog);
router.get("/all-logs", UserAuth, GetAllWorkLog);
router.put("/update-work/:workId", UpdateWorkLog);

export default router;
