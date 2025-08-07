import axios from "axios"


export const fetchCars = async (): Promise<Car[] | any> => {
  try {
    
    const {data} = await axios.get('/api/user/cars');


    if (!data.success) return null;

    if (!data.cars) return null;

    return data.cars; 
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const fetchFeaturedCars = async () => {
  try {
    
    const {data} = await axios.get('/api/user/featured-cars');

    if (!data.success) throw new Error('failed to process request.');

    if (!data.cars) return null;

    return data.cars;

  } catch (error) {
    console.log(error);
    return null;
  }
}

export const fetchOwnerCars = async () => {
  try {
    
    const { data } = await axios.get('/api/owner/cars');

    if (!data.success) return false;

    return data.ownerCars;

  } catch (error) {
    console.error(error);
    return false;
  }
}

export const fetchCarDetails = async (id:string) => {
  
  try {
    const {data} = await axios.get(`/api/user/car/${id}`);
    

    if (!data.success) return false;

    return data.carDetails;
    
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const fetchSearchedCars = async (q: string) => {
  try {
    const { data } = await axios.get(`/api/user/search?q=${encodeURIComponent(q)}`);

    if (!data.success)
      return false;

    return data.cars;

  } catch (error) {
    console.error(error);
    return false;
  }
}

export const complexSearch = async ({location,pickUpDate,returnDate,term}: {term: string, location: string, pickUpDate: string, returnDate: string}) => {
  try {
    const { data } = await axios.post('/api/book/available-cars', {location,pickUpDate,returnDate,term});

    if (!data.success) return false;

    return data.cars;

  } catch (error) {
    console.error(error);
    return false;
  }
}

export const createCar = async (car: Car, image: File | null) => {
  try {

    const { data } = await axios.post('/api/owner/add-car', {car, image}, {
      headers: {
        "Content-Type": "'multipart/form-data'"
      }
    });

    if (!data.success) return false;

    return data.success;

  } catch (error) {
    console.error(error);
    return false;
  }
}

export const updateAvailability = async (carId: string) => {
  try {
    const { data } = await axios.post('/api/owner/toggle-car', { carId });

    if (!data.success) return false;

    return data.success;

  } catch (error) {
    console.error(error);
    return false;
  }
}

export const deleteOwnerCar = async (carId: string) => {
  try {
    const { data } = await axios.post('/api/owner/delete-car', {
      carId
    });

    if(!data.success) return false;

    return data.success;

  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Toggles the featured status of a car.
 * @param carId - The ID of the car to toggle.
 * @returns `true` if the operation succeeded, otherwise `false`.
 */
export const updateToFeaturedCar = async (carId: string): Promise<boolean> => {
  try {
    const response = await axios.post('/api/owner/toggle-featured', { carId });

    const { success } = response.data;

    if (!success) {
      console.warn(`Failed to toggle featured status for car: ${carId}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error toggling featured status for car ${carId}:`, error);
    return false;
  }
};