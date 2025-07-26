import { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { assets, dummyDashboardData } from "../../constants/assets";

const Dashboard = () => {
  const [data, setData] = useState<DashboardData>({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const currency = import.meta.env.VITE_CURRENCY;

  const dashBoardCard = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: assets.carIconColored,
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.location_icon_colored,
    },
    {
      title: "Pending Bookings",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Completed Bookings",
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ];

  useEffect(() => {
    setData(dummyDashboardData);
  }, [setData]);

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title title="Dashboard" subtitle="Check out your dashboard" />
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8
        max-w-3xl"
      >
        {dashBoardCard.map((card, index) => (
          <div
            key={index}
            className="flex gap-2 items-center
            justify-between p-4 rounded-md border border-gray-500"
          >
            <div>
              <h1 className="text-xs text-gray-300">{card.title}</h1>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>
            <div className="flex-center w-10 h-10 rounded-full bg-gray-800">
              <img src={card.icon} alt="icon" className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
        {/* <RecentBookings /> */}
        <div
          className="p-4 md:p-6 border border-gray-500 rounded-md
          max-w-lg w-full"
        >
          <h1 className="text-lg font-medium">Recent Bookings</h1>
          <p className="text-gray-400">Latest Customer Bookings</p>
          {data.recentBookings.map((booking, index) => (
            <div key={index} className="mt-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div
                  className="hidden md:flex items-center justify-center w-12
                h-12 rounded-full bg-gray-800"
                >
                  <img
                    src={assets.listIconColored}
                    alt="icon"
                    className="w-5 h-5"
                  />
                </div>
                <div className="text-gray-300">
                  <p>
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p className="text-sm">{booking.createdAt.split("T")[0]}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <p
                  className="px-3 py-0.5 border border-gray-500 rounded-full
                text-sm"
                >
                  {booking.status}
                </p>
                <p className="text-sm text-gray-300">
                  {currency}
                  {booking.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* <MonthlyRevenue /> */}
        <div className="p-4 md:p-6 border border-gray-500 rounded-md w-full
        md:max-w-xs">
          <h1 className="text-lg font-medium">Month Revenue</h1>
          <p className="text-gray-400">Revenue for the current month</p>
          <p className="text-3xl font-semibold mt-4">{currency}{data.monthlyRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
