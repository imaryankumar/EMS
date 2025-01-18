import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import ConnectDB from "./src/config/DBConnect.js";
import cookieParser from "cookie-parser";
import EmployeeRouter from "./src/routes/employee.route.js";
import LeaveEmployeRouter from "./src/routes/leave.route.js";
import CompanyRouter from "./src/routes/company.route.js";
import AssetRouter from "./src/routes/asset.route.js";
import SubscriptionRouter from "./src/routes/subscription.route.js";

const app = express();
const PORT = process.env.PORT || 5001;
dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://yourfrontend.com"]
    : ["http://localhost:3000"];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Routes
app.use("/api/v1/employee", EmployeeRouter);
app.use("/api/v1/employee", LeaveEmployeRouter);
app.use("/api/v1/company", CompanyRouter);
app.use("/api/v1/asset", AssetRouter);
app.use("/api/v1/subscription", SubscriptionRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// Server
app.listen(PORT, () => {
  ConnectDB();
  console.log(`Server is Listening on PORT:${PORT}`);
});
