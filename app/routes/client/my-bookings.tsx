import { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../constants/assets";
import { fetchUserBookings } from "~/api/bookingApi";
import toast from "react-hot-toast";
import Loader from "~/components/owner/Loader";
import { useAppProvider } from "~/context/AppContext";
import { motion } from "motion/react";

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoadingBook, setIsLoadingBooks] = useState(false);
  const { user, isLoading } = useAppProvider();

  const currency = import.meta.env.VITE_CURRENCY;

  useEffect(() => {
    
    const fetchMyBooking = async () => {
      try {
        setIsLoadingBooks(true);
        const myBooks = await fetchUserBookings();
        
        if (myBooks) setBookings(myBooks);
      } catch (error) {
        toast.error("Something went wrong while fetching bookings");
      } finally {
        setIsLoadingBooks(false);
      }
    };

    if (!isLoading && user) {
      fetchMyBooking();
    }
  }, [isLoading, user]);

  // ✅ Loader for initial state
  if (isLoading || isLoadingBook) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader />
      </div>
    );
  }

  // ✅ If user is not logged in
  if (!user) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-white text-lg">
        You are not logged in.
      </div>
    );
  }

  return (
    <motion.div
    initial={{y:50, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{ duration: 0.8, delay: 0.3}}
    className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl">
      <Title title="My Bookings" subtitle="Check out your bookings" align="left" />

      {bookings.length === 0 ? (
        <div className="mt-12 text-white">No bookings found.</div>
      ) : (
        bookings.map((booking, index) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-gray-500 rounded-lg mt-5 first:mt-12"
          >
            {/* Car Image and Details */}
            <div className="md:col-span-1">
              <div className="rounded-md overflow-hidden mb-3">
                <img
                  src={booking.car.image}
                  alt="car image"
                  className="w-full h-auto aspect-video object-cover"
                />
              </div>
              <p className="text-lg font-medium mt-2">
                {booking.car.brand} {booking.car.model}
              </p>
              <p className="text-gray-400">
                {booking.car.year} - {booking.car.category} - {booking.car.location}
              </p>
            </div>

            {/* Booking Details */}
            <div className="md:col-span-2 text-gray-300">
              <div className="flex items-center gap-2">
                <p className="px-3 py-1.5">Booking #{index + 1}</p>
                <p
                  className={`px-3 py-1 text-xs rounded-full ${
                    booking.status === "confirmed" ? "bg-green-900" : "bg-gray-700"
                  }`}
                >
                  {booking.status}
                </p>
              </div>
              <div className="flex items-start gap-2 mt-3">
                <img
                  src={assets.calendar_icon_colored}
                  alt="calendar"
                  className="w-4 h-4 mt-1"
                />
                <div>
                  <p>Rental Period</p>
                  {booking.pickUpDate?.split("T")[0]} to {booking.returnDate?.split("T")[0]}
                </div>
              </div>
              <div className="flex items-start gap-2 mt-3">
                <img
                  src={assets.location_icon_colored}
                  alt="location"
                  className="w-4 h-4 mt-1"
                />
                <div>
                  <p>Pick-up Location</p>
                  {booking.car.location}
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="md:col-span-1 flex flex-col justify-between gap-6">
              <div className="text-sm text-gray-300 font-semibold text-right">
                <p>Total Price</p>
                <h1 className="text-2xl font-semibold">
                  {currency}
                  {booking.price}
                </h1>
                <p>Booked on {booking.createdAt?.split("T")[0]}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </motion.div>
  );
};

export default MyBookings;
