import jwt from "jsonwebtoken";

const UserAuth = async (req, res, next) => {
  try {
    const { userToken } = req.cookies;
    if (!userToken) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required.",
      });
    }
    await jwt.verify(userToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "unauthorization token!",
        });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error(error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server Error!!",
    });
  }
};

export default UserAuth;
