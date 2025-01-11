import express from "express";
import dotenv from "dotenv"
import ConnectDB from "./src/config/DBConnect.js";
import cookieParser from "cookie-parser";
import EmployeeRouter from "./src/routes/employee.route.js";
import LeaveEmployeRouter from "./src/routes/leave.route.js";
import CompanyRouter from "./src/routes/company.route.js";

const app = express();
const PORT = process.env.PORT || 5001;
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/employee", EmployeeRouter);
app.use("/api/v1/employee", LeaveEmployeRouter);
app.use("/api/v1/company", CompanyRouter);

app.listen(PORT, () => {
  ConnectDB();
  console.log(`Server is Listening on PORT:${PORT}`);
});
