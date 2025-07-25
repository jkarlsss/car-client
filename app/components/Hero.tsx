import { useState } from "react";
import { assets, cityList } from "../constants/assets";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");

  return (
    <div className="h-screen flex-col-center gap-14 text-center">
      <h1 className="text-4xl md:text-5xl font-semibold">
        Luxury Cars at Your Fingertips
      </h1>
      <form
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
        <button
          className="flex-center gap-2 border py-3 px-3 rounded-full
          hover:bg-gray-700 transition text-sm max-sm:mt-2 duration-200 cursor-pointer"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="brightness-200"
          />
          Search
        </button>
      </form>
      <img src={assets.main_car} alt="car" className="max-h-74" />
    </div>
  );
};

export default Hero;
