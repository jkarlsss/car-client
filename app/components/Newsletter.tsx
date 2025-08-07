import { motion } from "motion/react";

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 mt-15">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Deal!</h1>
      <p className="md:text-lg text-gray-400 pb-8">
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts
      </p>
      <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
        <input
          className="border
          border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-400"
          type="text"
          placeholder="Enter your email here..."
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full border text-white borde bg-gray-900 hover:bg-gray-600 transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
