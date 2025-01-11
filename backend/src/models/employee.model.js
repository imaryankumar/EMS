import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    employeeId: { type: String, required: true, unique: true, index: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "HR", "Team Lead", "Employee", "Manager", "Intern"],
      default: "Employee",
    },
    profilePic: {
      type: String,
      default: "https://avatar.iran.liara.run/public",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    reportingManager: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    dateOfJoining: { type: Date, required: true, default: Date.now },
    leaveBalance: { type: Number, default: 24 },
    assets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Asset" }],
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: null,
    },
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
