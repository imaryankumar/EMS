import bcrypt from "bcrypt";
import createEmployeeId from "../libs/createEmployeeId.js";
import Employee from "../models/employee.model.js";
import UserToken from "../libs/userToken.js";

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

export const employeeLogin = async (req, res) => {
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

    if (isEmployeeExist.phoneNumber !== phoneNumber) {
      return res.status(403).json({
        success: false,
        message: "Invalid phone number.",
      });
    }

    if (isEmployeeExist.role !== role) {
      return res.status(403).json({
        success: false,
        message: `Access denied for role: ${role}.`,
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
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalEmployCount = await Employee.countDocuments(filterCriteria);

    if (!allEmployee || allEmployee.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No employees found with the given criteria.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Employee details fetched successfully",
      totalEmployee: totalEmployCount,
      currentPage: page,
      totalPage: Math.ceil(totalEmployCount / limit),
      employees: allEmployee,
    });
  } catch (error) {
    console.error(error?.message || "Error in all employee profile controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
