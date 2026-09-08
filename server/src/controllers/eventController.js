import Event from "../models/Event.js";

// ===============================
// Add Event
// ===============================

export const addEvent = async (req, res) => {
  try {
    const {
      title,
      location,
      date,
      time,
      description,
      status,
    } = req.body;

    if (!title || !location || !date) {
      return res.status(400).json({
        success: false,
        message: "Title, location and date are required",
      });
    }

    const event = await Event.create({
      title,
      location,
      date,
      time,
      description,
      status,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json({
      success: true,
      message: "Event Added Successfully",
      event,
    });

  } catch (error) {
    console.error("Add Event Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add event",
      error: error.message,
    });
  }
};

// ===============================
// Get All Events
// ===============================

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    const eventsWithStatus = events.map((event) => ({
      ...event.toObject(),

      status: new Date(event.date) >= new Date() ? "Upcoming" : "Completed",
    }));

    res.status(200).json({
      success: true,
      events: eventsWithStatus,
    });
  } catch (error) {
    console.error("Get Events Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message,
    });
  }
};

// ===============================
// Get Single Event
// ===============================

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    console.error("Get Event Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch event",
      error: error.message,
    });
  }
};

// ===============================
// Update Event
// ===============================

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      location,
      date,
      time,
      description,
      status,
    } = req.body;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    event.title = title || event.title;
    event.location = location || event.location;
    event.date = date || event.date;
    event.time = time || event.time;
    event.description = description || event.description;
    event.status = status || event.status;

    // New image upload hui to update karo
    if (req.file) {
      event.image = req.file.path;
    }

    await event.save();

    res.status(200).json({
      success: true,
      message: "Event Updated Successfully",
      event,
    });

  } catch (error) {
    console.error("Update Event Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: error.message,
    });
  }
};

// ===============================
// Delete Event
// ===============================

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event Deleted Successfully",
    });
  } catch (error) {
    console.error("Delete Event Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete event",
      error: error.message,
    });
  }
};
