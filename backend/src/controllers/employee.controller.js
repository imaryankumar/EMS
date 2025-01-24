import bcrypt from "bcryptjs";
import createEmployeeId from "../libs/createEmployeeId.js";
import Employee from "../models/employee.model.js";
import UserToken from "../libs/userToken.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Company from "../models/company.model.js";

export const employeeSignup = async (req, res) => {
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
      profilePic,
      reportingManager,
      gender,
      jobType,
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
      !companyDetails?.contractType ||
      !gender ||
      !jobType
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be 6 length",
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
    if (!mongoose.Types.ObjectId.isValid(req.company.companyId)) {
      return res.status(400).json({
        success: false,
        message: "CompanyId Invalid!!",
      });
    }

    const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${fullName.split(" ")[0]}`;
    const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${fullName.split(" ")[0]}`;

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
      gender,
      jobType,
      reportingManager,
      company: req.company.companyId,
      profilePic: gender === "male" ? maleProfilePic : femaleProfilePic,
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

export const employeeLogin = async (req, res) => {
  try {
    const { email, phoneNumber, password } = req.body;
    if (!email || !phoneNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required!!",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be 6 length",
      });
    }
    const isEmployeeExist = await Employee.findOne({ email });
    if (!isEmployeeExist) {
      return res.status(400).json({
        success: false,
        message: "Employee doesn't register!!",
      });
    }

    if (isEmployeeExist.phoneNumber !== phoneNumber) {
      return res.status(403).json({
        success: false,
        message: "Invalid phone number.",
      });
    }

    // if (isEmployeeExist.role !== role) {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Access denied for role: ${role}.`,
    //   });
    // }

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
      username: isEmployeeExist.fullName.replace(" ", "_"),
    });
  } catch (error) {
    console.error(error?.message || "Error on Login Controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};

export const employeeLogout = async (req, res) => {
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
    console.error(error?.message || "Error in Logout controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getEmployeeDetail = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employeeId!!",
      });
    }

    const getUserProfile = await Employee.findById(userId).select("-password");

    if (!getUserProfile) {
      return res.status(400).json({
        success: false,
        message: "Employee details not found!!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Employee Detail successfully",
      getUserProfile,
    });
  } catch (error) {
    console.error(error?.message || "Error in getEmployeeDetail controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const employeeForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "email is required!!",
      });
    }

    const isUserExist = await Employee.findOne({ email });

    if (!isUserExist) {
      return res.status(400).json({
        success: false,
        message: "employee doesn't exist!!",
      });
    }
    const token = await UserToken(isUserExist._id, res);

    // send token on user email id and click buttn then redirect reset password page in frontend...
    //TODO

    return res.status(200).json({
      success: true,
      message: "Forgot password successfully",
      token,
    });
  } catch (error) {
    console.error(error?.message || "Error in forgot controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const employeeResetPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const { tokenId } = req.params;

    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!!",
      });
    }

    if (!tokenId) {
      return res.status(400).json({
        success: false,
        message: "token is required!!",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Both password doesn't match!!",
      });
    }

    const verifyToken = await jwt.verify(tokenId, process.env.JWT_SECRET_KEY);
    if (!verifyToken) {
      return res.status(403).json({
        success: false,
        message: "unauthorization token!",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(verifyToken.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid token!!",
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const userUpdate = await Employee.findByIdAndUpdate(
      verifyToken.id,
      { password: hashPassword },
      { new: true }
    );

    if (!userUpdate) {
      return res.status(400).json({
        success: false,
        message: "user not update!!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Reset password successfully",
    });
  } catch (error) {
    console.error(error?.message || "Error in reset controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const updateEmployeeDetails = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const fieldsUpdate = req.body;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "EmployyeId is required!!",
      });
    }

    const validFields = [
      "fullName",
      "email",
      "address",
      "phoneNumber",
      "role",
      "designation",
      "department",
      "reportingManager",
      "leaveBalance",
      "assets",
      "employmentStatus",
      "personalDetails",
      "companyDetails",
    ];

    if (!fieldsUpdate || Object.keys(fieldsUpdate).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one fields is required to update",
      });
    }

    const invalidKeys = Object.keys(fieldsUpdate).filter(
      (key) => !validFields.includes(key)
    );

    if (invalidKeys.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid keys provided: ${invalidKeys.join(", ")}`,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employeeId!!",
      });
    }

    const updateEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      fieldsUpdate,
      { new: true }
    );
    if (!updateEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee not found!!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: updateEmployee,
    });
  } catch (error) {
    console.error(error?.message || "Error in update profile controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const deleteEmployeeDetails = async (req, res) => {
  try {
    const { employeeId } = req.params;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "EmployyeId is required!!",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employeeId!!",
      });
    }

    const deleteProfile = await Employee.findByIdAndDelete(employeeId);

    if (!deleteProfile) {
      return res.status(400).json({
        success: false,
        message: "EmployyeId not found!!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.error(error?.message || "Error in Delete profile controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const allEmployeeDetails = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      designation,
      department,
      role,
      reportingManager,
    } = req.query;

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const isAuthUser = req.user.id;

    // if (designation) filterCriteria.designation = designation;
    // if (department) filterCriteria.department = department;
    // if (role) filterCriteria.role = role;
    // if (reportingManager) filterCriteria.reportingManager = reportingManager;

    const filterCriteria = {};

    if (designation)
      filterCriteria.designation = {
        $regex: `^${designation}$`,
        $options: "i",
      };
    if (department)
      filterCriteria.department = { $regex: `^${department}$`, $options: "i" };
    if (role) filterCriteria.role = { $regex: `^${role}$`, $options: "i" };
    if (reportingManager)
      filterCriteria.reportingManager = {
        $regex: `^${reportingManager}$`,
        $options: "i",
      };

    const allEmployee = await Employee.find(filterCriteria)
      .select(
        "_id fullName email employeeId designation profilePic phoneNumber dateOfJoining role"
      )
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalEmployCount = await Employee.countDocuments(filterCriteria);

    if (!allEmployee || allEmployee.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No employees found with the given criteria.",
      });
    }

    const userFind =
      await Employee.findById(isAuthUser).select("fullName company");

    const companyId = userFind.company._id.toString();
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: "CompanyId Invalid!!",
      });
    }
    const companyDetails =
      await Company.findById(companyId).select("companyName");

    const maleCount = (await Employee.find({ gender: "male" })).length;
    const femaleCount = (await Employee.find({ gender: "female" })).length;
    const recentCount = (
      await Employee.find({ createdAt: { $gte: oneMonthAgo } })
    ).length;

    return res.status(200).json({
      success: true,
      message: "Employee details fetched successfully",
      allDetails: {
        totalEmployee: {
          totalEmployCount,
          maleCount,
          femaleCount,
          recentCount,
        },
        currentPage: page,
        totalPage: Math.ceil(totalEmployCount / limit),
        employees: allEmployee.reverse(),
        authUser: {
          fullName: userFind.fullName,
          companyName: companyDetails.companyName,
        },
      },
    });
  } catch (error) {
    console.error(error?.message || "Error in all employee profile controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
