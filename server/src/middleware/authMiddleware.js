import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const protect = async (req, res, next) => {
  try {

    let token;

    if (
  req.headers.authorization &&
  req.headers.authorization.startsWith("Bearer")
) {

  console.log("Authorization Header:");
  console.log(req.headers.authorization);

  token = req.headers.authorization.split(" ")[1];

  console.log("Token:");
  console.log(token);

}

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. No Token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    console.log("Decoded Token:", decoded);

    req.admin = await Admin.findById(decoded.id).select("-password");

    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });

  }
};

export default protect;