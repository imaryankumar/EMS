import express from "express";
import {
  addNewAsset,
  deleteAsset,
  getAllAssets,
  updateAsset,
} from "../controllers/asset.controller.js";
import UserAuth from "../middleware/UserAuth.js";

const router = express.Router();

router.post("/add-new", UserAuth, addNewAsset);
router.put("/update-asset/:assetId", UserAuth, updateAsset);
router.delete("/delete-asset/:assetId", UserAuth, deleteAsset);
router.get("/all-assets", UserAuth, getAllAssets);

export default router;
