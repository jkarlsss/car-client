import { useState } from "react";
import Title from "../../components/owner/Title";
import { assets, cityList } from "../../constants/assets";

const AddCar = () => {
  const [image, setImage] = useState<File | null>(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    category: "",
    year: "",
    pricePerDay: "",
    location: "",
    description: "",
    seating_capacity: "",
    fuel_type: "",
    transmission: "",
  });
  const currency = import.meta.env.VITE_CURRENCY;

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title title="Add Car" subtitle="Add a new car to your fleet" />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm
      mt-6 max-w-xl"
      >
        {/* Car Image */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="upload icon"
              className="h-14 rounded cursor-pointer"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files![0])}
            />
          </label>
          <p className="text-sm text-gray-400">Upload a picture of your car</p>
        </div>

        {/* Car Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              placeholder="e.g. Toyota"
              required
              className="px-3 py-2 text-gray-300 mt-1 border border-gray-400 rounded-md
            outline-none"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="brand">Model</label>
            <input
              type="text"
              placeholder="e.g. X5, E-Class"
              required
              className="px-3 py-2 mt-1 border text-gray-300 border-gray-400 rounded-md
            outline-none"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        {/* Car Category, Year, Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label htmlFor="brand">Year</label>
            <input
              type="number"
              placeholder="2025"
              required
              className="px-3 py-2 mt-1 border text-gray-300 border-gray-400 rounded-md
              outline-none"
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="brand">Daily Price ({currency})</label>
            <input
              type="number"
              placeholder="100"
              required
              className="px-3 py-2 mt-1 border text-gray-300 border-gray-400 rounded-md
              outline-none"
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="brand">Category</label>
            <select
              className="px-3 py-2 mt-1 border text-gray-400 border-gray-400 rounded-md"
              value={car.category}
              onChange={(e) => setCar({ ...car, category: e.target.value })}
            >
              <option value="">Select a category</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Convertible">Convertible</option>
              <option value="Coupe">Coupe</option>
            </select>
          </div>
        </div>

        {/* Fuel Type, Transmission */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label htmlFor="brand">Transmission</label>
            <select
              className="px-3 py-2 mt-1 border text-gray-400 border-gray-400 rounded-md"
              value={car.transmission}
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
            >
              <option value="">Select a Transmission</option>
              <option value="Authomatic">Authomatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="brand">Fuel type</label>
            <select
              className="px-3 py-2 mt-1 border text-gray-400 border-gray-400 rounded-md"
              value={car.fuel_type}
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
            >
              <option value="">Select a Fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="brand">Seating Capacity</label>
            <input
              type="number"
              placeholder="4"
              required
              className="px-3 py-2 mt-1 border text-gray-300 border-gray-400 rounded-md
              outline-none"
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>
        {/* Location */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full">
            <label htmlFor="brand">Location</label>
            <select
              className="px-3 py-2 mt-1 border text-gray-400 border-gray-400 rounded-md"
              value={car.location}
              onChange={(e) => setCar({ ...car, location: e.target.value })}
            >
              <option className="bg-gray-800 text-white" value="">
                Select a Location
              </option>
              {cityList.map((city) => (
                <option className="bg-gray-800 text-white" key={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Description */}
        <div className="flex flex-col w-full">
          <label htmlFor="brand">Description</label>
          <textarea
            placeholder="e.g. This car is perfect for business trips and family outings."
            required
            rows={4}
            className="px-3 py-2 mt-1 border text-gray-300 border-gray-400 rounded-md
              outline-none"
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>
        <button className="border text-gray-300 border-gray-500 p-2 rounded-md mt-4
        cursor-pointer hover:bg-gray-700 transition duration-200">List Your Car</button>
      </form>
    </div>
  );
};

export default AddCar;
