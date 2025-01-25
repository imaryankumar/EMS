import mongoose from "mongoose";

const workLogSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: { type: Date, required: true },
    project: { type: String, required: true },
    description: { type: String, required: true },
    hourSpent: { type: String, required: true },
  },
  { timestamps: true }
);

const WorkLog = mongoose.model("WorkLog", workLogSchema);

export default WorkLog;
