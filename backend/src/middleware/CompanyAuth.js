import jwt from "jsonwebtoken";

const CompanyAuth = async (req, res, next) => {
  try {
    const { companyToken } = req.cookies;

    if (!companyToken) {
      return res.status(401).json({
        success: false,
        message: "Authentication company token is required.",
      });
    }
    await jwt.verify(companyToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "unauthorization company token!",
        });
      }
      req.company = decoded;
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

export default CompanyAuth;
