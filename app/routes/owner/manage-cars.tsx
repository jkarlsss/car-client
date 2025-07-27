import { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { assets, dummyCarData } from "../../constants/assets";

const ManageCars = () => {
  const [cars, setCars] = useState<Car[] | []>([]);
  const currency = import.meta.env.VITE_CURRENCY;

  const fetchOwnerCars = async () => {
    setCars(dummyCarData);
  };

  useEffect(() => {
    fetchOwnerCars();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title title="Manage Cars" subtitle="Manage your cars" />
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
                Category
              </th>
              <th className="border-b border-gray-500 px-4 py-2">Price</th>
              <th className="border-b border-gray-500 px-4 py-2 max-md:hidden">
                Status
              </th>
              <th className="border-b border-gray-500 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={car.image}
                    alt="car"
                    className="h-12 w-12 aspect-square
                object-cover rounded-md"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-xs text-gray-300">
                      {car.seating_capacity} - {car.transmission}
                    </p>
                  </div>
                </td>
                <td className="text-gray-300 px-4 py-2 max-md:hidden">
                  {car.category}
                </td>
                <td className="text-gray-300 px-4 py-2">
                  {currency}
                  {car.pricePerDay}/day
                </td>
                <td className="text-gray-300 px-4 py-2 max-md:hidden">
                  <span
                    className={
                      car.isAvaliable ? "text-green-500" : "text-red-500"
                    }
                  >
                    {car.isAvaliable ? "Avaliable" : "Not Avaliable"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center text-gray-300 gap-3">
                    <img
                      src={
                        car.isAvaliable
                          ? assets.eye_close_icon
                          : assets.eye_icon
                      }
                      alt="eye icon"
                      className="cursor-pointer h-6"
                    />
                    <img
                      src={assets.delete_icon}
                      alt="delete icon"
                      className="h-6"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;
