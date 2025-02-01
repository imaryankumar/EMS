import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyEmail: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gstNumber: {
    type: String,
    required: true,
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
  },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Company = mongoose.model("Company", companySchema);

export default Company;
