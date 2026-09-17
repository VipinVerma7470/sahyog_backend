import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Contact.css";
import { FaArrowLeft } from "react-icons/fa";
import { contactService } from "../../services/contactService";

const ContactDetails = () => {

  const { id } = useParams();

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===============================
  // Fetch Contact Details
  // ===============================

  const fetchContact = async () => {

  try {

    const response =
      await contactService.getById(id);

    setContact(response.contact);

    // Mark as READ when admin opens the message
   if (
  String(response.contact.status || "").toLowerCase() === "unread"
) {
  // console.log("Updating contact status to READ:", id);

  const statusResponse =
    await contactService.updateStatus(
      id,
      "Read"
    );

  // console.log(
  //   "Status Update Response:",
  //   statusResponse
  // );

  setContact((prev) => ({
    ...prev,
    status: "Read",
  }));
}

  } catch (error) {

    console.error(
      "Fetch Contact Details Error:",
      error
    );

  } finally {

    setLoading(false);

  }

};

  useEffect(() => {

    fetchContact();

  }, [id]);


  if (loading) {

    return (

      <div className="contact-page">

        <h2>
          Loading message...
        </h2>

      </div>

    );

  }


  if (!contact) {

    return (

      <div className="contact-page">

        <h2>
          Message Not Found
        </h2>

      </div>

    );

  }


  return (

    <div className="contact-page">

      <div className="details-card">

        <div className="details-header">

          <h2>
            Contact Details
          </h2>

          <Link
            to="/admin/contact"
            className="back-btn"
          >

            <FaArrowLeft />

            Back

          </Link>

        </div>


        <div className="details-grid">


          <div className="detail-box">

            <label>
              Name
            </label>

            <p>
              {contact.name}
            </p>

          </div>


          <div className="detail-box">

            <label>
              Email
            </label>

            <p>
              {contact.email}
            </p>

          </div>


          <div className="detail-box">

            <label>
              Subject
            </label>

            <p>
              {contact.subject}
            </p>

          </div>


          <div className="detail-box">

            <label>
              Status
            </label>

            <p
              className={`contact-status ${contact.status.toLowerCase()}`}
            >
              {contact.status}
            </p>

          </div>


          <div className="detail-box">

            <label>
              Date
            </label>

            <p>
              {new Date(
                contact.createdAt
              ).toLocaleDateString()}
            </p>

          </div>


        </div>


        <div className="detail-box full-width">

          <label>
            Message
          </label>

          <p>
            {contact.message}
          </p>

        </div>


      </div>

    </div>

  );

};

export default ContactDetails;