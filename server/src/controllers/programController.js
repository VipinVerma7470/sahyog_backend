import Program from "../models/Program.js";

// =======================
// Add Program
// =======================

export const addProgram = async (req, res) => {
  try {

    const { title, category, description } = req.body;

    const program = await Program.create({
      title,
      category,
      description,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json({
      success: true,
      message: "Program Added Successfully",
      program,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =======================
// Get All Programs
// =======================

export const getPrograms = async (req, res) => {

  try {

    const programs = await Program.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      programs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// =======================
// Get Single Program
// =======================

export const getProgram = async (req, res) => {

  try {

    const program = await Program.findById(req.params.id);

    if (!program) {

      return res.status(404).json({
        success: false,
        message: "Program Not Found",
      });

    }

    res.status(200).json({
      success: true,
      program,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// =======================
// Update Program
// =======================

export const updateProgram = async (req, res) => {

  try {

    const { title, category, description } = req.body;

    const updateData = {
      title,
      category,
      description,
    };

    // Agar nayi image upload hui hai to update karo
    if (req.file) {
      updateData.image = req.file.path;
    }

    const program = await Program.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Program Updated Successfully",
      program,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// =======================
// Delete Program
// =======================

export const deleteProgram = async (req, res) => {

  try {

    const program = await Program.findById(req.params.id);

    if (!program) {

      return res.status(404).json({
        success: false,
        message: "Program Not Found",
      });

    }

    await Program.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Program Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};