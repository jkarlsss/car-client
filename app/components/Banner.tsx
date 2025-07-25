import { assets } from "../constants/assets";

const Banner = () => {
  return (
    <div
      className="flex flex-col md:flex-row md:items-start items-center
    justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-l from-gray-600 to-gray-950
    max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden"
    >
      <div>
        <h2 className="text-3xl">Do You Have a Luxury Car?</h2>
        <p className="mt-2">We have a wide range of luxury cars for rent</p>
        <p>Monetize your car and make money from it</p>
        <p className="max-w-130">
          We take of insurance, secure payments, and driver verification.
        </p>
        <button
          className="border border-gray-500 p-2 rounded-md mt-4
        cursor-pointer hover:bg-gray-700 transition duration-200"
        >
          List Your Car
        </button>
      </div>
      <img src={assets.banner_car_image} alt="car" className="max-h-45 mt-10" />
    </div>
  );
};

export default Banner;
