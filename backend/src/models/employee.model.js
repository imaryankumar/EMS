import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    employeeId: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "HR", "Tech Lead", "Employee"],
      default: "Employee",
    },
    designation: { type: String, required: true },
    department: { type: String },
    reportingManager: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    dateOfJoining: { type: Date, required: true },
    leaveBalance: { type: Number, default: 24 },
    assets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Asset" }],
    employmentStatus: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    personalDetails: {
      emergencyContact: { type: String },
      dateOfBirth: { type: Date },
      maritalStatus: {
        type: String,
        enum: ["Single", "Married", "Divorced"],
      },
    },
    companyDetails: {
      probationPeriod: { type: Number, default: 6 },
      contractType: {
        type: String,
        enum: ["Permanent", "Contractual"],
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
