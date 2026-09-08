import { useState } from "react";
import "./GalleryAdmin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddGallery = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    section: "",
    description: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);

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
  // Handle Multiple Images
  // ===============================

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  // ===============================
  // Submit Gallery
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      alert("Please select at least one image");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
data.append("category", formData.category);
data.append("section", formData.section);
data.append("description", formData.description);

      formData.images.forEach((image) => {
        data.append("images", image);
      });

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/gallery",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      // Successful add ke baad Gallery List page par redirect
      navigate("/admin/gallery");

    } catch (error) {
      console.error("Add Gallery Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to add gallery"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">

      <h2>Add Gallery Images</h2>

      <form
        className="admin-form"
        onSubmit={handleSubmit}
      >

        {/* ===============================
            Title & Category
        =============================== */}

      <div className="form-row">

  {/* Gallery Title */}

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


  {/* Actual Category */}

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


<div className="form-row">

  <div className="form-group">

    <label>Gallery Section</label>

    <select
      name="section"
      value={formData.section}
      onChange={handleChange}
      required
    >

      <option value="">
        Select Gallery Section
      </option>

      <option value="Programs">
        Programs
      </option>

      <option value="Events">
        Events
      </option>

      <option value="Activities">
        Activities
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
            Upload Images
        =============================== */}

        <div className="form-group">

          <label>Upload Images</label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
            required
          />

        </div>

        {/* ===============================
            Image Preview
        =============================== */}

        {formData.images.length > 0 && (

          <div className="preview-grid">

            {formData.images.map(
              (image, index) => (

                <div
                  className="preview-card"
                  key={index}
                >

                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                  />

                </div>

              )
            )}

          </div>

        )}

        {/* ===============================
            Submit Button
        =============================== */}

        <button
          type="submit"
          className="save-btn"
          disabled={loading}
        >

          {loading
            ? "Uploading..."
            : "Save Gallery"}

        </button>

      </form>

    </div>
  );
};

export default AddGallery;