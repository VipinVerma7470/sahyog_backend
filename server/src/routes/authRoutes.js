import express from "express";

import {
  loginAdmin,
  changePassword,

} from "../controllers/authController.js";
import authMiddleware
  from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/login",
  loginAdmin
);

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

export default router;