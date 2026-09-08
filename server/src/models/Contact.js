import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    subject: {
      type: String,
      default: "",
      trim: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    // CONTACT ya VOLUNTEER
    type: {
      type: String,
      enum: ["CONTACT", "VOLUNTEER"],
      default: "CONTACT",
    },

    // Volunteer ke liye event ka reference
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: null,
    },

    eventTitle: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Unread", "Read"],
      default: "Unread",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Contact", contactSchema);