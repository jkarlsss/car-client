import { Link } from "react-router";
import { assets } from "../constants/assets";

const CarCard = ({
  _id,
  brand,
  model,
  category,
  year,
  pricePerDay,
  image,
  isAvaliable,
  seating_capacity,
  fuel_type,
  transmission,
  location,
}: Car) => {
  const currency = import.meta.env.VITE_CURRENCY;

  return (
    <Link to={`/cars/${_id}`}
      className="group rounded-xl overflow-hidden hover:-translate-y-1
    transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt="car image"
          className="w-full h-full object-cover
        transition-transform duration-500 group-hover:scale-105 rounded-md"
        />
        {isAvaliable && (
          <p
            className="absolute top-4 left-4 bg-primary/90 text-white
        text-xs px-2.5 py-1 rounded-full"
          >
            Available Now
          </p>
        )}
        <div
          className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3
      py-2 rounded-lg"
        >
          <span className="font-semibold">
            {currency}
            {pricePerDay}
          </span>
          <span className="text-sm text-white/80"> / day</span>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-medium">{brand} {model}</h3>
            <p className="text-white/80 text-sm">{category} ({year})</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-400">
          <div className="flex items-center text-sm">
            <img src={assets.users_icon} alt="users icon" className="h-4 mr-2" />
            <span>{seating_capacity} Seats</span>
          </div>
          <div className="flex items-center text-sm">
            <img src={assets.fuel_icon} alt="users icon" className="h-4 mr-2" />
            <span>{fuel_type}</span>
          </div>
          <div className="flex items-center text-sm">
            <img src={assets.carIcon} alt="users icon" className="h-4 mr-2" />
            <span>{transmission}</span>
          </div>
          <div className="flex items-center text-sm">
            <img src={assets.location_icon} alt="users icon" className="h-4 mr-2" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
