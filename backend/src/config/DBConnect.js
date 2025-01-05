import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "EMS",
    });
    console.log(`Database Connected !!`);
  } catch (error) {
    console.error(error?.message);
    process.exit(1);
  }
};

export default ConnectDB;
