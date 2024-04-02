import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
  try {
    //extract token
    // const token = req.cookies.jwt;

    // const authorizationHeader = req.headers.authorization;
    // // console.log("headers", req.headers);
    // const token = authorizationHeader?.startsWith("Bearer ")
    //   ? authorizationHeader.substring(7)
    //   : null;

    const token = req.headers.authorization?.split(" ")[1];

    // console.log("token", token);

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token provided" });
    }

    //decode token and verify user

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // set req  user to authenticated user
    req.user = user;

    next();
  } catch (error) {
    console.log("error in protectRoute middleware", error.message);
    res.status(500).json({ error: error.message });
  }
};

export default protectRoute;
