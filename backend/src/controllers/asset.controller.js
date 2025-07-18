import mongoose from "mongoose";
import Asset from "../models/asset.model.js";
import Employee from "../models/employee.model.js";

export const addNewAsset = async (req, res) => {
  try {
    const { name, serialNumber, issuedDate, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(404).json({
        success: false,
        message: "Invalid UserId!!",
      });
    }
    if (!name || !serialNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const isAssetExist = await Asset.findOne({ serialNumber });
    if (isAssetExist) {
      return res.status(404).json({
        success: false,
        message: "Already Added!!",
      });
    }

    const asset = await Asset.create({
      name,
      serialNumber,
      issuedDate,
      status,
      assignedTo: req.user.id,
    });

    if (!asset) {
      return res.status(400).json({
        success: false,
        message: "Assets creation failed!!",
      });
    }

    const employee = await Employee.findById(req.user.id);
    if (!employee) {
      return res.status(400).json({
        success: false,
        message: "Employee not found!!",
      });
    }

    employee.assets.push(asset._id);
    await employee.save();

    return res.status(201).json({
      success: true,
      message: "Add New Assets Successfully",
      asset,
    });
  } catch (error) {
    console.error(error?.message || "Error in Add Assests controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const updateAsset = async (req, res) => {
  try {
    const { assetId } = req.params;
    const updateAsset = req.body;

    if (!assetId) {
      return res.status(400).json({
        success: false,
        message: "AssetId is required!!",
      });
    }

    if (!updateAsset || Object.keys(updateAsset).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one fields is required to update",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(assetId)) {
      return res.status(404).json({
        success: false,
        message: "Invalid AssetId!!",
      });
    }

    const newAsset = await Asset.findByIdAndUpdate(assetId, updateAsset, {
      new: true,
    });
    if (!newAsset) {
      return res.status(400).json({
        success: false,
        message: "Asset not found!!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Asset Update Successfully",
      newAsset,
    });
  } catch (error) {
    console.error(error?.message || "Error in Update Assest controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const { assetId } = req.params;

    if (!assetId) {
      return res.status(400).json({
        success: false,
        message: "AssetId is required!!",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(assetId)) {
      return res.status(404).json({
        success: false,
        message: "Invalid AssetId!!",
      });
    }

    const asset = await Asset.findByIdAndDelete(assetId);
    if (!asset) {
      return res.status(400).json({
        success: false,
        message: "Asset not found!!",
      });
    }

    const employee = await Employee.findById(req.user.id);
    if (!employee) {
      return res.status(400).json({
        success: false,
        message: "Employee not found!!",
      });
    }
    const assetIndex = employee.assets.indexOf(assetId);
    if (assetIndex > -1) {
      employee.assets.splice(assetIndex, 1);
      await employee.save();
    }

    return res.status(200).json({
      success: true,
      message: "Asset Delete Successfully",
    });
  } catch (error) {
    console.error(error?.message || "Error in Delete Assest controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getAllAssets = async (req, res) => {
  try {
    const getAssets = await Asset.find({
      assignedTo: req.user.id,
    }).select("-assignedTo");
    return res.status(200).json({
      success: true,
      message: "Get All Assets Successfully",
      getAssets,
    });
  } catch (error) {
    console.error(error?.message || "Error in Get All Assest controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
