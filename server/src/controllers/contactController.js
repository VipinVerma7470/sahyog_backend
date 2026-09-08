import Contact from "../models/Contact.js";

// =================================
// Create Contact Message
// =================================

export const createContact = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !subject ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 10 digits",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      type: "CONTACT",
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });

  } catch (error) {
    console.error("Create Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};


// =================================
// Create Volunteer Registration
// =================================

export const createVolunteerRegistration = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      phone,
      eventId,
      eventTitle,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !eventId
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone and event are required",
      });
    }

    const volunteer = await Contact.create({
      name,
      email,
      phone,
      subject: "Volunteer Registration",
      message: `Volunteer registered for event: ${eventTitle}`,
      type: "VOLUNTEER",
      eventId,
      eventTitle,
    });

    res.status(201).json({
      success: true,
      message:
        "Volunteer registration submitted successfully",
      volunteer,
    });

  } catch (error) {
    console.error(
      "Volunteer Registration Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to register volunteer",
      error: error.message,
    });
  }
};


// =================================
// Get All Contacts
// =================================

export const getAllContacts = async (
  req,
  res
) => {
  try {
    const contacts = await Contact.find()
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      contacts,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
      error: error.message,
    });
  }
};


// =================================
// Get Contact By ID
// =================================

export const getContactById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      contact,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact",
      error: error.message,
    });
  }
};


// =================================
// Update Status
// =================================

export const updateContactStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      contact,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
};


// =================================
// Delete Contact
// =================================

export const deleteContact = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const contact =
      await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete contact",
      error: error.message,
    });
  }
};