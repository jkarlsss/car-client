import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AppContextProps {
    user: User | null;
    setUser: (name: User) => void;
    token: string | null;
    setToken: (token: string) => void;
    fetchUser: () => void;
    logOut: () => void;
}

export const AppContext = createContext<AppContextProps>({
        user: null,
        setUser: () => {},
        token: '',
        setToken: () => {},
        fetchUser: () => {},
        logOut: () => {},
    });

export const AppProvider = ({ children } : { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [cars, setCars] = useState<Car | null>(null)

    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

    const fetchUser = async () => {
        try {
            const {data} = await axios.get('/api/user/data');
            if (!data.success) return;
            setUser(data.user);
            console.log(data.user);
        } catch (error : any) {
            logOut();
        }
    }

    const fetchCars = async () => {
        const { data } = await axios.get('/api/user/cars');
        console.log(data.cars);
        
        setCars(data.cars);
        console.log(cars);
    }

    const logOut = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = '';
        toast.error('Session expired user not found.');
    }

    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (localToken) {
            setToken(localToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = token;
            fetchUser();
        }
    }, [token]);

    

    const value = {
        user: user,
        setUser: setUser,
        token: token,
        setToken: setToken,
        logOut: logOut,
        fetchUser: fetchUser
    };

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
    
}

export const useAppProvider = () => {
    return useContext(AppContext);
}