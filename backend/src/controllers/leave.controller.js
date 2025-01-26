import mongoose from "mongoose";
import LeaveRequest, { leaveTypes } from "../models/leaveRequest.model.js";
import Employee from "../models/employee.model.js";
import Company from "../models/company.model.js";

export const applyLeaveForm = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    if (!startDate || !endDate || !leaveType || !reason) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!!",
      });
    }
    const isValidLeaveType = leaveTypes.includes(leaveType);

    if (!isValidLeaveType) {
      return res.status(400).json({
        success: false,
        message: "Invalid leave type!!",
        types: leaveTypes,
      });
    }

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (parsedStartDate > parsedEndDate) {
      return res.status(400).json({
        success: false,
        message: "Start date cannot be after end date!",
      });
    }

    const overlappingLeaves = await LeaveRequest.findOne({
      employee: req.user.id,
      status: { $nin: ["Rejected"] },
      $or: [
        { startDate: { $lte: parsedEndDate, $gte: parsedStartDate } },
        { endDate: { $lte: parsedEndDate, $gte: parsedStartDate } },
        {
          startDate: { $lte: parsedStartDate },
          endDate: { $gte: parsedEndDate },
        },
      ],
    });

    if (overlappingLeaves) {
      return res.status(400).json({
        success: false,
        message: "You already have a leave request during this period!",
      });
    }

    // TODO Notification send on your manager

    const leave = await LeaveRequest.create({
      employee: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    return res.status(201).json({
      success: true,
      message: "Leave apply successfully",
      leave,
    });
  } catch (error) {
    console.error(error?.message || "Error in apply leave controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateLeaveStatus = async (req, res) => {
  try {
    const { leaveRequestId, status } = req.body;

    if (!leaveRequestId) {
      return res.status(400).json({
        success: false,
        message: "LeaveRequest Id is Mandatory!!",
      });
    }

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status! Status must be 'Approved' or 'Rejected'.",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(leaveRequestId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid leaveRequestId!!",
      });
    }
    const leaveRequest = await LeaveRequest.findById(leaveRequestId);
    if (!leaveRequest) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found!",
      });
    }

    leaveRequest.status = status;
    leaveRequest.approvedBy = req.user.id;

    await leaveRequest.save();

    // TODO Notification
    return res.status(200).json({
      success: true,
      message: `Leave request ${status.toLowerCase()} successfully!`,
      leaveRequest,
    });
  } catch (error) {
    console.error(error?.message || "Error in update leave controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const allLeaveApproved = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date || isNaN(new Date(date))) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use a valid ISO 8601 date format.",
      });
    }

    const userId = req.user.id;
    const companys = await Employee.findById(userId).select("company");
    const companyId = companys.company._id.toString();

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid companyId!!",
      });
    }

    const parsedDate = new Date(date);

    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    const companyEmployees = await Employee.find({
      company: companyId,
    }).select("_id");

    const employeeIds = companyEmployees.map((emp) => emp._id.toString());

    const allLeaves = await LeaveRequest.find({
      employee: { $in: employeeIds },
      status: { $nin: ["Rejected"] },
      startDate: { $lte: endOfDay },
      endDate: { $gte: startOfDay },
    }).select("employee status");

    const employeeDetails = await Employee.find({
      _id: { $in: employeeIds },
    }).select(
      "_id fullName email employeeId designation profilePic phoneNumber dateOfJoining role"
    );

    // Add Employee Details inside Leave Fields
    const employees = allLeaves
      .map((leave) => {
        const employee = employeeDetails.find(
          (emp) => emp._id.toString() === leave.employee.toString()
        );
        return {
          ...employee?.toObject(),
          status: leave.status,
        };
      })
      .filter(Boolean);

    return res.status(200).json({
      success: true,
      message: "These employees are on leave on the specified day!",
      allDetails: {
        employees,
      },
    });
  } catch (error) {
    console.error(error?.message || "Error in all leaves controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
