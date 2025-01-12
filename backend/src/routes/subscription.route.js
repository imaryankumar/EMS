import express from "express"
import { subscripitionPlan } from "../controllers/subscription.controller.js";
import CompanyAuth from "../middleware/CompanyAuth.js";

const router = express.Router();


router.post("/add-plan",CompanyAuth, subscripitionPlan);


export default router;