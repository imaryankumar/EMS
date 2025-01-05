import Employee from "../models/employee.model.js";

const createEmployeeId = async (fullName) => {
  try {
    const baseId = fullName.toLowerCase().replace(/\s+/g, "_");
    let employeeId = `${baseId}_001`;
    let counter = 1;

    while (await Employee.findOne({ employeeId })) {
      counter += 1;
      const suffix = String(counter).padStart(3, "0");
      employeeId = `${baseId}_${suffix}`;
    }
    return employeeId;
  } catch (error) {
    console.error(error?.message || "Failed to generate unique employeeId");
  }
};

export default createEmployeeId;
