import express from "express"
import { addNewAsset, deleteAsset, updateAsset } from "../controllers/asset.controller.js";
import UserAuth from "../middleware/UserAuth.js"

const router = express.Router();

router.post("/add-new",UserAuth, addNewAsset);
router.put("/update-asset/:assetId",UserAuth,updateAsset);
router.delete("/delete-asset/:assetId",UserAuth,deleteAsset);



export default router;