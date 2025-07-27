import { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { dummyMyBookingsData } from "../../constants/assets";

const ManageBookings = () => {
  const [bookings, setBookings] = useState<Booking[] | []>([]);
  const currency = import.meta.env.VITE_CURRENCY;

  const fetchOwnerBookings = async () => {
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title title="Manage Bookings" subtitle="Manage your bookings" />
      <div
        className="max-w-3xl w-full rounded-md overflow-hidden border
      border-gray-500 mt-6"
      >
        <table
          className="w-full border-collapse text-left text-sm
              text-gray-500"
        >
          <thead className="text-gray-300">
            <tr>
              <th className="border-b border-gray-500 px-4 py-2">Car</th>
              <th className="border-b border-gray-500 px-4 py-2 max-md:hidden">
                Date Range
              </th>
              <th className="border-b border-gray-500 px-4 py-2">Total</th>
              <th className="border-b border-gray-500 px-4 py-2 max-md:hidden">
                Payment
              </th>

              <th className="border-b border-gray-500 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={booking.car.image}
                    alt="booking"
                    className="h-12 w-12 aspect-square
                      object-cover rounded-md"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {booking.car.brand} {booking.car.model}
                    </p>
                    <p className="text-xs text-gray-300">
                      {booking.car.seating_capacity} -{" "}
                      {booking.car.transmission}
                    </p>
                  </div>
                </td>
                <td className="text-gray-300 px-4 py-2">
                  {booking.pickupDate.split("T")[0]} -{" "}
                  {booking.returnDate.split("T")[0]}
                </td>
                <td className="text-gray-300 px-4 py-2">
                  {currency}
                  {booking.price}
                </td>
                <td className="text-gray-300 px-4 py-2 max-md:hidden">
                  <span className="text-gray-300 px-4 py-2 rounded-full bg-gray-800">
                    Offline
                  </span>
                </td>
                <td className="text-gray-300 px-4 py-2 max-md:hidden">
                  {booking.status === "pending" ? (
                    <select
                      value={booking.status}
                      className="px-2 py-1.5 mt-1 text-gray-300 border
                  border-gray-500 rounded-lg"
                    >
                      <option className="bg-gray-800" value="pending">
                        Pending
                      </option>
                      <option className="bg-gray-800" value="cancelled">
                        Cancelled
                      </option>
                      <option className="bg-gray-800" value="confirmed">
                        Confirmed
                      </option>
                    </select>
                  ) : (
                    <span
                      className={`text-gray-300 bg-green-800 px-4 py-2 rounded-full
                  ${
                    booking.status === "confirmed"
                      ? "bg-green-800"
                      : "bg-red-800"
                  }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
