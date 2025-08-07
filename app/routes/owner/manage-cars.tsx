import { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { assets, dummyCarData } from "../../constants/assets";
import { deleteOwnerCar, fetchOwnerCars, updateAvailability, updateToFeaturedCar } from "~/api/carApi";
import toast from "react-hot-toast";
import Loader from "~/components/owner/Loader";

const ManageCars = () => {
  const [cars, setCars] = useState<Car[] | []>([]);
  const [isLoadingOwner, setIsLoading] = useState(true);
  const currency = import.meta.env.VITE_CURRENCY;

  useEffect(() => {
    
    const loadOwnerCars = async () => {
      try {
        setIsLoading(true);
        const ownerCars = await fetchOwnerCars();
        
        if (!ownerCars) {
          toast.error('Cannot process the request');
          setIsLoading(false);
        } 

        setCars(ownerCars);
        setIsLoading(false);
        
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
      
    }

    loadOwnerCars();

  }, []);

  const handleUpdateAvailability = async (carId: string) => {
    try {
      const isCarUpdated = await updateAvailability(carId);

      if(!isCarUpdated) {
        toast.error('something went wrong.');
      } else {
        setCars((prevCars) =>
        prevCars.map((car) =>
          car._id === carId ? { ...car, isAvailable: !car.isAvailable } : car
        )
        );
        toast.success('Updated successfuly');
      }
      
    } catch (error) {
      console.error(error);
      toast.error('server error status code 500');
    }
  }

  const handleDeleteOwnerCar = async (carId: string) => {
  try {
    // Optional: Ask for confirmation
    const confirmed = window.confirm("Are you sure you want to delete this car?");
    if (!confirmed) return;

    const isDeleted = await deleteOwnerCar(carId);

    if (!isDeleted) {
      toast.error("Failed to delete the car. Please try again.");
      return;
    }

    // ✅ Remove deleted car from local state
    setCars(prev => prev.filter(car => car._id !== carId));

    toast.success("Car deleted successfully");
  } catch (error) {
    console.error("Error deleting car:", error);
    toast.error("Something went wrong. Please try again.");
  }
  };

  const handleUpdateIsFeatured = async (carId: string) => {
    try {
      const isFeaturedUpdated = await updateToFeaturedCar(carId);

      if (!isFeaturedUpdated) {
        toast.error('error something went wrong');
        return;
      }

      toast.success('Car is updated successfuly');
      setCars((prevCar) => 
        prevCar.map((car) => car._id === carId ? 
      {...car, isFeatured: !car.isFeatured} : car))
    } catch (error) {
      console.error(error);
      toast.error('Car is updated successfuly'+ error);
    }
  }


  if (isLoadingOwner) return (<div className="flex-center flex-1"><Loader /></div>);

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
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
                      car.isAvailable ? "text-green-500" : "text-red-500"
                    }
                  >
                    {car.isAvailable ? "Avaliable" : "Not Avaliable"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center text-gray-300 gap-3">
                    <img
                      onClick={() => handleUpdateIsFeatured(car._id)}
                      src={
                        car.isFeatured
                          ? assets.up
                          : assets.down
                      }
                      alt="eye icon"
                      className="cursor-pointer h-6"
                    />
                    <img
                      onClick={() => handleUpdateAvailability(car._id)}
                      src={
                        car.isAvailable
                          ? assets.eye_close_icon
                          : assets.eye_icon
                      }
                      alt="eye icon"
                      className="cursor-pointer h-6"
                    />
                    <img
                      onClick={() => handleDeleteOwnerCar(car._id)}
                      src={assets.delete_icon}
                      alt="delete icon"
                      className="h-6 cursor-pointer"
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
