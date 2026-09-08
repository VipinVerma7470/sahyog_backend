import express from "express";

import {
  addEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";   // ✅ ye add karo

const router = express.Router();


// Public Routes
router.get("/", getAllEvents);
router.get("/:id", getEventById);


// Protected Routes
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  addEvent
);


router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateEvent
);


router.delete(
  "/:id",
  authMiddleware,
  deleteEvent
);


export default router;