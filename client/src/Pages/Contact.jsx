import React, { useState } from "react";
import "./style/Contact.css"; // Alag se banayi gayi CSS file ko import kiya
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import SEO from "../Components/SEO";
import { contactService } from "../services/contactService";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await contactService.create(formData);

      alert(response.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact Submit Error:", error);

      alert(error.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <>
      <SEO
        title="Contact Us | Sahyog Welfare Foundation"
        description="Contact Sahyog Welfare Foundation for volunteering, donations and partnerships."
        keywords="Contact NGO"
        image="/logo.png"
        url="https://www.sahyogfoundation.org/contact"
      />

      <div className="contact-page-container">
        {/* Hero Banner Section */}
        <div className="contact-hero">
          <h1>Contact Us</h1>
          <p>
            Get in touch with Sahyog Welfare Foundation. We would love to hear
            from you!
          </p>
        </div>

        <div className="contact-content-wrapper">
          {/* Left Side: Contact Info & Social Media */}
          <div className="contact-info-sidebar">
            <h2>Get In Touch</h2>
            <p className="info-subtitle">
              Have questions or want to volunteer? Reach out to us directly.
            </p>

            <div className="info-details-list">
              <div className="info-item">
                <div className="info-icon-box">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-text">
                  <h3>Our Address</h3>
                  <p>E-3/12, Arera Colony, Bhopal, MP - 462016</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <FaPhoneAlt />
                </div>
                <div className="info-text">
                  <h3>Call Us</h3>
                  <p>+91 8359855109</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <FaEnvelope />
                </div>
                <div className="info-text">
                  <h3>Email Us</h3>
                  <p>Rajkumarvishwakara9575@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="social-media-section">
              <h3>Follow Our Journey</h3>
              <div className="social-icons-row">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon-link fb"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon-link insta"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon-link tw"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon-link ln"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="contact-form-container">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="actual-contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Contact Number</label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Sirf numbers allow + maximum 10 digits
                    if (/^\d{0,10}$/.test(value)) {
                      setFormData({
                        ...formData,
                        phone: value,
                      });
                    }
                  }}
                  placeholder="Enter your 10-digit contact number"
                  maxLength="10"
                  pattern="[0-9]{10}"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Full-Width Section: Google Map */}
        <div className="google-map-section">
          <iframe
            title="Sahyog Foundation Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.273752538184!2d77.4309373!3d23.2331498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c426362d29403%3A0xedc3b88950d885bb!2sArera%20Colony%2C%20Bhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;
