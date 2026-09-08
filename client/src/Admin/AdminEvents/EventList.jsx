import "./EventsAdmin.css";
import {Link} from "react-router-dom";
import {FaPlus,FaSearch} from "react-icons/fa";
import {useEffect,useState} from "react";
import axios from "axios";


const EventList=()=>{


const [events,setEvents]=useState([]);

const [search,setSearch]=useState("");




useEffect(()=>{

fetchEvents();

},[]);




const fetchEvents=async()=>{

try{

const res=await axios.get(
"http://localhost:5000/api/events"
);


setEvents(res.data.events);


}catch(error){

console.log(error);

}


};




const deleteEvent=async(id)=>{


if(!window.confirm("Delete Event?"))
return;


try{


const token=localStorage.getItem("token");


await axios.delete(

`http://localhost:5000/api/events/${id}`,

{

headers:{
Authorization:`Bearer ${token}`
}

}

);



alert("Event Deleted");


fetchEvents();



}catch(error){

console.log(error);

}


};




const filteredEvents=events.filter(item=>

item.title
.toLowerCase()
.includes(search.toLowerCase())

);




return(

<div className="admin-page">


<div className="page-header">

<div>

<h2>Manage Events</h2>

<p>Add Update Delete Events</p>

</div>


<Link
to="/admin/events/add"
className="add-btn"
>

<FaPlus/>
Add Event

</Link>


</div>



<div className="toolbar">


<div className="search-box">

<FaSearch/>

<input

placeholder="Search Event..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>


</div>


</div>




<table className="admin-table">


<thead>

<tr>
<th>Image</th>
<th>Title</th>
<th>Location</th>
<th>Date</th>
<th>Status</th>
<th>Action</th>


</tr>

</thead>



<tbody>


{

filteredEvents.map(item=>(


<tr key={item._id}>
<td>
  {item.image ? (
    <img
      src={item.image}
      alt={item.title}
      className="event-thumb"
    />
  ) : (
    <span className="no-image">
      No Image
    </span>
  )}
</td>

<td>{item.title}</td>


<td>{item.location}</td>


<td>

{
new Date(item.date)
.toLocaleDateString()
}

</td>



<td>

<span
className={
item.status==="Upcoming"
?"status upcoming"
:"status completed"
}
>

{item.status}

</span>


</td>



<td>


<Link

to={`/admin/events/edit/${item._id}`}

className="edit-btn"

>

Edit

</Link>



<button

className="delete-btn"

onClick={()=>deleteEvent(item._id)}

>

Delete

</button>


</td>


</tr>


))

}


</tbody>


</table>


</div>

)

}


export default EventList;