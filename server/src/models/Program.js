import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },
   category: {
  type: String,
  required: true,
  trim: true,
},

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Program", programSchema);