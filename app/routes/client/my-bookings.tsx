import { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets, dummyMyBookingsData } from "../../constants/assets";

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[] | null>([]);
  const currency = import.meta.env.VITE_CURRENCY;

  const fetchMyBooking = async () => {
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchMyBooking();
  }, [setBookings]);

  return (
    <div
      className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm
    max-w-7xl"
    >
      <Title
        title="My Bookings"
        subtitle="Check out your bookings"
        align="left"
      />

      <div>
        {bookings?.map((booking, index) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-4
          gap-6 p-6 border border-gray-500 rounded-lg mt-5 first:mt-12"
          >
            {/* Car Image and Details */}
            <div className="md:col-span-1">
              <div className="rounded-md overflow-hidden mb-3">
                <img
                  src={booking.car.image}
                  alt="car image"
                  className="
                w-full h-auto aspect-video object-cover"
                />
              </div>
              <p className="text-lg font-medium mt-2">
                {booking.car.brand} {booking.car.model}
              </p>
              <p className="text-gray-400">
                {booking.car.year} - {booking.car.category} -{" "}
                {booking.car.location}
              </p>
            </div>

            {/* Booking Details */}
            <div className="md:col-span-2 text-gray-300">
              <div className="flex items-center gap-2">
                <p className="px-3 py-1.5">Booking #{index+1}</p>
                <p className={`px-3 py-1 text-xs rounded-full
                  ${booking.status === "confirmed" ? "bg-green-900" : "bg-gray-700"}`}>{booking.status}</p>
              </div>
              <div className="flex items-start gap-2 mt-3">
                <img src={assets.calendar_icon_colored} alt="calendar color" className="
                w-4 h-4 mt-1" />
                <div>
                  <p>Rental Period</p>
                  {booking.pickupDate.split("T")[0]} To {booking.returnDate.split("T")[0]}
                </div>
              </div>
              <div className="flex items-start gap-2 mt-3">
                <img src={assets.location_icon_colored} alt="calendar color" className="
                w-4 h-4 mt-1" />
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
                <h1 className="text-2xl font-semibold">{ currency }{booking.price}</h1>
                <p>Booked on {booking.createdAt.split("T")[0]}</p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
