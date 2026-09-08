import express from "express";

import {
  addGalleryImage,
  getAllGalleryImages,
  getGalleryImageById,
  updateGalleryImage,
  deleteGalleryImage,
} from "../controllers/galleryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.array("images", 10),
  addGalleryImage
);

router.get(
  "/",
  
  getAllGalleryImages
);

router.get(
  "/:id",
  authMiddleware,
  getGalleryImageById
);

router.put(
  "/:id",
  authMiddleware,
  upload.array("images", 10),
  updateGalleryImage
);

router.delete(
  "/:id",
  authMiddleware,
  deleteGalleryImage
);

export default router;