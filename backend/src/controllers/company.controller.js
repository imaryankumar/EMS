import mongoose from "mongoose";
import Company from "../models/company.model.js";
import CompanyToken from "../libs/companyToken.js";
import bcrypt from "bcryptjs";

export const companySignup = async (req, res) => {
  try {
    const {
      companyName,
      companyEmail,
      phoneNumber,
      address,
      gstNumber,
      password,
    } = req.body;
    if (
      !companyName ||
      !companyEmail ||
      !phoneNumber ||
      !address ||
      !gstNumber ||
      !password
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
        message: "Email and phone number already registered!!",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    if (!hashPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid password!!",
      });
    }

    const company = await Company.create({
      companyName,
      companyEmail,
      phoneNumber,
      isVerified: false,
      address,
      password: hashPassword,
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
    const { companyEmail, phoneNumber, password } = req.body;
    if (!companyEmail || !phoneNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!!",
      });
    }
    const companyExist = await Company.findOne({
      companyEmail,
      phoneNumber,
    });

    if (!companyExist) {
      return res.status(400).json({
        success: false,
        message: "email or phone number not valid!!",
      });
    }

    const isComPassword = await bcrypt.compare(password, companyExist.password);
    if (!isComPassword) {
      return res.status(403).json({
        success: false,
        message: "email or password Invalid!!",
      });
    }

    if (!companyExist.isVerified) {
      return res.status(403).json({
        success: false,
        message: "company is not verified, please contact support!!",
      });
    }

    const token = await CompanyToken(companyExist._id, res);

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

    if (isCompany.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Already verified Account!!",
      });
    }

    isCompany.isVerified = true;
    await isCompany.save();

    // message send your account verified
    //TODO

    return res.status(200).json({
      success: true,
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

export const companyProfileUpdate = async (req, res) => {
  try {
    const { companyId } = req.params;
    const companyDetails = req.body;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "companyId is required!!",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid companyId!!",
      });
    }
    if (!companyDetails || Object.keys(companyDetails).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one fields is required to update",
      });
    }

    const updateCompanyDetail = await Company.findByIdAndUpdate(
      companyId,
      companyDetails,
      { new: true }
    );
    if (!updateCompanyDetail) {
      return res.status(400).json({
        success: false,
        message: "Update details error found!!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company details updated successfully",
      updateCompanyDetail,
    });
  } catch (error) {
    console.error(
      error?.message || "Error on company profile update Controller"
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};

export const companyDeleteDetails = async (req, res) => {
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
        message: "Invalid companyId!!",
      });
    }
    const deleteCompanyDetail = await Company.findByIdAndDelete(companyId);

    if (!deleteCompanyDetail) {
      return res.status(400).json({
        success: false,
        message: "CompanyId not found!!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Delete company details successfully",
    });
  } catch (error) {
    console.error(error?.message || "Error on company delete Controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};

export const companyLogout = async (req, res) => {
  try {
    res.clearCookie("companyToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({
      success: true,
      message: "Logout successfully!",
    });
  } catch (error) {
    console.error(error?.message || "Error in Logout controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
