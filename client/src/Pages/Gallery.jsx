import { useState, useRef, useEffect } from "react";
import "../Pages/style/Gallery.css";
import { FaChevronRight } from "react-icons/fa";

import banner from "../assets/gallery.jpg";

import SEO from "../Components/SEO";
import { useNavigate } from "react-router-dom";

import { galleryService } from "../services/galleryService";

const Gallery = () => {
  const [active, setActive] = useState("All");
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const activeBtnRef = useRef(null);
  const navigate = useNavigate();

  // =====================================
  // Fetch Gallery From Backend
  // =====================================

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const response = await galleryService.getAll();

      setGalleryData(response.gallery || []);
    } catch (error) {
      console.error("Gallery Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Page Load
  // =====================================

  useEffect(() => {
    fetchGallery();
  }, []);

  // =====================================
  // Active Filter Scroll
  // =====================================

  useEffect(() => {
    activeBtnRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  // =====================================
  // Filter Gallery
  // =====================================

const filteredGallery =
  active === "All"
    ? galleryData
    : galleryData.filter(
        (item) => item.section === active
      );

  return (
    <>
      <SEO
        title="Gallery | Sahyog Welfare Foundation"
        description="View photos of our social work, health camps and educational activities."
        keywords="NGO Gallery, Photos"
        image="/logo.png"
        url="https://www.sahyogfoundation.org/gallery"
      />

      {/* ================= Banner ================= */}

      <section className="gallery-banner">

        <div className="gallery-overlay"></div>

        <img
          src={banner}
          alt="Gallery Banner"
        />

        <div className="gallery-banner-content">

          <h1>Gallery</h1>

          <p>

            <span
              className="events-crumb-home"
              onClick={() => navigate("/")}
            >
              Home
            </span>

            <FaChevronRight />

            Gallery

          </p>

        </div>

      </section>

      {/* ================= Gallery ================= */}

      <section className="gallery-page">

        <div className="container">

          {/* Filter Buttons */}

          <div className="gallery-filter">

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
              All
            </button>

            <button
              ref={
                active === "Events"
                  ? activeBtnRef
                  : null
              }
              className={
                active === "Events"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActive("Events")
              }
            >
              Events
            </button>

            <button
              ref={
                active === "Programs"
                  ? activeBtnRef
                  : null
              }
              className={
                active === "Programs"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActive("Programs")
              }
            >
              Programs
            </button>

            <button
              ref={
                active === "Activities"
                  ? activeBtnRef
                  : null
              }
              className={
                active === "Activities"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActive("Activities")
              }
            >
              Activities
            </button>

          </div>

          {/* ================= Gallery Grid ================= */}

          {loading ? (

            <div className="gallery-loading">
              Loading gallery...
            </div>

          ) : filteredGallery.length === 0 ? (

            <div className="gallery-empty">
              No gallery images found.
            </div>

          ) : (

            <div className="gallery-grid">

              {filteredGallery.map((item) => (

                <div
                  className="gallery-card"
                  key={item._id}
                >

                  {/* Backend se image URL */}

                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                  />

                  <div className="gallery-hover">

                    <span>
                      {item.title}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

    </>
  );
};

export default Gallery;