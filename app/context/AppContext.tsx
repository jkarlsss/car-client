import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AppContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    isOwner: boolean,
    setIsOwner: React.Dispatch<React.SetStateAction<boolean>>,
    isLoggedIn: boolean,
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>,
    fetchUser: () => void;
    logOut: () => void;
}

export const AppContext = createContext<AppContextProps>({
        user: null,
        setUser: () => {},
        token: '',
        setToken: () => {},
        isOwner: false,
        setIsOwner: ()=>{},
        isLoggedIn: false,
        setShowLogin: ()=>{},
        fetchUser: () => {},
        logOut: () => {},
    });

export const AppProvider = ({ children } : { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [cars, setCars] = useState<Car | null>(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isLoggedIn, setShowLogin] = useState(false);

    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

    const fetchUser = async () => {
        try {
            const {data} = await axios.get('/api/user/data');
            if (!data.success) return;
            setIsOwner(data.user.role === 'owner');
            setUser(data.user);
        } catch (error : any) {
            logOut();
        }
    }

    const fetchCars = async () => {
        const { data } = await axios.get('/api/user/cars');
        setCars({...data.cars, model: '123'});
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
            axios.defaults.headers.common['Authorization'] = localToken;
            fetchUser();
        }
    }, []);
    

    const value = {
        user: user,
        setUser: setUser,
        token: token,
        setToken: setToken,
        isOwner: isOwner,
        setIsOwner: setIsOwner,
        isLoggedIn: isLoggedIn,
        setShowLogin: setShowLogin,
        logOut: logOut,
        fetchUser: fetchUser
    };

    return (
        <AppContext value={value}>
            { children }
        </AppContext>
    )
    
}

export const useAppProvider = () => {
    return useContext(AppContext);
}