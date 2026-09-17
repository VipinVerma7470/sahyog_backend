// import Navbar from "../Components/Navbar/Navbar";;
import Hero from "../Components/Hero/Hero";
import Counter from "../components/Counter/Counter";
import AboutHome from "../components/About/AboutHome";
import Programs from "../components/Programs/Programs";
import Events from "../components/EventCard/EventCard";
import Testimonials from "../components/Testimonial/Testimonial";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";
import SEO from "../Components/SEO";

const Home = () => {
  return (
    <>
       <SEO
    title="Sahyog Welfare Foundation | NGO in India"
    description="Sahyog Welfare Foundation works for education, healthcare, women empowerment and environmental development."
    keywords="NGO, charity, donation, education, health, women empowerment"
    image="/logo.png"
    url="https://www.sahyogfoundation.org/"
  />
      <Hero />
      <Counter />
      <AboutHome />
      <Programs />
      <Events />
      <Testimonials />
      <CTA />
     
    </>
  );
};

export default Home;