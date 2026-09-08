import express from "express";

import upload from "../middleware/upload.js";
import protect from "../middleware/authMiddleware.js";

import {
  addProgram,
  getPrograms,
  getProgram,
  updateProgram,
  deleteProgram,
} from "../controllers/programController.js";

const router = express.Router();

// Public Routes
router.get("/", getPrograms);
router.get("/:id", getProgram);

// Protected Routes
router.post("/", protect, upload.single("image"), addProgram);

router.put("/:id", protect, upload.single("image"), updateProgram);

router.delete("/:id", protect, deleteProgram);

export default router;