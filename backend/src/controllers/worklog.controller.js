import WorkLog from "../models/worklog.model.js";

export const AddWorkLog = async (req, res) => {
  try {
    const { date, project, description, hourSpent } = req.body;
    if (!date || !project || !description || !hourSpent) {
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
