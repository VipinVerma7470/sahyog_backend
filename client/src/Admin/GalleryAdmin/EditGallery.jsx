import { useEffect, useState } from "react";
import "./GalleryAdmin.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });

  const [currentImages, setCurrentImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // ===============================
  // Fetch Gallery By ID
  // ===============================

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/gallery/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const gallery = response.data.gallery;

      setFormData({
        title: gallery.title || "",
        category: gallery.category || "",
        description: gallery.description || "",
      });

      setCurrentImages(gallery.images || []);
    } catch (error) {
      console.error(
        "Fetch Gallery By ID Error:",
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
  }, [id]);

  // ===============================
  // Handle Text Change
  // ===============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===============================
  // Handle New Images
  // ===============================

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    setNewImages(files);
  };

  // ===============================
  // Update Gallery
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append(
        "description",
        formData.description
      );

      // New images selected hain
      if (newImages.length > 0) {
        newImages.forEach((image) => {
          data.append("images", image);
        });
      }

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/gallery/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      navigate("/admin/gallery");
    } catch (error) {
      console.error(
        "Update Gallery Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update gallery"
      );
    } finally {
      setUpdating(false);
    }
  };

  // ===============================
  // Loading State
  // ===============================

  if (loading) {
    return (
      <div className="admin-page">
        <p>Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">

      <h2>Edit Gallery</h2>

      <form
        className="admin-form"
        onSubmit={handleSubmit}
      >

        {/* ===============================
            Title & Category
        =============================== */}

        <div className="form-row">

          <div className="form-group">

            <label>Gallery Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Gallery Title"
              required
            />

          </div>

          <div className="form-group">

            <label>Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Category
              </option>

              <option value="Education">
                Education
              </option>

              <option value="Healthcare">
                Healthcare
              </option>

              <option value="Women">
                Women Empowerment
              </option>

              <option value="Environment">
                Environment
              </option>

              <option value="Events">
                Events
              </option>

            </select>

          </div>

        </div>

        {/* ===============================
            Description
        =============================== */}

        <div className="form-group">

          <label>Description</label>

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Gallery Description"
          />

        </div>

        {/* ===============================
            Current Images
        =============================== */}

        <div className="form-group">

          <label>Current Images</label>

          <div className="preview-grid">

            {currentImages.length > 0 ? (

              currentImages.map(
                (image, index) => (

                  <div
                    className="preview-card"
                    key={index}
                  >

                    <img
                      src={image}
                      alt={`Current ${index + 1}`}
                    />

                  </div>

                )
              )

            ) : (

              <p>
                No current images found
              </p>

            )}

          </div>

        </div>

        {/* ===============================
            Replace Images
        =============================== */}

        <div className="form-group">

          <label>
            Replace Images
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
          />

          <small>
            Select new images only if you want
            to replace the existing images.
          </small>

        </div>

        {/* ===============================
            New Images Preview
        =============================== */}

        {newImages.length > 0 && (

          <div className="form-group">

            <label>
              New Images Preview
            </label>

            <div className="preview-grid">

              {newImages.map(
                (image, index) => (

                  <div
                    className="preview-card"
                    key={index}
                  >

                    <img
                      src={URL.createObjectURL(image)}
                      alt={`New Preview ${index + 1}`}
                    />

                  </div>

                )
              )}

            </div>

          </div>

        )}

        {/* ===============================
            Submit Button
        =============================== */}

        <button
          type="submit"
          className="save-btn"
          disabled={updating}
        >

          {updating
            ? "Updating..."
            : "Update Gallery"}

        </button>

      </form>

    </div>
  );
};

export default EditGallery;