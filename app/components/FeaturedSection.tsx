import { useNavigate } from "react-router";
import { assets, dummyCarData } from "../constants/assets";
import CarCard from "./CarCard";
import Title from "./Title";

const FeaturedSection = () => {
  const navigate = useNavigate();

  return (
    <div
      id="featured"
      className="flex flex-col items-center py-24 px-6 md:px-16
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
        {dummyCarData.slice(0, 6).map((car) => (
          <div key={car._id}>
            <CarCard {...car} />
          </div>
        ))}
      </div>
      <button
        className="flex-center gap-2 px-6 py-2 border border-gray-700
      hover:bg-gray-700 transition duration-300 rounded-md mt-18 cursor-pointer"
        onClick={() => navigate("/cars")}
      >
        Explore All Cars
        <img src={assets.arrow_icon} alt="arrow" />
      </button>
    </div>
  );
};

export default FeaturedSection;
