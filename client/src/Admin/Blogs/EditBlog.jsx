import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import "./Blog.css";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    category: "",
    author: "",
    content: "",
  });

  const [currentImage, setCurrentImage] =
    useState("");

  const [newImage, setNewImage] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
    useState(false);

  // ===============================
  // Fetch Blog By ID
  // ===============================

  const fetchBlog = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/blogs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const blogData =
        response.data.blog;

      setBlog({
        title: blogData.title || "",
        category:
          blogData.category || "",
        author:
          blogData.author || "",
        content:
          blogData.content || "",
      });

      setCurrentImage(
        blogData.image || ""
      );

    } catch (error) {
      console.error(
        "Fetch Blog Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to fetch blog"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

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
  // Handle New Image
  // ===============================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setNewImage(file);

      setImagePreview(
        URL.createObjectURL(file)
      );
    }
  };

  // ===============================
  // Update Blog
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const formData = new FormData();

      formData.append(
        "title",
        blog.title
      );

      formData.append(
        "category",
        blog.category
      );

      formData.append(
        "author",
        blog.author
      );

      formData.append(
        "content",
        blog.content
      );

      // Only send new image
      // if selected
      if (newImage) {
        formData.append(
          "image",
          newImage
        );
      }

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      navigate("/admin/blogs");

    } catch (error) {
      console.error(
        "Update Blog Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update blog"
      );
    } finally {
      setUpdating(false);
    }
  };

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <div className="blog-form-page">

        <p>
          Loading blog...
        </p>

      </div>
    );
  }

  return (
    <div className="blog-form-page">

      {/* Header */}

      <div className="form-header">

        <div>

          <h2>
            Edit Blog
          </h2>

          <p>
            Update blog information.
          </p>

        </div>

        <Link
          to="/admin/blogs"
          className="back-btn"
        >
          Back
        </Link>

      </div>

      {/* Form */}

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

          {/* Author */}

          <div className="form-group">

            <label>
              Author
            </label>

            <input
              type="text"
              name="author"
              value={blog.author}
              onChange={handleChange}
              required
            />

          </div>

          {/* Change Image */}

          <div className="form-group">

            <label>
              Change Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

          </div>

        </div>

        {/* Image Preview */}

        <div className="image-preview">

          <img
            src={
              imagePreview ||
              currentImage
            }
            alt="Blog"
          />

        </div>

        {/* Content */}

        <div className="form-group">

          <label>
            Full Blog Content
          </label>

          <textarea
            rows="10"
            name="content"
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
            disabled={updating}
          >

            {updating
              ? "Updating..."
              : "Update Blog"}

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

export default EditBlog;