import Banner from "../../components/Banner";
import FeaturedSection from "../../components/FeaturedSection";
import Hero from "../../components/Hero";
import Testimonial from "../../components/Testimonial";

export function meta() {
  return [
    { title: "Car Rental | Landing page" },
    {
      name: "description",
      content: "Landing page",
    },
  ];
}

const Home = () => {

  return (
    <>
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testimonial />
    </>
  )
}

export default Home