import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import "./style/BlogDetails.css";

import { blogService } from "../services/blogService";
import SEO from "../Components/SEO";

const DetailBanner = ({ title }) => {
return ( <div className="detail-banner"> <div className="detail-banner-overlay"> <h2>{title}</h2> <p className="detail-breadcrumb"> <Link to="/">Home</Link> <FaChevronRight /> <Link to="/blogs">Blog</Link> <FaChevronRight /> <span className="active-crumb">Details</span> </p> </div> </div>
);
};

const BlogDetails = () => {
const { slug } = useParams();

const [blog, setBlog] = useState(null);
const [recentBlogs, setRecentBlogs] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchBlog = async () => {
try {
setLoading(true);


   const response = await blogService.getById(slug);
setBlog(response.blog || response.data);

const allBlogs = await blogService.getAll();

const filtered = (allBlogs.blogs || []).filter(
  (item) => item.slug !== slug
);

setRecentBlogs(filtered.slice(0, 4));
  } catch (error) {
    console.error("Blog Detail Error:", error);
    setBlog(null);
  } finally {
    setLoading(false);
  }
};

fetchBlog();


},  [slug]);

if (loading) {
return ( <div className="blog-not-found"> <h2>Loading Blog...</h2> </div>
);
}

if (!blog) {
return ( <div className="blog-not-found"> <h2>Blog post not found!</h2> <Link to="/blogs" className="back-btn">
Back to Blogs </Link> </div>
);
}

return (
<>
<SEO
title={`${blog.title} | Sahyog Welfare Foundation`}
description={
blog.content
? blog.content.replace(/<[^>]*>/g, "").slice(0, 150)
: ""
}
keywords="NGO Blog, Sahyog Blog"
image={blog.image}
url={`https://www.sahyogfoundation.org/blog/${blog.slug || blog._id}`}
/>


  <div className="blog-detail-wrapper">
    <DetailBanner title={blog.title} />

    <div className="detail-container">
      <div className="detail-layout-grid">
        <article className="main-blog-article">
          <div className="article-main-image">
            <img src={blog.image} alt={blog.title} />
          </div>

          <div className="article-meta-info">
            <span className="art-author">👤 By {blog.author}</span>
            <span className="art-divider">|</span>
            <span className="art-date">
              📅
              {blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : ""}
            </span>
          </div>

          <div className="article-body">
            <div
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />

            <blockquote>
              "True happiness lies in working for the betterment and upliftment
              of humanity." — Sahyog Welfare Foundation
            </blockquote>
          </div>

          <div className="article-footer">
            <Link to="/blogs" className="back-to-blogs-btn">
              ← Back to All Blogs
            </Link>
          </div>
        </article>

        <aside className="blog-sidebar">
          <div className="sidebar-widget">
            <h3>Recent Stories</h3>

            <ul className="recent-posts-list">
              {recentBlogs.map((post) => (
                <li key={post._id}>
                  <Link
                    to={`/blog/${post.slug || post._id}`}
                    className="recent-post-link"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="sidebar-thumb"
                    />

                    <div className="sidebar-post-info">
                      <h4>{post.title}</h4>
                      <span>
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : ""}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-cta-widget">
            <h3>Make a Difference</h3>
            <p>
              Your support can bring education and healthcare to a child
              today.
            </p>

            <Link to="/donate" className="sidebar-donate-btn">
              Donate Now
            </Link>
          </div>
        </aside>
      </div>
    </div>
  </div>
</>


);
};

export default BlogDetails;
