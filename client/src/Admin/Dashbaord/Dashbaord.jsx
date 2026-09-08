import { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaBookOpen,
  FaImages,
  FaCalendarAlt,
  FaArrowUp,
} from "react-icons/fa";

import axios from "axios";

const API_URL = "http://localhost:5000/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    volunteers: 0,
    programs: 0,
    gallery: 0,
    events: 0,
  });

  const [loading, setLoading] = useState(true);

  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const [recentPrograms, setRecentPrograms] = useState([]);

  // =====================================
  // Fetch Dashboard Data
  // =====================================

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // APIs parallel me call hongi
      const [
        programsResponse,
        galleryResponse,
        eventsResponse,
      ] = await Promise.all([
        axios.get(`${API_URL}/programs`, config),
        axios.get(`${API_URL}/gallery`, config),
        axios.get(`${API_URL}/events`, config),
      ]);

      // =====================================
      // Programs Data
      // =====================================

      const programs =
        programsResponse.data.programs ||
        programsResponse.data.program ||
        [];

      // =====================================
      // Gallery Data
      // =====================================

      const gallery =
        galleryResponse.data.galleryImages ||
        galleryResponse.data.gallery ||
        [];

      // =====================================
      // Events Data
      // =====================================

      const events =
        eventsResponse.data.events ||
        eventsResponse.data.event ||
        [];

      // =====================================
      // Set Counts
      // =====================================

      setDashboardData({
        volunteers: 0,
        programs: programs.length,
        gallery: gallery.length,
        events: events.length,
      });

      // Recent Programs
      setRecentPrograms(programs.slice(0, 3));

      // Upcoming Events
      setUpcomingEvents(events.slice(0, 3));

    } catch (error) {
      console.error(
        "Dashboard Data Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Fetch Data On Page Load
  // =====================================

  useEffect(() => {
    fetchDashboardData();
  }, []);

    const handleQuickAction = (path) => {
    navigate(path);
  };


  return (
    <div className="dashboard-page">

      {/* =====================================
          Heading
      ===================================== */}

      <div className="dashboard-header">

        <div>

          <h1>Dashboard</h1>

          <p>
            Welcome back, Admin 👋
          </p>

        </div>

      </div>

      {/* =====================================
          Statistics Cards
      ===================================== */}

      <div className="stats-grid">

        {/* Volunteers */}

        <div className="stats-card">

          <div className="stats-icon users">

            <FaUsers />

          </div>

          <div>

            <h2>
              {loading
                ? "..."
                : dashboardData.volunteers}
            </h2>

            <p>Total Volunteers</p>

            <span>

              <FaArrowUp />

              Community Members

            </span>

          </div>

        </div>

        {/* Programs */}

        <div className="stats-card">

          <div className="stats-icon program">

            <FaBookOpen />

          </div>

          <div>

            <h2>
              {loading
                ? "..."
                : dashboardData.programs}
            </h2>

            <p>Total Programs</p>

            <span>

              <FaArrowUp />

              Live Data

            </span>

          </div>

        </div>

        {/* Gallery */}

        <div className="stats-card">

          <div className="stats-icon gallery">

            <FaImages />

          </div>

          <div>

            <h2>
              {loading
                ? "..."
                : dashboardData.gallery}
            </h2>

            <p>Gallery Images</p>

            <span>

              <FaArrowUp />

              Uploaded Images

            </span>

          </div>

        </div>

        {/* Events */}

        <div className="stats-card">

          <div className="stats-icon event">

            <FaCalendarAlt />

          </div>

          <div>

            <h2>
              {loading
                ? "..."
                : dashboardData.events}
            </h2>

            <p>Total Events</p>

            <span>

              <FaArrowUp />

              Scheduled Events

            </span>

          </div>

        </div>

      </div>

      {/* =====================================
          Dashboard Content
      ===================================== */}

      <div className="dashboard-grid">

        {/* Donation Overview */}

        <div className="dashboard-card donation-card">

          <div className="card-header">

            <h3>Donation Overview</h3>

            <button>
              View Report
            </button>

          </div>

          <div className="donation-chart">

            <div className="chart-placeholder">

              <h2>
                ₹ 8,45,000
              </h2>

              <span>
                Total Donations
              </span>

            </div>

          </div>

        </div>

        {/* Upcoming Events */}

        <div className="dashboard-card">

          <div className="card-header">

            <h3>
              Upcoming Events
            </h3>

          </div>

          <div className="event-list">

            {loading ? (

              <p>
                Loading events...
              </p>

            ) : upcomingEvents.length === 0 ? (

              <p>
                No upcoming events found.
              </p>

            ) : (

              upcomingEvents.map((event) => (

                <div
                  className="event-item"
                  key={event._id}
                >

                  <div className="event-date">

                    <h4>
                      {event.date
                        ? new Date(event.date).getDate()
                        : "--"}
                    </h4>

                    <span>
                      {event.date
                        ? new Date(event.date)
                            .toLocaleString(
                              "en-US",
                              {
                                month: "short",
                              }
                            )
                        : "---"}
                    </span>

                  </div>

                  <div>

                    <h5>
                      {event.title}
                    </h5>

                    <p>
                      {event.location ||
                        event.venue ||
                        "Location not available"}
                    </p>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

      {/* =====================================
          Bottom Grid
      ===================================== */}

      <div className="dashboard-grid">

        {/* Recent Programs */}

        <div className="dashboard-card">

          <div className="card-header">

            <h3>
              Recent Programs
            </h3>

          </div>

          {loading ? (

            <p>
              Loading programs...
            </p>

          ) : recentPrograms.length === 0 ? (

            <p>
              No programs found.
            </p>

          ) : (

            <table className="dashboard-table">

              <thead>

                <tr>

                  <th>
                    Program
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {recentPrograms.map(
                  (program) => (

                    <tr
                      key={program._id}
                    >

                      <td>
                        {program.title}
                      </td>

                      <td>

                        <span
                          className={`status ${
                            program.status ===
                            "Completed"
                              ? "completed"
                              : "active"
                          }`}
                        >

                          {program.status ||
                            "Active"}

                        </span>

                      </td>

                      <td>

                        {program.createdAt
                          ? new Date(
                              program.createdAt
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                              }
                            )
                          : "--"}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          )}

        </div>

        {/* Quick Actions */}

       
        <div className="dashboard-card">

          <div className="card-header">

            <h3>Quick Actions</h3>

          </div>

          <div className="quick-actions">

            <button
              onClick={() =>
                handleQuickAction(
                  "/admin/programs/add"
                )
              }
            >
              Add Program
            </button>

            <button
              onClick={() =>
                handleQuickAction(
                  "/admin/events/add"
                )
              }
            >
              Add Event
            </button>

            <button
              onClick={() =>
                handleQuickAction(
                  "/admin/gallery/add"
                )
              }
            >
              Upload Gallery
            </button>

            <button
              onClick={() =>
                handleQuickAction(
                  "/admin/donations"
                )
              }
            >
              View Donations
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;