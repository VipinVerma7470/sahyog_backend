import "../Pages/style/Programs.css";

import { useNavigate, useLocation } from "react-router-dom";

import { FaChevronRight, FaArrowRight } from "react-icons/fa";

import banner from "../assets/program-banner.png";

import SEO from "../Components/SEO";

import { useRef, useState, useEffect } from "react";

import { programService } from "../services/programService";

const Programs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeBtnRef = useRef(null);

  const [active, setActive] = useState("All");

  const [programs, setPrograms] = useState([]);

  const [loading, setLoading] = useState(true);

  // ===============================
  // Fetch Programs From Backend
  // ===============================

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await programService.getAll();

        console.log("Programs API Response:", response);

        setPrograms(
          response.programs ||
          response.data ||
          []
        );

      } catch (error) {
        console.error(
          "Programs Fetch Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // ===============================
  // Handle Category From Other Page
  // ===============================

  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.state?.category) {
      setActive(location.state.category);

      window.history.replaceState(
        {},
        document.title
      );
    }
  }, [location]);

  // ===============================
  // Scroll Active Category
  // ===============================

  useEffect(() => {
    activeBtnRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  // ===============================
  // Filter Programs
  // ===============================

  const filteredPrograms =
    active === "All"
      ? programs
      : programs.filter(
          (item) =>
            item.category?.trim().toLowerCase() ===
            active.trim().toLowerCase()
        );

  return (
    <>
      <SEO
        title="Programs | Sahyog Welfare Foundation"
        description="Explore our education, healthcare and community development programs."
        keywords="NGO programs, education, health"
        image="/logo.png"
        url="https://www.sahyogfoundation.org/programs"
      />

      {/* ================= Banner ================= */}

      <section className="program-banner">

        <img
          src={banner}
          alt="Programs Banner"
        />

        <div className="banner-overlay"></div>

        <div className="banner-content">

          <h1>Programs</h1>

          <p>

            <span
              onClick={() => navigate("/")}
              style={{
                cursor: "pointer",
              }}
            >
              Home
            </span>

            <FaChevronRight />

            Programs

          </p>

        </div>

      </section>

      {/* ================= Programs ================= */}

      <section className="program-page">

        <div className="container">

          {/* Category Tabs */}

          <div className="program-tabs">

            <button
              ref={
                active === "All"
                  ? activeBtnRef
                  : null
              }
              className={
                active === "All"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActive("All")
              }
            >
              All Programs
            </button>

            <button
              ref={
                active === "Education"
                  ? activeBtnRef
                  : null
              }
              className={
                active === "Education"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActive("Education")
              }
            >
              Education
            </button>

            <button
              ref={
                active === "Healthcare"
                  ? activeBtnRef
                  : null
              }
              className={
                active === "Healthcare"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActive("Healthcare")
              }
            >
              Healthcare
            </button>

            <button
              ref={
                active === "Women Empowerment"
                  ? activeBtnRef
                  : null
              }
              className={
                active === "Women Empowerment"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActive("Women Empowerment")
              }
            >
              Women Empowerment
            </button>

            <button
              ref={
                active === "Environment"
                  ? activeBtnRef
                  : null
              }
              className={
                active === "Environment"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActive("Environment")
              }
            >
              Environment
            </button>

            <button
              ref={
                active === "Skill Development"
                  ? activeBtnRef
                  : null
              }
              className={
                active === "Skill Development"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActive("Skill Development")
              }
            >
              Skill Development
            </button>

          </div>

          {/* Loading */}

          {loading && (
            <p className="loading-text">
              Loading Programs...
            </p>
          )}

          {/* No Programs */}

          {!loading &&
            filteredPrograms.length === 0 && (

              <p className="no-programs">
                No programs found in this category.
              </p>

            )}

          {/* Program Grid */}

          <div className="program-grid">

            {filteredPrograms.map((item) => (

              <div
                className="program-card"
                key={item._id}
              >

                <div className="program-image">

                  <img
                    src={item.image}
                    alt={item.title}
                  />

                </div>

                <div className="program-content">

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                  <button
                    onClick={() =>
                      navigate(
                        `/programs/${item._id}`
                      )
                    }
                  >

                    Read More

                    <FaArrowRight />

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>
    </>
  );
};

export default Programs;
