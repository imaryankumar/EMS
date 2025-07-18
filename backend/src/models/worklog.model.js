import mongoose from "mongoose";

export const projectWorkName = [
  "ProjectA",
  "ProjectB",
  "ProjectC",
  "ProjectD",
  "ProjectE",
];

const workLogSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: { type: Date, required: true },
    project: { type: String, required: true, enum: projectWorkName },
    description: { type: String, required: true },
    hourSpent: { type: Number, required: true },
    dayType: { type: String, required: true, enum: ["full", "half"] },
  },
  { timestamps: true }
);

const WorkLog = mongoose.model("WorkLog", workLogSchema);

export default WorkLog;
