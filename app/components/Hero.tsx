import { useState } from "react";
import { assets, cityList } from "../constants/assets";
import { motion } from "motion/react";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{ opacity: 1}}
    transition={{duration: 0.5}}
    id="home" className="h-screen flex-col-center gap-14 text-center">
      <motion.h1 initial={{x: 50, opacity: 0}}
      animate={{x: 0, opacity: 1}}
      transition={{duration: 1  }}
      className="text-4xl md:text-5xl font-semibold">
        Luxury Cars at Your Fingertips
      </motion.h1>
      <motion.form
      initial={{scale: 0.95, opacity: 0, y: 50}}
      animate={{scale: 1, opacity: 1, y: 0}}
      transition={{duration: 0.6, delay: 0.4}}
        className="flex flex-col md:flex-row items-start md:items-center
      justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200
      border border-gray-500"
      >
        <div
          className="flex flex-col md:flex-row items-start md:items-center
        gap-10 min-md:ml-8"
        >
          <div className="flex flex-col gap-2 items-start">
            <select
              className="outline-none"
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              <option value="" disabled hidden>
                Pickup Location
              </option>
              {cityList.map((city) => (
                <option className="bg-gray-800 text-white" key={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">
              {pickupLocation || "Please select your location"}
            </p>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <label htmlFor="pickup-date">Pick-up Date</label>
            <input
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500"
              required
            />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              id="return-date"
              className="text-sm text-gray-500"
              required
            />
          </div>
        </div>
        <motion.button
        whileHover={{scale: 1.05}}
        whileTap={{ scale:0.95 }}
          className="flex-center gap-2 border py-3 px-3 rounded-full
          hover:bg-gray-700 transition text-sm max-sm:mt-2 duration-200 cursor-pointer"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="brightness-200"
          />
          Search
        </motion.button>
      </motion.form>
      <motion.img
      initial={{y:100, opacity: 0}}
      animate={{ y:0, opacity: 1}}
      transition={{duration: 0.8, delay: 0.6}}
      src={assets.main_car} alt="car" className="max-h-74" />
    </motion.div>
  );
};

export default Hero;
