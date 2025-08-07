import { useNavigate } from "react-router";
import { assets, dummyCarData } from "../constants/assets";
import CarCard from "./CarCard";
import Title from "./Title";
import { useEffect, useRef, useState } from "react";
import { fetchFeaturedCars } from "~/api/carApi";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { motion, useAnimation, useInView } from "motion/react";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[] | null>(null)
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, {initial: true});
  const controls = useAnimation();

  useEffect(() => {
    const loadCars = async () => {
      try {
        
        setIsLoading(true);
        const cars = await fetchFeaturedCars();

        if (!cars) {
          setIsLoading(false);
        } else {
          setCars(cars);
        }
      } catch (error) {
        toast.error('error something went wrong');
      } finally {
        setIsLoading(false);
      }
    }

    loadCars();

  }, [])

    useEffect(() => {
    if (inView) {
      
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, delay: 0.3 }
      });
    } else {
      controls.start({ opacity: 0, x: 50 });
    }
  }, [inView, controls]);
  

  return (
    <motion.div
    ref={ref}
    initial={{x: 50, opacity: 0}}
    animate={controls}
    id="featured"
      className=" scroll-section flex flex-col items-center py-24 px-6 md:px-16
    lg:px-24 xl:px-32"
    >
      <div>
        <Title
          title="Featured Cars"
          subtitle="Check out our featured cars"
          align="center"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {isLoading && !cars ? (
        <>
          <Loader />
          <Loader />
          <Loader />
          <Loader />
        </>
        ) : (
        cars?.slice(0, 6).map((car) => (
          <div key={car._id}>
            <CarCard {...car} />
          </div>
        ))
        )}
      </div>
        {cars?.length === 0 && "No Featured Cars Found."}
      <button
        className="flex-center gap-2 px-6 py-2 border border-gray-700
      hover:bg-gray-700 transition duration-300 rounded-md mt-18 cursor-pointer"
        onClick={() => navigate("/cars")}
      >
        Explore All Cars
        <img src={assets.arrow_icon} alt="arrow" />
      </button>
    </motion.div>
  );
};

export default FeaturedSection;
