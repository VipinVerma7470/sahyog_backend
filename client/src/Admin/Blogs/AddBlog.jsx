import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Blog.css";
import axios from "axios";

const AddBlog = () => {
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    category: "",
    author: "",
      tags: "",
    content: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  // ===============================
  // Handle Text Change
  // ===============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===============================
  // Handle Image
  // ===============================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ===============================
  // Submit Blog
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload a blog image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", blog.title);
      formData.append("category", blog.category);
      formData.append("author", blog.author);
      formData.append("tags", blog.tags);
      formData.append("content", blog.content);

      // Backend expects "image"
      formData.append("image", image);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/blogs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      // Successful add ke baad list page
      navigate("/admin/blogs");

    } catch (error) {
      console.error(
        "Add Blog Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to add blog"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-form-page">

      <div className="form-header">

        <div>

          <h2>Add New Blog</h2>

          <p>
            Create a new blog for your website.
          </p>

        </div>

        <Link
          to="/admin/blogs"
          className="back-btn"
        >
          Back
        </Link>

      </div>

      <form
        className="blog-form"
        onSubmit={handleSubmit}
      >

        <div className="form-grid">

          {/* Title */}

          <div className="form-group">

            <label>
              Blog Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter Blog Title"
              value={blog.title}
              onChange={handleChange}
              required
            />

          </div>

          {/* Category */}

          <div className="form-group">

            <label>
              Category
            </label>

            <select
              name="category"
              value={blog.category}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Category
              </option>

              <option value="Education">
                Education
              </option>

              <option value="Health">
                Health
              </option>

              <option value="Environment">
                Environment
              </option>

              <option value="Women Empowerment">
                Women Empowerment
              </option>

              <option value="Social Work">
                Social Work
              </option>

            </select>

          </div>

          {/* Tags */}
<div className="form-group">
  <label>Tags</label>
  <input
    type="text"
    name="tags"
    placeholder="e.g. education, children, donation, ngo"
    value={blog.tags}
    onChange={handleChange}
  />
  <small className="input-hint">
    Separate tags with commas.
  </small>
</div>

          {/* Author */}

          <div className="form-group">

            <label>
              Author Name
            </label>

            <input
              type="text"
              name="author"
              placeholder="Author Name"
              value={blog.author}
              onChange={handleChange}
              required
            />

          </div>

          {/* Image */}

          <div className="form-group">

            <label>
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              required
            />

          </div>

        </div>

        {/* Image Preview */}

        {imagePreview && (

          <div className="image-preview">

            <img
              src={imagePreview}
              alt="Blog Preview"
            />

          </div>

        )}

        {/* Blog Content */}

        <div className="form-group">

          <label>
            Full Blog Content
          </label>

          <textarea
            rows="10"
            name="content"
            placeholder="Write Complete Blog..."
            value={blog.content}
            onChange={handleChange}
            required
          />

        </div>

        {/* Buttons */}

        <div className="form-buttons">

          <button
            type="submit"
            className="save-btn"
            disabled={loading}
          >

            {loading
              ? "Publishing..."
              : "Publish Blog"}

          </button>

          <Link
            to="/admin/blogs"
            className="cancel-btn"
          >
            Cancel
          </Link>

        </div>

      </form>

    </div>
  );
};

export default AddBlog;