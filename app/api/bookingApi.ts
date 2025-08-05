import axios from "axios"
import toast from "react-hot-toast";

export const fetchUserBookings = async () => {
    try {
        
        const { data } = await axios.get('/api/book/user-bookings');

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

        if (!data.success) throw new Error('Unauthorized access');

        return data.bookings;

    } catch (error) {
        console.error(error);
        return null;
    }
}