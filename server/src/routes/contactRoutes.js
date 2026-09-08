import express from "express";

import {
  createContact,
  createVolunteerRegistration,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from "../controllers/contactController.js";

import authMiddleware
  from "../middleware/authMiddleware.js";

const router =
  express.Router();


// Public Contact Form
router.post(
  "/",
  createContact
);


// Public Volunteer Registration
router.post(
  "/volunteer",
  createVolunteerRegistration
);


// Admin Routes
router.get(
  "/",
  authMiddleware,
  getAllContacts
);

router.get(
  "/:id",
  authMiddleware,
  getContactById
);

router.put(
  "/:id/status",
  authMiddleware,
  updateContactStatus
);

router.delete(
  "/:id",
  authMiddleware,
  deleteContact
);


export default router;