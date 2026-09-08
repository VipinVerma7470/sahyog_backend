import React, { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  FaChevronRight,
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

import "./style/EventDetail.css";

import { eventService } from "../services/eventService";
import { contactService } from "../Services/contactService";


const EventDetail = () => {

  const { id } = useParams();

  const navigate = useNavigate();


  const [event, setEvent] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
    });


  const [submitted, setSubmitted] =
    useState(false);


  // ===============================
  // Fetch Single Event
  // ===============================

  useEffect(() => {

    const fetchEvent = async () => {

      try {

        setLoading(true);

        const response =
          await eventService.getById(id);

        console.log(
          "Single Event Response:",
          response
        );

        setEvent(
          response.event ||
          response.data
        );

      } catch (error) {

        console.error(
          "Event Detail Error:",
          error
        );

        setEvent(null);

      } finally {

        setLoading(false);

      }

    };


    fetchEvent();

  }, [id]);


  // ===============================
  // Loading
  // ===============================

  if (loading) {

    return (

      <div className="evt-not-found">

        <h2>
          Loading Event Details...
        </h2>

      </div>

    );

  }


  // ===============================
  // Event Not Found
  // ===============================

  if (!event) {

    return (

      <div className="evt-not-found">

        <h2>
          Event Not Found!
        </h2>

        <button
          className="evt-back-btn"
          onClick={() =>
            navigate("/events")
          }
        >

          <FaArrowLeft />

          Back to Events

        </button>

      </div>

    );

  }


  // ===============================
  // Event Date
  // ===============================

  const eventDate =
    new Date(event.date);


  const formattedDate =
    eventDate.toLocaleDateString(
      "en-US",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );


  const isPast =
    eventDate < new Date();


  // ===============================
  // Registration
  // ===============================

  const handleRegister = async (e) => {

  e.preventDefault();

  try {

    const response =
      await contactService.registerVolunteer({

        name: formData.name,

        email: formData.email,

        phone: formData.phone,

        eventId: event._id,

        eventTitle: event.title,

      });


    console.log(
      "Volunteer Registration Response:",
      response
    );


    setSubmitted(true);


    setFormData({

      name: "",

      email: "",

      phone: "",

    });

  } catch (error) {

    console.error(
      "Volunteer Registration Error:",
      error
    );

    alert(
      error.response?.data?.message ||
      "Registration failed"
    );

  }

};

  return (

    <div className="evt-detail-page-wrapper">


      {/* ===============================
          Banner
      =============================== */}

      <section className="evt-detail-banner">

        <div className="evt-banner-overlay">

          <h1>
            {event.title}
          </h1>


          <p className="evt-breadcrumb">

            <span
              onClick={() =>
                navigate("/")
              }
              className="clickable-crumb"
            >
              Home
            </span>


            <FaChevronRight
              className="crumb-arrow"
            />


            <span
              onClick={() =>
                navigate("/events")
              }
              className="clickable-crumb"
            >
              Events
            </span>


            <FaChevronRight
              className="crumb-arrow"
            />


            <span className="evt-active-crumb">

              Detail

            </span>

          </p>

        </div>

      </section>


      {/* ===============================
          Main Content
      =============================== */}

      <section className="evt-detail-content">

        <div className="evt-container">

          <div className="evt-layout-grid">


            {/* ===============================
                LEFT SIDE
            =============================== */}

            <div className="evt-main-card">


              <div className="evt-image-box">

                {event.image ? (

                  <img
                    src={event.image}
                    alt={event.title}
                  />

                ) : (

                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >

                    No Image Available

                  </div>

                )}

              </div>


              <div className="evt-info-section">

                <h2>
                  Event Summary & Objectives
                </h2>


                <p className="evt-excerpt-text">

                  {event.description}

                </p>


                <p className="evt-full-paragraph">

                  This campaign is organized by
                  Sahyog Welfare Foundation to
                  foster direct community development.
                  We welcome active citizen support
                  to make this initiative successful.

                </p>


                <div className="evt-specs">


                  {/* Date */}

                  <div className="spec-item">

                    <FaCalendarAlt
                      className="spec-icon"
                    />

                    <div>

                      <h4>
                        Date Scheduled
                      </h4>

                      <p>
                        {formattedDate}
                      </p>

                    </div>

                  </div>


                  {/* Time */}

                  <div className="spec-item">

                    <FaClock
                      className="spec-icon"
                    />

                    <div>

                      <h4>
                        Operational Hours
                      </h4>

                      <p>
                        {event.time ||
                          "Time not specified"}
                      </p>

                    </div>

                  </div>


                  {/* Location */}

                  <div className="spec-item">

                    <FaMapMarkerAlt
                      className="spec-icon"
                    />

                    <div>

                      <h4>
                        Venue / Location
                      </h4>

                      <p>
                        {event.location}
                      </p>

                    </div>

                  </div>


                </div>

              </div>


              <div className="evt-footer">

                <button
                  className="evt-back-btn"
                  onClick={() =>
                    navigate("/events")
                  }
                >

                  <FaArrowLeft />

                  Back to All Events

                </button>

              </div>


            </div>


            {/* ===============================
                RIGHT SIDE
            =============================== */}

            <div className="evt-sidebar">


              {isPast ? (

                <div
                  className="evt-status-alert-box past"
                >

                  <h3>
                    This Event has Ended
                  </h3>


                  <p>

                    This event concluded on{" "}

                    {formattedDate}.

                    Thank you to all our
                    incredible volunteers.

                  </p>


                  <button
                    className="evt-explore-more-btn"
                    onClick={() =>
                      navigate("/events")
                    }
                  >

                    Explore Active Events

                  </button>

                </div>

              ) : (

                <div
                  className="evt-registration-form-box"
                >

                  <h3>
                    Volunteer Registration
                  </h3>


                  <p
                    className="form-lead-desc"
                  >

                    Join us directly on the field!
                    Fill your quick contact data below.

                  </p>


                  {submitted ? (

                    <div
                      className="evt-success-box"
                    >

                      <h4>
                        🎉 Application Received!
                      </h4>


                      <p>

                        Thank you for registering.
                        Our team will contact you soon.

                      </p>


                      <button
                        className="evt-form-reset-btn"
                        onClick={() =>
                          setSubmitted(false)
                        }
                      >

                        Add Another Member

                      </button>

                    </div>

                  ) : (

                    <form
                      onSubmit={handleRegister}
                      className="evt-form"
                    >


                      <div className="form-field">

                        <label>
                          Your Name
                        </label>


                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Kushwah"
                          value={
                            formData.name
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              name: e.target.value,
                            })
                          }
                        />

                      </div>


                      <div className="form-field">

                        <label>
                          Email ID
                        </label>


                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={
                            formData.email
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              email: e.target.value,
                            })
                          }
                        />

                      </div>


                      <div className="form-field">

                        <label>
                          Contact Number
                        </label>


                        <input
                          type="tel"
                          required
                          placeholder="10-digit phone number"
                          value={
                            formData.phone
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone: e.target.value,
                            })
                          }
                        />

                      </div>


                      <button
                        type="submit"
                        className="evt-submit-btn"
                      >

                        Confirm My Registration

                      </button>


                    </form>

                  )}

                </div>

              )}

            </div>


          </div>

        </div>

      </section>

    </div>

  );

};


export default EventDetail;