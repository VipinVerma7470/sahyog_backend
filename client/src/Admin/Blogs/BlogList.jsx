import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Blog.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ===============================
  // Fetch Blogs
  // ===============================

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/blogs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogs(response.data.blogs || []);

    } catch (error) {
      console.error(
        "Fetch Blogs Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to fetch blogs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ===============================
  // Delete Blog
  // ===============================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/blogs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      // UI se immediately remove
      setBlogs((prevBlogs) =>
        prevBlogs.filter(
          (blog) => blog._id !== id
        )
      );

    } catch (error) {
      console.error(
        "Delete Blog Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete blog"
      );
    }
  };

  // ===============================
  // Search Blogs
  // ===============================

  const filteredBlogs = blogs.filter(
    (blog) =>
      `${blog.title} ${blog.category} ${blog.author}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="blog-admin-page">

      {/* Header */}

      <div className="blog-admin-header">

        <div>

          <h2>
            Blog Management
          </h2>

          <p>
            Manage all blogs from one place.
          </p>

        </div>

        <Link
          to="/admin/blogs/add"
          className="add-blog-btn"
        >

          <FaPlus />

          Add Blog

        </Link>

      </div>

      {/* Search */}

      <div className="blog-search">

        <FaSearch
          className="search-icon"
        />

        <input
          type="text"
          placeholder="Search Blog..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* Loading */}

      {loading ? (

        <p>
          Loading blogs...
        </p>

      ) : filteredBlogs.length === 0 ? (

        <p>
          No blogs found.
        </p>

      ) : (

        <div className="blog-table-wrapper">

          <table className="blog-table">

            <thead>

              <tr>

                <th>
                  Image
                </th>

                <th>
                  Title
                </th>

                <th>
                  Category
                </th>

                <th>
                  Date
                </th>

                <th>
                  Author
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredBlogs.map(
                (blog) => (

                  <tr
                    key={blog._id}
                  >

                    <td>

                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="blog-thumb"
                      />

                    </td>

                    <td>
                      {blog.title}
                    </td>

                    <td>
                      {blog.category}
                    </td>

                    <td>
                      {new Date(
                        blog.createdAt
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>

                    <td>
                      {blog.author}
                    </td>

                    <td>

                      <Link
                        to={`/admin/blogs/edit/${blog._id}`}
                        className="edit-btn"
                      >

                        <FaEdit />

                      </Link>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            blog._id
                          )
                        }
                      >

                        <FaTrash />

                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default BlogList;