import express from "express";

import {
  addBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// =================================
// Add Blog
// =================================

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  addBlog
);

// =================================
// Get All Blogs
// =================================

router.get(
  "/",
  
  getAllBlogs
);

// =================================
// Get Blog By ID
// =================================
router.get(
  '/:slug',
  getBlogById
);
// =================================
// Update Blog
// =================================

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateBlog
);

// =================================
// Delete Blog
// =================================

router.delete(
  "/:id",
  authMiddleware,
  deleteBlog
);

export default router;