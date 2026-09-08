import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProgramsAdmin.css";

const ProgramEdit = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    fetchProgram();
  }, []);

  const fetchProgram = async () => {
    try {

      const res = await axios.get(
        `http://localhost:5000/api/programs/${id}`
      );

      setFormData({
        title: res.data.program.title,
        category: res.data.program.category,
        description: res.data.program.description,
        image: null,
      });

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleImage = (e) => {

    setFormData({
      ...formData,
      image: e.target.files[0],
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      console.log("TOKEN =", token);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("description", formData.description);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await axios.put(
        `http://localhost:5000/api/programs/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      navigate("/admin/programs");

    } catch (err) {

      console.log(err.response);

      alert(
        err.response?.data?.message ||
        "Update Failed"
      );

    }

  };

  return (

    <div className="admin-page">

      <h2>Edit Program</h2>

      <form
        className="admin-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>Program Name</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

        </div>

        <div className="form-group">

          <label>Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >

            <option value="">Select Category</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Women Empowerment">Women Empowerment</option>
            <option value="Environment">Environment</option>
            <option value="Skill Development">Skill Development</option>

          </select>

        </div>

        <div className="form-group">

          <label>Description</label>

          <textarea
            rows="6"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

        </div>

        <div className="form-group">

          <label>Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

        </div>

        <button
          type="submit"
          className="save-btn"
        >
          Update Program
        </button>

      </form>

    </div>

  );

};

export default ProgramEdit;