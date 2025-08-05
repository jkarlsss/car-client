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

export const fetchCarDetails = async (id:string) => {
  
  try {
    const {data} = await axios.get(`/api/user/car/${id}`);
    
    console.log(data);
    

    if (!data.success) return null;

    return data.carDetails;
    
  } catch (error) {
    console.log(error);
    return null;
  }
}