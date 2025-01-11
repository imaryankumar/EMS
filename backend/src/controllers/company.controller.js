import mongoose from "mongoose";
import Company from "../models/company.model.js";
import jwt from "jsonwebtoken";

export const companySignup = async (req, res) => {
  try {
    const { companyName, companyEmail, phoneNumber, address, gstNumber } =
      req.body;
    if (
      !companyName ||
      !companyEmail ||
      !phoneNumber ||
      !address ||
      !gstNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!!",
      });
    }
    const companyExist = await Company.findOne({
      $or: [{ companyEmail }, { phoneNumber }],
    });
    if (companyExist) {
      return res.status(400).json({
        success: false,
        message: "Email or phone number already registered!!",
      });
    }

    const company = await Company.create({
      companyName,
      companyEmail,
      phoneNumber,
      isVerified: false,
      address,
      gstNumber,
    });

    // Nofity admin for verification
    // TODO

    return res.status(201).json({
      success: true,
      message: "Company Registred successfully, please wait for verification",
      comanyId: company._id,
    });
  } catch (error) {
    console.error(error?.message || "Error on Compnay Signup Controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};

export const companyLogin = async (req, res) => {
  try {
    const { companyEmail, phoneNumber } = req.body;
    if (!companyEmail || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!!",
      });
    }
    const companyExist = await Company.findOne({
      companyEmail,
    });

    if (!companyExist) {
      return res.status(400).json({
        success: false,
        message: "email and phone number not found!!",
      });
    }

    if (!companyExist.isVerified) {
      return res.status(403).json({
        success: false,
        message: "company is not verified, please contact support!!",
      });
    }

    const token = await jwt.sign(
      { comanyId: companyExist._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Company Login successfully",
      token,
    });
  } catch (error) {
    console.error(error?.message || "Error on Company Login Controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};

export const companyVerified = async (req, res) => {
  try {
    const { companyId } = req.params;
    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "companyId is required!!",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid CompanyId!!",
      });
    }
    const isCompany = await Company.findById(companyId);
    if (!isCompany) {
      return res.status(400).json({
        success: false,
        message: "company doesn't exist!!",
      });
    }

    isCompany.isVerified = true;

    await isCompany.save();

    return res.status(200).json({
      success: false,
      message: "User Veriried Successfully",
      isCompany,
    });
  } catch (error) {
    console.error(error?.message || "Error on company verify Controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};
