import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Actual Category
    category: {
      type: String,
      required: true,
      enum: [
        "Education",
        "Healthcare",
        "Women",
        "Environment",
        "Events",
      ],
    },

    // Gallery Section
    section: {
      type: String,
      required: true,
      enum: [
        "Programs",
        "Events",
        "Activities",
      ],
    },

    description: {
      type: String,
      trim: true,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;