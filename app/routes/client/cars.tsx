import { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets, dummyCarData } from "../../constants/assets";
import CarCard from "../../components/CarCard";
import { fetchCars, fetchSearchedCars } from "~/api/carApi";
import toast from "react-hot-toast";
import Loader from "~/components/Loader";
import { useAppProvider } from "~/context/AppContext";
import { motion } from "motion/react";
import { fetchAllAvailableCars } from "~/api/bookingApi";
import { useSearchParams } from "react-router";

const Cars = () => {
  const { isLoading } = useAppProvider();
  const [search, setSearch] = useState("");
  const [isLoadingCars, setIsLoadingCars] = useState(false);
  const [cars, setCars] = useState<Car[] | null>(null)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('q') || '';

  useEffect(() => {
    const loadCars = async () => {
      try {
        setIsLoadingCars(true);
        let cars;
        if (term) {
          cars = await fetchSearchedCars(term);
        } else {

          cars = await fetchAllAvailableCars();
        }
        console.log(term);
        
        setCars(cars);
      } catch (error) {
        console.log(error);
        toast.error('Server error code 500');
        setIsLoadingCars(false);

      } finally {
        setIsLoadingCars(false);
        console.log(cars);
        
      }
    };

    loadCars();
    
  }, [])

  const handleSearchCars = async (term: string) => {
    setSearch(term);
    setSearchParams({q: term})
    setIsLoadingCars(true);
    // Debounce the search
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        fetchResults(term);
      }, 400))
  }

  const fetchResults = async (query: string) => {
    setIsLoadingCars(true);

    if (!query) {
      const cars = await fetchAllAvailableCars();
      if (cars) {
        setCars(cars);
        setIsLoadingCars(false);
        return;
      }
    }

    try {
      const cars = await fetchSearchedCars(query);
      if (cars) {
        setCars(cars);
      }
    } catch (err) {
      console.error('Search error:', err);
        setIsLoadingCars(false);
    } finally {
        setIsLoadingCars(false);
    }
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
        initial={{y: 50, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.8, delay: 0.3}}
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
            onChange={(e) => handleSearchCars(e.target.value)}
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
        initial={{x: 50, opacity: 0}}
        animate={{x: 0, opacity: 1}}
        transition={{duration: 0.8, delay: 0.3}}
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-300 xl:px-20 max-w-7xl mx-auto">Showing {cars?.length || 0} Cars</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4
        xl:px-20 max-w-7xl mx-auto">
          {isLoading || isLoadingCars ? (
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
      </motion.div>
    </div>
  );
};

export default Cars;
