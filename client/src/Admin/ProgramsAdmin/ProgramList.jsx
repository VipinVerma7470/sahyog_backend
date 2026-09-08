import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ProgramsAdmin.css";

const ProgramList = () => {
  const [programs, setPrograms] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/programs");

      setPrograms(response.data.programs);
    } catch (error) {
      console.log("Fetch Programs Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this program?",
    );

    if (!confirmDelete) return;

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/programs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Program Deleted Successfully");

      fetchPrograms();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <h2>Loading Programs...</h2>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Programs</h2>

        <Link to="/admin/programs/add" className="add-btn">
          + Add Program
        </Link>
      </div>

      {programs.length === 0 ? (
        <h3>No Programs Found</h3>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>

              <th>Program</th>

              <th>Category</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {programs.map((item) => (
              <tr key={item._id}>
                <td>
                  {item.image ? (
                    <img src={item.image} alt={item.title} />
                  ) : (
                    "No Image"
                  )}
                </td>

                <td>{item.title}</td>

                <td>{item.category}</td>

                <td>
                  <Link
                    to={`/admin/programs/edit/${item._id}`}
                    className="edit-btn"
                  >
                    Edit
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProgramList;
