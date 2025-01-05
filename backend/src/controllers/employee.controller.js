import bcrypt from "bcrypt";
import createEmployeeId from "../libs/createEmployeeId.js";
import Employee from "../models/employee.model.js";
import UserToken from "../libs/userToken.js";

export const userSignup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      address,
      phoneNumber,
      password,
      role,
      designation,
      department,
      dateOfJoining,
      leaveBalance,
      employmentStatus,
      personalDetails,
      companyDetails,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !address ||
      !phoneNumber ||
      !password ||
      !role ||
      !designation ||
      !department ||
      !dateOfJoining ||
      !leaveBalance ||
      !employmentStatus ||
      !personalDetails?.emergencyContact ||
      !personalDetails?.dateOfBirth ||
      !personalDetails?.maritalStatus ||
      !companyDetails?.probationPeriod ||
      !companyDetails?.contractType
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const isEmployeeExist = await Employee.findOne({ email });
    if (isEmployeeExist) {
      return res.status(400).json({
        success: false,
        message: "Employee Already Exist!!",
      });
    }

    const employeeId = await createEmployeeId(fullName);

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "employeeId is not defined!!",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    if (!hashPassword) {
      return res.status(400).json({
        success: false,
        message: "Failed to hash password",
      });
    }

    const user = await Employee.create({
      fullName,
      email,
      address,
      phoneNumber,
      employeeId,
      password: hashPassword,
      role,
      designation,
      department,
      dateOfJoining,
      leaveBalance,
      employmentStatus,
      personalDetails,
      companyDetails,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user,
    });
  } catch (error) {
    console.error(error?.message || "Error in userSignup controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, phoneNumber, password, role } = req.body;
    if (!email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required!!",
      });
    }
    const isEmployeeExist = await Employee.findOne({ email });
    if (!isEmployeeExist) {
      return res.status(400).json({
        success: false,
        message: "Employee doesn't register!!",
      });
    }
    const isComparePassword = await bcrypt.compare(
      password,
      isEmployeeExist.password
    );
    if (!isComparePassword) {
      return res.status(400).json({
        success: false,
        message: "email or password invalid!!",
      });
    }

    const token = await UserToken(isEmployeeExist._id, res);

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
    });
  } catch (error) {
    console.error(error?.message || "Error on Login Controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};

export const userLogout = async (req, res) => {
  try {
    res.clearCookie("userToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({
      success: true,
      message: "Logout successfully!",
    });
  } catch (error) {
    console.error(error?.message || "Error in userLogout controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
