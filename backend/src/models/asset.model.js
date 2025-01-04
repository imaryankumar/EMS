import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    issuedDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["Issued", "Returned"], default: "Issued" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  },
  { timestamps: true }
);

const Asset = mongoose.model("Asset", assetSchema);

export default Asset;
