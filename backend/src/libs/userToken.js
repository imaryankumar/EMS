import jwt from "jsonwebtoken";

const UserToken = async (userId, res) => {
  try {
    const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("userToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.log(error?.message || "usertoken controller error!!");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};

export default UserToken;
