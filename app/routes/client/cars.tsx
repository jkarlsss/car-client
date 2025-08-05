import { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets, dummyCarData } from "../../constants/assets";
import CarCard from "../../components/CarCard";
import { fetchCars } from "~/api/carApi";
import toast from "react-hot-toast";
import Loader from "~/components/Loader";

const Cars = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState<Car[] | null>(null)

  useEffect(() => {
    const loadCars = async () => {
      try {
        setIsLoading(true);
        const cars = await fetchCars();

        setCars(cars);
      } catch (error) {
        console.log(error);
        toast.error('Server error code 500');
        setIsLoading(false);

      } finally {
        setIsLoading(false);
        console.log(cars);
        
      }
    };

    loadCars();
    
  }, [])
  
  return (
    <div>
      <div className="flex flex-col items-center py-20 max-md:px-4">
        <Title
          title="Available Cars"
          subtitle="Check out our available cars"
          align="center"
        />
        <div
          className="flex items-center px-4 mt-6 max-w-140
        w-full h-12 rounded-full border border-gray-400"
        >
          <img
            src={assets.search_icon}
            alt="search icon"
            className="w-4.5 h-4.5 mr-2"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search by maker, model, or category"
            className="w-full h-full outline-none"
          />
          <img
            src={assets.filter_icon}
            alt="filter icon"
            className="w-4.5 h-4.5 ml-2"
          />
        </div>
      </div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-300 xl:px-20 max-w-7xl mx-auto">Showing {dummyCarData.length || 0} Cars</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4
        xl:px-20 max-w-7xl mx-auto">
          {isLoading ? (
            <>
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
            </>
          ):(
            cars?.map((car) => (
              <div key={car._id}>
              <CarCard {...car} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Cars;
