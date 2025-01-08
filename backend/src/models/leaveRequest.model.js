import mongoose from "mongoose";

export const leaveTypes = [
  "Casual Leave",
  "Sick Leave",
  "Half-Day Leave (Casual)",
  "Half-Day Leave (Sick)",
  "Compensatory Leave (India)",
  "Compensatory Leave (Egypt)",
  "Work From Home",
  "Marriage Leave (Self)",
  "Parental Leave",
  "Parental Work From Home",
  "Birthday Month leave",
];

const leaveRequestSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    leaveType: {
      type: String,
      enum: [...leaveTypes],
      required: true,
    },
    reason: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  },
  { timestamps: true }
);

const LeaveRequest = mongoose.model("LeaveRequest", leaveRequestSchema);

export default LeaveRequest;
