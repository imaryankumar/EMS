import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  employeeLimit: { type: Number, default: 50 },
  planType: {
    type: String,
    enum: ["Free", "6-Month", "2-Year"],
    default: "Free",
  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: null },
  isActive: { type: Boolean, default: true },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
