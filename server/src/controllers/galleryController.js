import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

// =================================
// Add Gallery
// =================================

export const addGalleryImage = async (req, res) => {
  try {
    const {
      title,
      category,
      section,
      description,
    } = req.body;

    if (!title || !category || !section) {
      return res.status(400).json({
        success: false,
        message: "Title, category and section are required",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const imageUrls = req.files.map(
      (file) => file.path
    );

    const gallery = await Gallery.create({
      title,
      category,
      section,
      description,
      images: imageUrls,
    });

    res.status(201).json({
      success: true,
      message: "Gallery Added Successfully",
      gallery,
    });

  } catch (error) {
    console.error("Add Gallery Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add gallery",
      error: error.message,
    });
  }
};

// =================================
// Get All Gallery
// =================================

export const getAllGalleryImages = async (
  req,
  res
) => {
  try {
    const gallery = await Gallery.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.error(
      "Get Gallery Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery",
      error: error.message,
    });
  }
};

// =================================
// Get Gallery By ID
// =================================

export const getGalleryImageById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    res.status(200).json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.error(
      "Get Gallery By ID Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery",
      error: error.message,
    });
  }
};

// =================================
// Update Gallery
// =================================

export const updateGalleryImage = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
  title,
  category,
  section,
  description,
} = req.body;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    // New images upload hui hain
    if (
      req.files &&
      req.files.length > 0
    ) {
      // Old images delete from Cloudinary
      for (const imageUrl of gallery.images) {
        const publicId = imageUrl
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(
          publicId
        );
      }

      // New image URLs
      gallery.images = req.files.map(
        (file) => file.path
      );
    }

    gallery.title = title;
gallery.category = category;
gallery.section = section;
gallery.description = description;

    await gallery.save();

    res.status(200).json({
      success: true,
      message: "Gallery Updated Successfully",
      gallery,
    });
  } catch (error) {
    console.error(
      "Update Gallery Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update gallery",
      error: error.message,
    });
  }
};

// =================================
// Delete Gallery
// =================================

export const deleteGalleryImage = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    // Delete all Cloudinary images
    for (const imageUrl of gallery.images) {
      const publicId = imageUrl
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

      await cloudinary.uploader.destroy(
        publicId
      );
    }

    await Gallery.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Gallery Deleted Successfully",
    });
  } catch (error) {
    console.error(
      "Delete Gallery Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete gallery",
      error: error.message,
    });
  }
};