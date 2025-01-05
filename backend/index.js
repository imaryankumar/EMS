import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./src/config/DBConnect.js";
import cookieParser from "cookie-parser";
import EmployeeRouter from "./src/routes/employee.route.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/user", EmployeeRouter);

app.get("/api/home", (req, res) => {
  res.json("Hello");
});

app.listen(PORT, () => {
  ConnectDB();
  console.log(`Server is Listening on PORT:${PORT}`);
});
