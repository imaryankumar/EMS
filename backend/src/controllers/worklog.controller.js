import { generateMonthDates, isWeekend } from "../helper/GenerateMonthDates.js";
import WorkLog, { projectWorkName } from "../models/worklog.model.js";
import Employee from "../models/employee.model.js";

export const AddWorkLog = async (req, res) => {
  try {
    const { date, project, description, hourSpent, dayType } = req.body;
    if (!date || !project || !description || !hourSpent || !dayType) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!!",
      });
    }

    if (new Date(date) > new Date()) {
      return res.status(400).json({
        success: false,
        message: "You cannot add work logs for future dates!",
      });
    }

    const existingWorkLog = await WorkLog.findOne({
      employee: req.user.id,
      date,
    });

    if (existingWorkLog) {
      return res.status(400).json({
        success: false,
        message: "You have already logged work for this date!",
      });
    }

    const works = await WorkLog.create({
      employee: req.user.id,
      date,
      project,
      description,
      hourSpent,
      dayType,
    });

    return res.status(201).json({
      success: true,
      message: "Add WorkLog Successfully",
      works,
    });
  } catch (error) {
    console.error(error?.message || "Error in Add Work controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const GetAllWorkLog = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const allLogs = await WorkLog.find({
      employee: req.user.id,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    })
      .select("-employee")
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ date: -1 });

    const totalLogs = await WorkLog.countDocuments({
      employee: req.user.id,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    return res.status(200).json({
      success: true,
      message: "Work logs fetched successfully",
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalLogs / limit),
        totalLogs,
      },
      allLogs,
    });
  } catch (error) {
    console.error(error?.message || "Error in Get All Logs controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const UpdateWorkLog = async (req, res) => {
  res.send("Update Work log");
};

export const AddProjectWork = async (req, res) => {
  try {
    const { projectName } = req.body;
    if (!projectName) {
      return res.status(400).json({
        success: false,
        message: "Project name is required!!",
      });
    }
    if (projectWorkName.includes(projectName)) {
      return res.status(400).json({
        success: false,
        message: "Project already exists.",
      });
    }
    projectWorkName.push(projectName);
    return res.status(201).json({
      success: true,
      message: `Project ${projectName} added successfully.`,
    });
  } catch (error) {
    console.error(error?.message || "Error in Add Work conroller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
export const RemoveProjectWork = async (req, res) => {
  try {
    const { projectName } = req.body;
    if (!projectName) {
      return res.status(400).json({
        success: false,
        message: "Project name is required!!",
      });
    }
    const projectIndex = projectWorkName.indexOf(projectName);
    if (projectIndex === -1) {
      return res.status(400).json({ error: "Project not found." });
    }

    projectWorkName.splice(projectIndex, 1);

    return res.status(200).json({
      success: true,
      message: `Project ${projectName} removed successfully.`,
    });
  } catch (error) {
    console.error(error?.message || "Error in Remove Project controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const GetLogsData = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: "Month and year are required.",
      });
    }

    const monthIndex = parseInt(month, 10) - 1;
    const yearInt = parseInt(year, 10);

    const allDates = generateMonthDates(yearInt, monthIndex);

    const startOfMonth = new Date(yearInt, monthIndex, 1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(yearInt, monthIndex + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    const worklogs = await WorkLog.find({
      employee: req.user.id,
      date: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    }).lean();

    const employees = await Employee.find({
      _id: req.user.id,
      dateOfJoining: { $lte: currentDate },
    }).lean();

    const employeeJoinDates = employees.reduce((acc, emp) => {
      acc[emp._id] = emp.dateOfJoining;
      return acc;
    }, {});

    const worklogsByDate = {};

    worklogs.forEach((log) => {
      const dateStr =
        log.date.toISOString().split("T")[0] +
        " " +
        log.date.toLocaleDateString("en-EN", { weekday: "short" });
      worklogsByDate[dateStr] = log;
    });

    const result = allDates
      .map((date) => {
        const dateStr =
          date.toISOString().split("T")[0] +
          " " +
          date.toLocaleDateString("en-EN", { weekday: "short" });

        if (date > currentDate) {
          return null;
        }

        const employeeJoined = Object.keys(employeeJoinDates).some(
          (empId) => new Date(employeeJoinDates[empId]) <= date
        );

        if (!employeeJoined) {
          return null;
        }

        if (isWeekend(date)) {
          return { date: dateStr, status: "week off", worklog: null };
        }

        if (worklogsByDate[dateStr]) {
          return {
            date: dateStr,
            status: "Received",
            worklog: worklogsByDate[dateStr],
          };
        }

        return { date: dateStr, status: "not updated", worklog: null };
      })
      .reverse()
      .filter((item) => item !== null);

    if (result.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Logs not found for certain days.",
      });
    }

    result.sort((a, b) => new Date(b.date) - new Date(a.date));

    return res.status(200).json({
      success: true,
      message: "Fetched all worklogs for the given month.",
      result,
    });
  } catch (error) {
    console.error(error?.message || "Error in fetching worklogs");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const ProjectWiseData = async (req, res) => {
  try {
    const { projectName, employeeId } = req.params;
    const getFindData = await WorkLog.find({
      project: projectName,
      employee: employeeId,
    }).select("description date dayType hourSpent");
    const totalHoursSpent = getFindData.reduce(
      (total, log) => total + log.hourSpent,
      0
    );
    return res.status(200).json({
      success: true,
      totalHours: totalHoursSpent,
      data: getFindData,
      message: "Success",
    });
  } catch (error) {
    console.error(error?.message || "Error in project wise");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
