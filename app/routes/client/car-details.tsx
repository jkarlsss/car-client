import { useFetcher, useNavigate, useParams } from "react-router";
import Loader from "../../components/owner/Loader";
import { assets } from "../../constants/assets";
import { useEffect, useState } from "react";
import { fetchCarDetails } from "~/api/carApi";
import toast from "react-hot-toast";
import { createCarBooking } from "~/api/bookingApi";
import { useAppProvider } from "~/context/AppContext";

// export const loader = async ({ params }: LoaderFunctionArgs) => {
//   const id = params.id as string;

//   if (!id) {
//     throw new Error("No id provided");
//   }

//   const car = await fetchCarDetails(id);


//   return car;
// };

const CarDetails = () => {
// const CarDetails = ({ loaderData }: Route.ComponentProps) => {
  // const {
  //   _id,
  //   owner,
  //   brand,
  //   model,
  //   image,
  //   year,
  //   category,
  //   seating_capacity,
  //   fuel_type,
  //   transmission,
  //   pricePerDay,
  //   location,
  //   description,
  //   isAvailable,
  //   createdAt,
  // } = loaderData as Car;

  const {id} = useParams<string>();
  const [carDetails, setCarDetails] = useState<Car | null>(null)
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [isBookLoading, setIsBookLoading] = useState(false);
  const [isCarDetailLoading, setIsCarDetailLoading] = useState(true);
  const { user } = useAppProvider();
  
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const currency = import.meta.env.VITE_CURRENCY;

  useEffect(() => {

    if(!id) return;

    const loadCarDetails = async () => {
      try {
        setIsCarDetailLoading(true);
        const carInfo = await fetchCarDetails(id);

        if (!carInfo) {
          toast.error('No car info found');
          setIsCarDetailLoading(false);
          return;
        }

        setCarDetails(carInfo);
      } catch (error) {
        console.error(error);
        setIsCarDetailLoading(false);
        toast.error('Server error '+ error);
      } finally {
        setIsCarDetailLoading(false);
      }
    }

    loadCarDetails();

  }, [id])
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!carDetails || !user) return;
      setIsBookLoading(true);

      const isBookingCreated = await createCarBooking({
        car: carDetails._id,
        owner: carDetails?.owner,
        pickUpDate: pickupDate,
        returnDate: returnDate,
        user: user?._id
      });

      if (!isBookingCreated) {
        toast.error('Not available');
        setIsBookLoading(false);
        return;
      }
      toast.success('Successfuly created booking');

    } catch (error) {
        toast.error('error server '+ error);
        console.error(error);
        setIsBookLoading(false);
    } finally {
      setIsBookLoading(false);
    }
  };

  
  if (isCarDetailLoading) return (<div className="flex-center flex-1 h-[80vh]"><Loader /></div>)
  
    if (!carDetails) return (<div className="flex-center flex-1">No Car Found with that id</div>)

  return (
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
            src={carDetails?.image}
            alt="car image"
            className="w-full h-auto object-cover rounded-xl md:max-h-100 mb-6"
          />
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">
                {carDetails?.brand} {carDetails?.model}
              </h1>
              <p className="text-gray-400 text-lg">
                {carDetails?.category} - {carDetails?.year}
              </p>
            </div>
            <hr className="border-gray-500 my-6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: assets.users_icon, text: `${carDetails?.seating_capacity} seats` },
                { icon: assets.fuel_icon, text: carDetails?.fuel_type },
                { icon: assets.car_icon, text: carDetails?.transmission },
                { icon: assets.location_icon, text: carDetails?.location },
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
              <p className="text-gray-400">{carDetails?.description}</p>
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
            {carDetails?.pricePerDay} <span className="text-base font-normal">per day</span>{" "}
          </p>
          <hr className="my-6" />
          <div className="flex flex-col gap-2 text-gray-400">
            <label htmlFor="pickup-date">Pickup date</label>
            <input
              type="date"
              className="border border-gray-700 px-3 py-2 rounded-lg"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="flex flex-col gap-2 text-gray-400">
            <label htmlFor="return-date">Return date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
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
    </div> );
}
export default CarDetails;
