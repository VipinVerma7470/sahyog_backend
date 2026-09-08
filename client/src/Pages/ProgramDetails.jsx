import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  FaChevronRight,
  FaArrowLeft,
  FaHeart,
} from "react-icons/fa";

import "./style/ProgramDetail.css";

import banner from "../assets/ngo.jpg";

import SEO from "../Components/SEO";

import {
  programService,
} from "../services/programService";


// =================================
// Banner
// =================================

const ProgramDetailBanner = ({
  title,
}) => {
  return (
    <section className="prog-detail-banner">

      <img
        src={banner}
        alt="NGO Banner"
      />

      <div className="prog-banner-overlay"></div>

      <div className="prog-banner-content">

        <h1>
          {title}
        </h1>

        <p>

          <Link to="/">
            Home
          </Link>

          <FaChevronRight />

          <Link to="/programs">
            Programs
          </Link>

          <FaChevronRight />

          <span className="prog-active-crumb">
            Details
          </span>

        </p>

      </div>

    </section>
  );
};


// =================================
// Program Detail
// =================================

const ProgramDetail = () => {

  const {
    id,
  } = useParams();


  const [
    program,
    setProgram,
  ] = useState(null);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  // ===============================
  // Fetch Program By ID
  // ===============================

  useEffect(() => {

    const fetchProgram = async () => {

      try {

        setLoading(true);

        const response =
          await programService.getById(id);

        console.log(
          "Program Detail Response:",
          response
        );

        setProgram(
          response.program ||
          response.data
        );

      } catch (error) {

        console.error(
          "Program Detail Error:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Failed to load program"
        );

      } finally {

        setLoading(false);

      }

    };


    fetchProgram();

  }, [id]);


  // ===============================
  // Loading
  // ===============================

  if (loading) {

    return (
      <div className="prog-not-found">

        <h2>
          Loading Program...
        </h2>

      </div>
    );

  }


  // ===============================
  // Error / Not Found
  // ===============================

  if (error || !program) {

    return (
      <div className="prog-not-found">

        <h2>
          {error || "Program Not Found!"}
        </h2>

        <Link
          to="/programs"
          className="prog-back-btn"
        >

          <FaArrowLeft />

          Back to Programs

        </Link>

      </div>
    );

  }


  return (

    <div className="program-detail-page-wrapper">

      <SEO
        title={`${program.title} | Sahyog Welfare Foundation`}
        description={
          program.description
        }
        keywords={`${program.category}, NGO program`}
        image={program.image}
        url={`https://www.sahyogfoundation.org/programs/${program._id}`}
      />


      <ProgramDetailBanner
        title={program.title}
      />


      <section className="prog-detail-content-section">

        <div className="prog-detail-container">

          <div className="prog-detail-grid">


            {/* LEFT SIDE */}

            <div className="prog-detail-main">


              <div className="prog-detail-image-box">

                <img
                  src={program.image}
                  alt={program.title}
                />

              </div>


              <div className="prog-detail-text">

                <h2>
                  About The{" "}
                  {program.title}{" "}
                  Initiative
                </h2>


                <p className="prog-lead-text">

                  {program.description}

                </p>


                <p className="prog-full-body-text">

                  {program.fullDescription ||
                    program.description}

                </p>


                {program.impact && (

                  <div className="prog-impact-card">

                    <h4>
                      Key Impact Till Date
                    </h4>

                    <p>
                      {program.impact}
                    </p>

                  </div>

                )}

              </div>


              <div className="prog-detail-footer">

                <Link
                  to="/programs"
                  className="prog-back-btn"
                >

                  <FaArrowLeft />

                  Back to All Programs

                </Link>

              </div>

            </div>


            {/* RIGHT SIDEBAR */}

            <div className="prog-detail-sidebar">

              <div className="prog-cta-box">

                <FaHeart
                  className="heart-icon"
                />


                <h3>
                  Support This Mission
                </h3>


                <p>
                  Your contribution can directly
                  support this program and help us
                  create a meaningful impact.
                </p>


                <Link
                  to="/donate"
                  className="prog-donate-now-btn"
                >

                  Donate Now

                </Link>

              </div>

            </div>


          </div>

        </div>

      </section>

    </div>

  );

};


export default ProgramDetail;