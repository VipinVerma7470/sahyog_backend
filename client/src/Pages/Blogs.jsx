import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Pages/style/Blog.css";
import SEO from "../Components/SEO";
import { useNavigate } from "react-router-dom";

import { blogService } from "../services/blogService";

// ===============================
// Blog Banner
// ===============================

const BlogBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="blog-banner">
      <div className="blog-banner-overlay">
        <h1>Latest News & Blogs</h1>

        <p className="blog-breadcrumb">
          <span className="blog-crumb-home" onClick={() => navigate("/")}>
            Home
          </span>
          &gt;
          <span className="blog-crumb-current">Blog</span>
        </p>
      </div>
    </div>
  );
};

// ===============================
// Blog Card
// ===============================

const BlogCard = ({ id, image, title, excerpt, date, author }) => {
  return (
    <div className="blog-card">
      <div className="blog-card-image">
        <img src={image} alt={title} />
      </div>

      <div className="blog-card-content">
        <h3 className="blog-card-title">{title}</h3>

        <p className="blog-card-excerpt">{excerpt}</p>

        <div className="blog-card-meta">
          <span className="blog-meta-date">{date}</span>

          <span className="blog-meta-divider">•</span>

          <span className="blog-meta-author">By {author}</span>
        </div>

        <Link className="blog-readmore-btn" to={`/blog/${id}`}>
          Read More
        </Link>
      </div>
    </div>
  );
};

// ===============================
// Pagination
// ===============================

const BlogPagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="blog-pagination">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`page-num ${currentPage === index + 1 ? "active" : ""}`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

// ===============================
// Main Blogs Page
// ===============================

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;

  // ===============================
  // Fetch Blogs
  // ===============================

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response = await blogService.getAll();

      setBlogs(response.blogs || []);
    } catch (error) {
      console.error("Blog Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ===============================
  // Pagination
  // ===============================

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const currentBlogs = blogs.slice(
    (currentPage - 1) * blogsPerPage,

    currentPage * blogsPerPage,
  );

  return (
    <>
      <SEO
        title="Blogs | Sahyog Welfare Foundation"
        description="Read our latest blogs and inspiring stories."
        keywords="NGO Blog, Articles"
        image="/logo.png"
        url="https://www.sahyogfoundation.org/blogs"
      />

      <div className="blog-page-wrapper">
        <BlogBanner />

        <div className="blog-content-container">
          {loading ? (
            <div className="blog-loading">Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="blog-empty">No blogs found.</div>
          ) : (
            <div className="blog-grid">
              {currentBlogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                    id={blog.slug || blog._id}
                  image={blog.image}
                  title={blog.title}
                  excerpt={
                    blog.content
                      ? blog.content.replace(/<[^>]*>/g, "").slice(0, 150) +
                        "..."
                      : ""
                  }
                  date={
                    blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : ""
                  }
                  author={blog.author}
                />
              ))}
            </div>
          )}

          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default Blogs;
