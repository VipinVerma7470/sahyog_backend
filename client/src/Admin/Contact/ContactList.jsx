import React, {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import "./Contact.css";

import {
  FaSearch,
  FaEye,
} from "react-icons/fa";

import {
  contactService,
} from "../../services/contactService";


const ContactList = () => {

  const [
    contacts,
    setContacts,
  ] = useState([]);


  const [
    search,
    setSearch,
  ] = useState("");


  const [
    activeFilter,
    setActiveFilter,
  ] = useState("CONTACT");


  const [
    loading,
    setLoading,
  ] = useState(true);


  const fetchContacts = async () => {

    try {

      setLoading(true);

      const response =
        await contactService.getAll();

      setContacts(
        response.contacts || []
      );

    } catch (error) {

      console.error(
        "Fetch Contacts Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchContacts();

  }, []);


  const filteredContacts =
    contacts.filter((item) => {

      const searchText =
        search.toLowerCase();


      const matchesFilter =
        item.type === activeFilter;


      const matchesSearch =
        item.name
          ?.toLowerCase()
          .includes(searchText) ||

        item.email
          ?.toLowerCase()
          .includes(searchText) ||

        item.subject
          ?.toLowerCase()
          .includes(searchText) ||

        item.eventTitle
          ?.toLowerCase()
          .includes(searchText);


      return (
        matchesFilter &&
        matchesSearch
      );

    });


  return (

    <div className="contact-page">


      <div className="contact-header">

        <div>

          <h2>
            {activeFilter === "CONTACT"
              ? "Contact Messages"
              : "Volunteer Registrations"}
          </h2>

          <p>
            View all messages received from the website.
          </p>

        </div>

      </div>


      {/* FILTER BUTTONS */}

      <div className="contact-filters">

        <button
          className={
            activeFilter === "CONTACT"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveFilter("CONTACT")
          }
        >
          Contact Info
        </button>


        <button
          className={
            activeFilter === "VOLUNTEER"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveFilter("VOLUNTEER")
          }
        >
          Volunteer Info
        </button>

      </div>


      {/* SEARCH */}

      <div className="contact-search">

        <FaSearch
          className="search-icon"
        />

        <input
          type="text"
          placeholder={
            activeFilter === "CONTACT"
              ? "Search contact..."
              : "Search volunteer..."
          }
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      <div className="contact-table-wrapper">


        {loading ? (

          <div className="contact-loading">
            Loading messages...
          </div>

        ) : filteredContacts.length === 0 ? (

          <div className="contact-empty">
            No records found.
          </div>

        ) : (

          <table className="contact-table">

            <thead>

              <tr>

                <th>Name</th>

                <th>Email</th>


               <th>Phone</th>


                {activeFilter === "VOLUNTEER" && (
                  <th>Event</th>
                )}


                {activeFilter === "CONTACT" && (
                  <th>Subject</th>
                )}


                <th>Date</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>


            <tbody>

              {filteredContacts.map(
                (item) => (

                  <tr key={item._id}>

                    <td>
                      {item.name}
                    </td>


                    <td>
                      {item.email}
                    </td>


                    <td>
        {item.phone || "N/A"}
      </td>


                    {activeFilter === "VOLUNTEER" && (

                      <td>
                        {item.eventTitle}
                      </td>

                    )}


                    {activeFilter === "CONTACT" && (

                      <td>
                        {item.subject}
                      </td>

                    )}


                    <td>
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </td>


                    <td>

                      <span
                        className={`contact-status ${item.status.toLowerCase()}`}
                      >

                        {item.status}

                      </span>

                    </td>


                    <td>

                      <Link
                        to={`/admin/contact/${item._id}`}
                        className="view-btn"
                      >

                        <FaEye />

                        View

                      </Link>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>

    </div>

  );

};


export default ContactList;