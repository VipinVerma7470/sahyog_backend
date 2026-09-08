import { useNavigate } from "react-router-dom";
import "./Programs.css";
import {
  FaGraduationCap,
  FaHeartbeat,
  FaFemale,
  FaTree,
  FaArrowRight,
} from "react-icons/fa";

const programData = [
  {
    id: 1,
    icon: <FaGraduationCap />,
    title: "Education",
    desc: "Providing quality education, scholarships and digital learning opportunities for underprivileged children.",
    color: "#F9A825",
  },
  {
    id: 2,
    icon: <FaHeartbeat />,
    title: "Healthcare",
    desc: "Organizing free health camps, medical awareness and healthcare support for rural communities.",
    color: "#1E88E5",
  },
   {
    id: 3,
    icon: <FaTree />,
    title: "Environment",
    desc: "Tree plantation drives, awareness campaigns and sustainable environmental initiatives.",
    color: "#66BB6A",
  },
  {
    id: 4,
    icon: <FaFemale />,
    title: "Women Empowerment",
    desc: "Helping women through skill development, entrepreneurship and self-employment programs.",
    color: "#EC407A",
  },
 
];

const Programs = () => {
  const navigate = useNavigate();
  return (
    <section className="programs-section">

      <div className="container">

        <div className="section-heading">

          <span>OUR KEY PROGRAMS</span>

          <h2>Creating Impact Through Every Initiative</h2>

          <p>
            We focus on meaningful programs that empower communities
            and improve lives through education, healthcare and
            sustainable development.
          </p>

        </div>

        <div className="program-grid">

          {programData.map((item) => (

            <div className="program-card" key={item.id}>

              <div
                className="program-icon"
                style={{ background: item.color }}
              >
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

              <button onClick={() => navigate(`/programs/${item.id}`)}>

                Learn More

                <FaArrowRight />

              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Programs;