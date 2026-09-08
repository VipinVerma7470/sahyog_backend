import Blog from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";

const createSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

// =================================
// Add Blog
// =================================

export const addBlog = async (req, res) => {
  try {
    const {
      title,
      category,
      author,
      content,
       tags,
    } = req.body;

    // Required fields validation
    if (
      !title ||
      !category ||
      !author ||
      !content
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, category, author and content are required",
      });
    }

    // Image validation
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Blog image is required",
      });
    }

    // Create blog
    const blog = await Blog.create({
      title,
       slug: createSlug(title),
      category,
      author,
      content,
      image: req.file.path,
 tags: tags
  ? tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .map((tag) => ({
        name: tag,
        slug: createSlug(tag),
      }))
  : [],
    });

    res.status(201).json({
      success: true,
      message: "Blog Added Successfully",
      blog,
    });
  } catch (error) {
    console.error(
      "Add Blog Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to add blog",
      error: error.message,
    });
  }
};

// =================================
// Get All Blogs
// =================================

export const getAllBlogs = async (
  req,
  res
) => {
  try {
    const blogs = await Blog.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error(
      "Get Blogs Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
};

// =================================
// Get Blog By ID
// =================================

export const getBlogById = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error('Get Blog By Slug Error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog',
      error: error.message,
    });
  }
};

// =================================
// Update Blog
// =================================

export const updateBlog = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      title,
      category,
      author,
      content,
        tags,
    } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Update text fields
  if (title !== undefined) {
  blog.title = title;
  blog.slug = createSlug(title);
}

    if (category !== undefined) {
      blog.category = category;
    }

    if (author !== undefined) {
      blog.author = author;
    }

    if (content !== undefined) {
      blog.content = content;
    }
   if (tags !== undefined) {
  blog.tags = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((tag) => ({
      name: tag,
      slug: createSlug(tag),
    }));
}

    // New image uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (blog.image) {
        const publicId = blog.image
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(
          publicId
        );
      }

      // Save new image
      blog.image = req.file.path;
    }

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog Updated Successfully",
      blog,
    });
  } catch (error) {
    console.error(
      "Update Blog Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update blog",
      error: error.message,
    });
  }
};

// =================================
// Delete Blog
// =================================

export const deleteBlog = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Delete image from Cloudinary
    if (blog.image) {
      const publicId = blog.image
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

      await cloudinary.uploader.destroy(
        publicId
      );
    }

    // Delete from MongoDB
    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    console.error(
      "Delete Blog Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete blog",
      error: error.message,
    });
  }
};