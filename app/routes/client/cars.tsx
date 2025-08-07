import { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../constants/assets";
import CarCard from "../../components/CarCard";
import { complexSearch, fetchSearchedCars } from "~/api/carApi";
import toast from "react-hot-toast";
import Loader from "~/components/Loader";
import { useAppProvider } from "~/context/AppContext";
import { motion } from "motion/react";
import { fetchAllAvailableCars } from "~/api/bookingApi";
import { useSearchParams } from "react-router";

const Cars = () => {
  const { isLoading } = useAppProvider();
  const [cars, setCars] = useState<Car[] | null>(null);
  const [isLoadingCars, setIsLoadingCars] = useState(true);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const term = searchParams.get("q") || "";
  const location = searchParams.get("location") || "";
  const pickUpDate = searchParams.get("pickUpDate") || "";
  const returnDate = searchParams.get("returnDate") || "";

  useEffect(() => {
    const fetchCarsData = async () => {
      try {
        setIsLoadingCars(true);
        let fetchedCars;

        if (location && pickUpDate && returnDate) {
          fetchedCars = await complexSearch({ location, pickUpDate, returnDate, term });
        } else if (term) {
          fetchedCars = await fetchSearchedCars(term);
        } else {
          fetchedCars = await fetchAllAvailableCars();
        }

        setCars(fetchedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
        toast.error("Server error code 500");
      } finally {
        setIsLoadingCars(false);
      }
    };

    fetchCarsData();
  }, [term, location, pickUpDate, returnDate]);

  const handleSearchInput = (value: string) => {
    setIsLoadingCars(true);
    if (typingTimeout) clearTimeout(typingTimeout);

    const newParams = new URLSearchParams(searchParams);
    if (value.trim()) {
      newParams.set("q", value);
    } else {
      newParams.delete("q");
    }

    // Debounce
    const timeout = setTimeout(() => {
      setSearchParams(newParams);
    }, 500);

    setTypingTimeout(timeout);
  };

  return (
    <div>
      <div className="flex flex-col items-center py-20 max-md:px-4">
        <Title
          title="Available Cars"
          subtitle="Check out our available cars"
          align="center"
        />
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center px-4 mt-6 max-w-140 w-full h-12 rounded-full border border-gray-400"
        >
          <img
            src={assets.search_icon}
            alt="search icon"
            className="w-4.5 h-4.5 mr-2"
          />
          <input
            defaultValue={term}
            onChange={(e) => handleSearchInput(e.target.value)}
            type="text"
            placeholder="Search by maker, model, or category"
            className="w-full h-full outline-none"
          />
          <img
            src={assets.filter_icon}
            alt="filter icon"
            className="w-4.5 h-4.5 ml-2"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10"
      >
        <p className="text-gray-300 xl:px-20 max-w-7xl mx-auto">
          Showing {cars?.length || 0} Cars
        </p>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4
        xl:px-20 max-w-7xl mx-auto"
        >

          {isLoading || isLoadingCars || !cars ? (
            <>
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
            </>
          ) : (
            cars.map((car) => (
              <div key={car._id}>
                <CarCard {...car} />
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Cars;