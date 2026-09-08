import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate import karein
import '../Pages/style/Events.css';
import SEO from "../Components/SEO";
import program from "../assets/programs2.jpg.jpeg";
import { eventService } from "../services/eventService";


// Events Banner Component
const EventsBanner = () => {
    const navigate = useNavigate();
  return (
    <div className="events-banner">
      <div className="events-banner-overlay">
        <h1>Our Events</h1>
        <p className="events-breadcrumb">
          <span className="events-crumb-home" onClick={() => navigate("/")}>Home</span> &gt; <span className="events-crumb-current">Events</span>
        </p>
      </div>
    </div>
  );
};

// Event Card Component
const EventCard = ({ id, image, day, month, title, time, location, excerpt, isPast }) => {
  const navigate = useNavigate(); // 2. Hook initialize kiya

  return (
    <div className={`event-card ${isPast ? 'past-event' : ''}`}>
      <div className="event-image-container">
        <img src={image} alt={title} />
        <div className="event-date-badge">
          <span className="badge-day">{day}</span>
          <span className="badge-month">{month}</span>
        </div>
        {isPast && <div className="past-tag">Past Event</div>}
      </div>
      
      <div className="event-contents">
        <h3 className="event-title">{title}</h3>
        <div className="event-meta">
          <span>🕒 {time}</span>
          <span>📍 {location}</span>
        </div>
        <p className="event-excerpt">{excerpt}</p>
        
        {/* 3. Button click par dynamic route navigate karein */}
        <button 
          className="event-bt" 
          onClick={() => navigate(`/events/${id}`)}
        >
          {isPast ? 'View Details' : 'Join Event'}
        </button>
      </div>
    </div>
  );
};

// Main Events Page Assembly
const Events = () => {
  const [activeTab, setActiveTab] =
    useState("upcoming");

  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ===============================
  // Fetch Events
  // ===============================

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const response =
          await eventService.getAll();

        console.log(
          "Events API Response:",
          response
        );

        setEvents(
          response.events ||
          response.data ||
          []
        );

      } catch (error) {
        console.error(
          "Events Fetch Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // ===============================
  // Current Date
  // ===============================

  const today = new Date();

  // ===============================
  // Upcoming Events
  // ===============================

  const upcomingEvents = events.filter(
    (event) =>
      new Date(event.date) >= today
  );

  // ===============================
  // Past Events
  // ===============================

  const pastEvents = events.filter(
    (event) =>
      new Date(event.date) < today
  );

  return (
    <>
      <SEO
        title="Events | Sahyog Welfare Foundation"
        description="Stay updated with our latest events and community initiatives."
        keywords="NGO Events, Charity Events"
        image="/logo.png"
        url="https://www.sahyogfoundation.org/events"
      />

      <div className="events-page-wrapper">

        <EventsBanner />

        <div className="events-content-container">

          {/* ================= Tabs ================= */}

          <div className="events-tabs">

            <button
              className={`tab-btn ${
                activeTab === "upcoming"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("upcoming")
              }
            >
              Upcoming Events (
              {upcomingEvents.length}
              )
            </button>

            <button
              className={`tab-btn ${
                activeTab === "past"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("past")
              }
            >
              Past Events (
              {pastEvents.length}
              )
            </button>

          </div>

          {/* ================= Loading ================= */}

          {loading ? (

            <div className="events-loading">
              Loading events...
            </div>

          ) : (

            <div className="events-grid">

              {activeTab === "upcoming" ? (

                upcomingEvents.length === 0 ? (

                  <p>
                    No upcoming events found.
                  </p>

                ) : (

                  upcomingEvents.map(
                    (event) => (

                      <EventCard
                        key={event._id}
                        id={event._id}
                        image={event.image}
                        day={new Date(
                          event.date
                        ).getDate()}
                        month={new Date(
                          event.date
                        ).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                          }
                        )}
                        title={event.title}
                        time={event.time}
                        location={
                          event.location
                        }
                        excerpt={
                          event.description
                        }
                        isPast={false}
                      />

                    )
                  )

                )

              ) : (

                pastEvents.length === 0 ? (

                  <p>
                    No past events found.
                  </p>

                ) : (

                  pastEvents.map(
                    (event) => (

                      <EventCard
                        key={event._id}
                        id={event._id}
                        image={event.image}
                        day={new Date(
                          event.date
                        ).getDate()}
                        month={new Date(
                          event.date
                        ).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                          }
                        )}
                        title={event.title}
                        time={event.time}
                        location={
                          event.location
                        }
                        excerpt={
                          event.description
                        }
                        isPast={true}
                      />

                    )
                  )

                )

              )}

            </div>

          )}

        </div>

      </div>
    </>
  );
};

export default Events;