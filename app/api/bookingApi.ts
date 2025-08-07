import axios from "axios"
import toast from "react-hot-toast";

export const fetchUserBookings = async () => {
    try {
        
        const token = localStorage.getItem('token');

        const { data } = await axios.get('/api/book/user-bookings', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!data.success) throw new Error('Unauthorized access');

        return data.bookings;

    } catch (error) {
        console.error(error);
        return null;
    }
}

export const fetchOwnerBooks = async () => {
    try {
        
        const { data } = await axios.get('/api/book/owner-bookings');

        if (!data.success) return false;

        return data.bookings;

    } catch (error) {
        console.error(error);
        return false;
    }
}

export const fetchAllAvailableCars = async () => {
    try {
        const { data } = await axios.get('/api/user/cars-available');

        if (!data.success) return false;

        return data.cars;

    } catch (error) {
        console.error(error);
        return false;
    }
}

export const createCarBooking = async (book: { 
  car: string;
  user: string;
  owner: string;
  pickUpDate: string;
  returnDate: string;
}) => {
    try {
        const { data } = await axios.post('/api/book/book-car', {carData:book});

        if (!data.success) {
            console.error('Error Request');
            return false;
        }

        return data.success;

    } catch (error) {
        console.error(error);
        return false;
    }
}

export const updateBookingStatus = async ({status, bookingId} : {status: string, bookingId: string}) => {
    try {
        const { data } = await axios.post('/api/book/change-status', {status, bookingId});
        
        if (!data.success) return false;

        return data.success;
 
    } catch (error) {
        console.error(error);
        return false;
    }
}