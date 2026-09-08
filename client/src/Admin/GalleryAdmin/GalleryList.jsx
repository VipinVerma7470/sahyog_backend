import { useEffect, useState } from "react";
import "./GalleryAdmin.css";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import axios from "axios";

const GalleryList = () => {
  const [gallery, setGallery] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ===============================
  // Fetch Gallery
  // ===============================

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/gallery",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGallery(
        response.data.gallery || []
      );
    } catch (error) {
      console.error(
        "Fetch Gallery Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to fetch gallery"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // ===============================
  // Delete Gallery
  // ===============================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gallery?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/gallery/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      setGallery((prevGallery) =>
        prevGallery.filter(
          (item) => item._id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete Gallery Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete gallery"
      );
    }
  };

  // ===============================
  // Search Gallery
  // ===============================

  const filteredGallery = gallery.filter(
    (item) =>
      `${item.title} ${item.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">

      {/* ===============================
          Header
      =============================== */}

      <div className="page-header">

        <div>

          <h2>
            Gallery Management
          </h2>

          <p>
            Add, Update and Delete Gallery Images
          </p>

        </div>

        <Link
          to="/admin/gallery/add"
          className="add-btn"
        >

          <FaPlus />

          Add Gallery

        </Link>

      </div>

      {/* ===============================
          Search Toolbar
      =============================== */}

      <div className="toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Gallery..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* ===============================
          Loading
      =============================== */}

      {loading ? (

        <p>
          Loading gallery...
        </p>

      ) : filteredGallery.length === 0 ? (

        <p>
          No gallery found.
        </p>

      ) : (

        <div className="gallery-admin-grid">

          {filteredGallery.map(
            (item) => (

              <div
                className="gallery-admin-card"
                key={item._id}
              >

                {/* ===============================
                    First Image
                =============================== */}

                <img
                  src={item.images?.[0]}
                  alt={item.title}
                />

                {/* ===============================
                    Content
                =============================== */}

                <div className="gallery-admin-content">

                  <span>
                    {item.category}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  {item.description && (

                    <p>
                      {item.description}
                    </p>

                  )}

                  <div className="gallery-admin-buttons">

                    <Link
                      to={`/admin/gallery/edit/${item._id}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(
                          item._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
};

export default GalleryList;