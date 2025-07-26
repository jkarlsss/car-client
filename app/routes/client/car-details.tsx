import { useFetcher, useNavigate, type LoaderFunctionArgs } from "react-router";
import Loader from "../../components/Loader";
import { assets, dummyCarData } from "../../constants/assets";
import type { Route } from "./+types/car-details";

export const loader = ({ params }: LoaderFunctionArgs) => {
  const id = params.id;

  if (!id) {
    throw new Error("No id provided");
  }

  const car = dummyCarData.find((car) => car._id === id);

  return car;
};

const CarDetails = ({ loaderData }: Route.ComponentProps) => {
  const {
    _id,
    owner,
    brand,
    model,
    image,
    year,
    category,
    seating_capacity,
    fuel_type,
    transmission,
    pricePerDay,
    location,
    description,
    isAvaliable,
    createdAt,
  } = loaderData as Car;

  const navigate = useNavigate();
  const fetcher = useFetcher();
  const currency = import.meta.env.VITE_CURRENCY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {}, 2000);
  };

  return loaderData ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-400 cursor-pointer"
      >
        <img src="/assets/arrow.png" alt="arrow icon" className="h-5" />
        Back
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left: Card Image & Details */}
        <div className="lg:col-span-2">
          <img
            src={image}
            alt="car image"
            className="w-full h-auto object-cover rounded-xl md:max-h-100 mb-6"
          />
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">
                {brand} {model}
              </h1>
              <p className="text-gray-400 text-lg">
                {category} - {year}
              </p>
            </div>
            <hr className="border-gray-500 my-6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: assets.users_icon, text: `${seating_capacity} seats` },
                { icon: assets.fuel_icon, text: fuel_type },
                { icon: assets.car_icon, text: transmission },
                { icon: assets.location_icon, text: location },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center p-4
                rounded-lg"
                >
                  <img src={icon} alt="icon" className="h-5 mb-2" />
                  {text}
                </div>
              ))}
            </div>
            {/* Description */}
            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-400">{description}</p>
            </div>
            {/* Features */}
            <div>
              <h1 className="text-xl font-medium mb-3">Features</h1>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {["360 Camera", "AC", "GPS", "Bluetooth", "USB", "Radio"].map(
                  (feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-gray-400"
                    >
                      <img
                        src={assets.check_icon}
                        alt="check icon"
                        className="
                      h-4 mr-2"
                      />
                      {feature}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
        {/* Right: Booking Form */}
        <fetcher.Form
          onSubmit={handleSubmit}
          method="post"
          className="h-max sticky top-18 rounded-xl p-6 space-y-6
          text-gray-500"
        >
          <p
            className="flex items-center justify-between text-2xl
          text-gray-300 font-semibold"
          >
            {currency}
            {pricePerDay} <span className="text-base font-normal">per day</span>{" "}
          </p>
          <hr className="my-6" />
          <div className="flex flex-col gap-2 text-gray-400">
            <label htmlFor="pickup-date">Pickup date</label>
            <input
              type="date"
              className="border border-gray-700 px-3 py-2 rounded-lg"
              required
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="flex flex-col gap-2 text-gray-400">
            <label htmlFor="return-date">Return date</label>
            <input
              type="date"
              className="border border-gray-700 px-3 py-2 rounded-lg"
              required
              id="return-date"
            />
          </div>
          <button
            className="w-full border border-gray-700 
          hover:bg-gray-800 text-white py-2 rounded-lg
          transition duration-200 cursor-pointer"
          >
            {fetcher.state !== "idle" ? <p>Submitting...</p> : <p>Book Now</p>}
          </button>

          <p className="text-center text-sm text-gray-400">
            No Credit Card Required
          </p>
        </fetcher.Form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
