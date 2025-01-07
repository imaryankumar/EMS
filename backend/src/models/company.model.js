import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  domain: { type: String, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  createdAt: { type: Date, default: Date.now },
});

const Company = mongoose.model("Company", companySchema);

export default Company;
