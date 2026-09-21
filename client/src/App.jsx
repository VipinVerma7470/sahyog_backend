import { Routes, Route } from "react-router-dom";

import Layout from "./Layouts/MainLayout";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Programs from "./Pages/Programs";
import Contact from "./Pages/Contact";
import Events from "./Pages/Events";
import Blogs from "./Pages/Blogs";
import Gallery from "./Pages/Gallery";
import Donate from "./Pages/Donate";
import BlogDetails from "./Pages/BlogDetails";

import AdminLayout from "./Admin/Layout/AdminLayout";
import Dashboard from "./Admin/Dashbaord/Dashbaord";

import ProgramList from "./Admin/ProgramsAdmin/ProgramList";
import AddProgram from "./Admin/ProgramsAdmin/AddProgram";
import ProgramEdit from "./Admin/ProgramsAdmin/ProgramEdit";

import EventList from "./Admin/AdminEvents/EventList";
import AddEvent from "./Admin/AdminEvents/AddEvent";
import EventEdit from "./Admin/AdminEvents/EventEdit";

import GalleryList from "./Admin/GalleryAdmin/GalleryList";
import AddGallery from "./Admin/GalleryAdmin/AddGallery";
import EditGallery from "./Admin/GalleryAdmin/EditGallery";

import DonationDetails from "./Admin/Donations/DonationDetails";
import DonationList from "./Admin/Donations/DonationList";

import ProgramDetail from "./Pages/ProgramDetails";
import EventDetail from "./Pages/EventDetail";

import ScrollToTop from "./ScrollToTop";

import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsConditions from "./Pages/TermsConditions";

import BlogList from "./Admin/Blogs/BlogList";
import AddBlog from "./Admin/Blogs/AddBlog";
import EditBlog from "./Admin/Blogs/EditBlog";

import ContactList from "./Admin/Contact/ContactList";
import ContactDetails from "./Admin/Contact/ContactDetails";

import Settings from "./Admin/Settings/Settings";
import { Toaster } from "react-hot-toast";
import Login from "./Admin/Login/Login";
import ProtectedRoute from "./Admin/Login/ProtectedRoute";

function App() {
  return (
    <>
     <Toaster position="top-right" />
      <ScrollToTop />

      <Routes>
        {/* =========================
            ADMIN LOGIN
        ========================= */}

        <Route path="/admin/login" element={<Login />} />

        {/* =========================
            PROTECTED ADMIN ROUTES
        ========================= */}

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            {/* Dashboard */}

            <Route index element={<Dashboard />} />

            {/* Programs */}

            <Route path="programs" element={<ProgramList />} />

            <Route path="programs/add" element={<AddProgram />} />

            <Route path="programs/edit/:id" element={<ProgramEdit />} />

            {/* Events */}

            <Route path="events" element={<EventList />} />

            <Route path="events/add" element={<AddEvent />} />

            <Route path="events/edit/:id" element={<EventEdit />} />

            {/* Gallery */}

            <Route path="gallery" element={<GalleryList />} />

            <Route path="gallery/add" element={<AddGallery />} />

            <Route path="gallery/edit/:id" element={<EditGallery />} />

            {/* Donations */}

            <Route path="donations" element={<DonationList />} />

            <Route path="donations/:id" element={<DonationDetails />} />

            {/* Blogs */}

            <Route path="blogs" element={<BlogList />} />

            <Route path="blogs/add" element={<AddBlog />} />

            <Route path="blogs/edit/:id" element={<EditBlog />} />

            {/* Contact */}

            <Route path="contact" element={<ContactList />} />

            <Route path="contact/:id" element={<ContactDetails />} />

              <Route path="/admin/settings" element={<Settings />} />
          </Route>
        
        </Route>

        {/* =========================
            PUBLIC WEBSITE ROUTES
        ========================= */}

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/programs" element={<Programs />} />

          <Route path="/programs/:id" element={<ProgramDetail />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/events" element={<Events />} />

          <Route path="/events/:id" element={<EventDetail />} />

          <Route path="/blogs" element={<Blogs />} />

         <Route path="/blog/:slug" element={<BlogDetails />} />

          <Route path="/gallery" element={<Gallery />} />

          <Route path="/donate" element={<Donate />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

<Route path="/terms-conditions" element={<TermsConditions />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
