interface Car {
  _id: string;
  owner: string;
  brand: string;
  model: string;
  image: string;
  year: number;
  category: string;
  seating_capacity: number;
  fuel_type: string;
  transmission: string;
  pricePerDay: number;
  location: string;
  description: string;
  isFeatured: boolean;
  isAvailable: boolean;
  createdAt: string;
}

interface CardData {
  image: string;
  name: string;
  handle: string;
  date: string;
}

interface Booking {
  _id: string;
  car: Car;
  user: string;
  owner: string;
  pickUpDate: string;
  returnDate: string;
  status: string;
  price: number;
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}

interface DashboardData {
  totalCars: number;
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  recentBookings: Booking[];
  monthlyRevenue: number;
}
