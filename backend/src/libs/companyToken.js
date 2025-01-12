import jwt from "jsonwebtoken";

const CompanyToken = async (companyId, res) => {
  try {

    const token = await jwt.sign({companyId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token not found!!",
      });
    }

    res.cookie("companyToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return token;
  } catch (error) {
    console.log(error?.message || "companyToken controller error!!");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};

export default CompanyToken;
