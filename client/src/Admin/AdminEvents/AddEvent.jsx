import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EventsAdmin.css";


const AddEvent = () => {

  const navigate = useNavigate();


  const [formData,setFormData] = useState({

    title:"",
    location:"",
    date:"",
    time:"",
    description:"",
    image:null,
    status:"Upcoming",

  });



  const handleChange=(e)=>{

    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });

  };



  const handleImage=(e)=>{

    setFormData({
      ...formData,
      image:e.target.files[0]
    });

  };



  const handleSubmit=async(e)=>{

    e.preventDefault();


    try{


      const token = localStorage.getItem("token");


      const data = new FormData();


      data.append("title",formData.title);
      data.append("location",formData.location);
      data.append("date",formData.date);
      data.append("time",formData.time);
      data.append("description",formData.description);
      data.append("status",formData.status);


      if(formData.image){
        data.append("image",formData.image);
      }



      await axios.post(
        "http://localhost:5000/api/events",
        data,
        {
          headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"multipart/form-data"
          }
        }
      );


      alert("Event Added Successfully");

      navigate("/admin/events");


    }catch(error){

      console.log(error);
      alert(
        error.response?.data?.message ||
        "Failed to add event"
      );

    }

  };




return (

<div className="admin-page">


<h2>Add New Event</h2>


<form 
className="admin-form"
onSubmit={handleSubmit}
>


<div className="form-row">


<div className="form-group">

<label>Event Name</label>

<input
type="text"
name="title"
value={formData.title}
onChange={handleChange}
required
/>

</div>



<div className="form-group">

<label>Location</label>

<input
type="text"
name="location"
value={formData.location}
onChange={handleChange}
required
/>

</div>


</div>



<div className="form-row">


<div className="form-group">

<label>Date</label>

<input
type="date"
name="date"
value={formData.date}
onChange={handleChange}
required
/>

</div>



<div className="form-group">

<label>Time</label>

<input
type="time"
name="time"
value={formData.time}
onChange={handleChange}
/>

</div>


</div>



<div className="form-group">

<label>Description</label>

<textarea
rows="6"
name="description"
value={formData.description}
onChange={handleChange}
/>

</div>



<div className="form-group">

<label>Upload Banner</label>

<input
type="file"
accept="image/*"
onChange={handleImage}
/>

</div>



<div className="form-group">

<label>Status</label>

<select
name="status"
value={formData.status}
onChange={handleChange}
>

<option value="Upcoming">
Upcoming
</option>


<option value="Completed">
Completed
</option>


</select>

</div>



<button className="save-btn">
Save Event
</button>



</form>


</div>

)

}

export default AddEvent;