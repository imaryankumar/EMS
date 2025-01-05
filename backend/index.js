import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./src/config/DBConnect.js";
import cookieParser from "cookie-parser";
import EmployeeRouter from "./src/routes/employee.route.js";
import UserAuth from "./src/middleware/UserAuth.js";
import AllowedRoles from "./src/middleware/AllowedRoles.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/user", EmployeeRouter);

app.get("/api/v1/user/home", UserAuth, AllowedRoles(["HR"]), (req, res) => {
  res.json("User Home");
});

app.listen(PORT, () => {
  ConnectDB();
  console.log(`Server is Listening on PORT:${PORT}`);
});
