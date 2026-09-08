import "./Counter.css";
import {
  FaHandsHelping,
  FaUsers,
  FaBookOpen,
  FaLeaf,
} from "react-icons/fa";

const counterData = [
  {
    id: 1,
    icon: <FaHandsHelping />,
    number: "1500+",
    title: "Families Helped",
    color: "#2E7D32",
  },
  {
    id: 2,
    icon: <FaUsers />,
    number: "250+",
    title: "Volunteers",
    color: "#1565C0",
  },
  {
    id: 3,
    icon: <FaBookOpen />,
    number: "40+",
    title: "Projects",
    color: "#F9A825",
  },
  {
    id: 4,
    icon: <FaLeaf />,
    number: "12+",
    title: "Years of Service",
    color: "#7CB342",
  },
];

const Counter = () => {
  return (
    <section className="counter-section">
      <div className="container counter-wrapper">
        {counterData.map((item) => (
         <div className="counter-card" key={item.id}>
  <div
    className="counter-icon"
    style={{ background: item.color }}
  >
    {item.icon}
  </div>

  <div className="counter-info">
    <h2>{item.number}</h2>
    <p>{item.title}</p>
  </div>
</div>
        ))}
      </div>
    </section>
  );
};

export default Counter;