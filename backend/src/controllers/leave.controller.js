import LeaveRequest, { leaveTypes } from "../models/leaveRequest.model.js";

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

    // Convert the dates to IST
    // const istStartDate = new Date(startDate).toLocaleString("en-IN", {
    //   timeZone: "Asia/Kolkata",
    // });
    // const istEndDate = new Date(endDate).toLocaleString("en-IN", {
    //   timeZone: "Asia/Kolkata",
    // });

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
    console.log(req.user.id);
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

    const parsedDate = new Date(date);

    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    const allLeaves = await LeaveRequest.find({
      status: { $nin: ["Rejected"] },
      startDate: { $lte: endOfDay },
      endDate: { $gte: startOfDay },
    });

    return res.status(200).json({
      success: true,
      message: "These employees are on leave on the specified day!",
      allLeaves,
    });
  } catch (error) {
    console.error(error?.message || "Error in all leaves controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
