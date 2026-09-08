import "../Pages/style/About.css";
import {
  FaCheckCircle,
  FaHandHoldingHeart,
  FaUsers,
  FaGlobeAsia,
  FaAward
} from "react-icons/fa"; // New stats icons imported helper tools

import banner from "../assets/about-banner.png";
import directorImg from "../assets/director.jpeg";
import storyImg from "../assets/about.png";
//achivements
import envPhoto from "../assets/programs4.jpeg"; 
import awardPhoto from "../assets/img3.jpeg"; 
import skillPhoto from "../assets/skills.jpeg"; 
import healthPhoto from "../assets/itiNasha.jpeg";
import SEO from "../Components/SEO";
import { useNavigate } from "react-router-dom";

const journey = [
  {
    year: "2018",
    title: "Foundation",
    desc: "Established",
  },
  {
    year: "2020",
    title: "First Education",
    desc: "Program",
  },
  {
    year: "2022",
    title: "Health Camps",
    desc: "Initiated",
  },
  {
    year: "2024",
    title: "Women Empowerment",
    desc: "Programs",
  },
  {
    year: "2026",
    title: "Expanded",
    desc: "To More Communities",
  },
];

// Achievements Local Configuration Set array list mapping framework
const achievements = [
  {
    id: 1,
    image: envPhoto, // Icon ki jagah image property use ki
    count: "100+",
    title: "Trees Planted",
    desc: "'Ek Ped Maa Ke Naam' initiative & tree plantation drives across areas.",
    colorClass: "green-accent"
  },
  {
    id: 2,
    image: awardPhoto,
    count: "Govt. Honored",
    title: "State Level Award",
    desc: "Sammanit by Backward Classes & Minorities Welfare Minister Smt. Krishna Gaur ji.",
    colorClass: "orange-accent"
  },
  {
    id: 3,
    image: skillPhoto,
    count: "NIESBUD Partners",
    title: "Skill Certification",
    desc: "Empowering youth via Solar installation, Stitching, & Beauty Therapist courses.",
    colorClass: "green-accent"
  },
  {
    id: 4,
    image: healthPhoto,
    count: "5+ Campaigns",
    title: "Health & Social Drives",
    desc: "Nasha Mukt Bharat pledge in ITI colleges, CPR setups, & Anemia control camps.",
    colorClass: "orange-accent"
  }
];

const About = () => {
  const navigate = useNavigate();
  return (
    <>
       <SEO
title="About Us | Sahyog Welfare Foundation"
description="Learn about Sahyog Welfare Foundation, our mission, vision and impact."
keywords="About NGO, Sahyog Foundation"
image="/logo.png"
url="https://www.sahyogfoundation.org/about"
/>
      {/* ================= Banner ================= */}
      <section
        className="about-banner"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className="about-overlay">
          <div className="container">
            <h1>About Us</h1>
            <p>
             <span id="homenavi" onClick={() => navigate("/")}> Home</span> 
              <span id="arrow"  >&gt;</span>
              About Us
            </p>
          </div>
        </div>
      </section>

      {/* ================= Story ================= */}
      <section className="story-section">
        <div className="container story-wrapper">
          {/* Left */}
          <div className="story-left">
            <h2>Our Story</h2>
            <p>
              Sahyog Welfare Foundation was established
              with a vision to bring positive change in
              society.
              <br />
              <br />
              Over the years, we have worked on various
              initiatives that have transformed
              thousands of lives.
            </p>

            <div className="story-list">
              <div className="story-item">
                <FaCheckCircle />
                <span>Registered Non-Profit Organization</span>
              </div>
              <div className="story-item">
                <FaCheckCircle />
                <span>Transparent & Accountable</span>
              </div>
              <div className="story-item">
                <FaCheckCircle />
                <span>Dedicated & Experienced Team</span>
              </div>
              <div className="story-item">
                <FaCheckCircle />
                <span>Community Driven Impact</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="story-right">
            <img src={storyImg} alt="" />
          </div>
        </div>
      </section>

      {/* ================= Achievements / Impact Section (NEWLY INTEGRATED) ================= */}
      <section className="achievements-section">
        <div className="container">
          <div className="achievements-header">
            <span className="subtitle">Our Impact</span>
            <h2>Milestones We've Achieved Together</h2>
            <div className="title-underline"></div>
          </div>

          <div className="achievements-grid">
            {achievements.map((item) => (
              <div className={`achievement-card ${item.colorClass}`} key={item.id}>
                <div className="achievements-img-wrapper">
                    <img src={item.image} alt={item.title} />
                </div>
                <h3 className="achievement-count">{item.count}</h3>
                <h4 className="achievement-title">{item.title}</h4>
                <p className="achievement-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Board of Directors ================= */}
      <section className="director-section">
        <div className="container director-wrapper">
          {/* Left Content */}
          <div className="director-content">
            <span className="director-tag">Leadership</span>
            <h2>Board of Directors</h2>
            <h4>Mr.Rajkumar Vishwakarma</h4>
            <p className="director-designation">Founder & Managing Director</p>
            <p>
              Our Board of Directors provides strategic guidance and
              leadership to ensure the Foundation remains committed
              to its mission of creating meaningful social impact.
              Their experience, integrity, and dedication help us
              strengthen our initiatives in education, healthcare,
              women empowerment, environmental sustainability, and
              community development.
            </p>

            <div className="director-points">
              <div className="point">
                <FaCheckCircle />
                <span>Visionary Leadership</span>
              </div>
              <div className="point">
                <FaCheckCircle />
                <span>Transparent Governance</span>
              </div>
              <div className="point">
                <FaCheckCircle />
                <span>Community-Centered Decisions</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="director-image">
            <img src={directorImg} alt="Board Director" />
          </div>
        </div>
      </section>

      {/* ================= Mission Vision ================= */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-wrapper">
            <div className="mission-box">
              <h3>Our Mission</h3>
              <p>
                To empower communities through education,
                healthcare and sustainable development.
              </p>
            </div>

            <div className="mission-box">
              <h3>Our Vision</h3>
              <p>
                To build a just, equal and compassionate
                society where everyone has the
                opportunity to thrive.
              </p>
            </div>

            <div className="mission-box">
              <h3>Our Values</h3>
              <p>
                Integrity,
                Transparency,
                Compassion,
                Inclusion and Commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Journey ================= */}
      <section className="journey-section">
        <div className="container">
          <h2 className="journey-title">Our Journey</h2>
          <div className="journey-line">
            {journey.map((item, index) => (
              <div className="journey-item" key={index}>
                <span className="journey-year">{item.year}</span>
                <div className="journey-dot"></div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;