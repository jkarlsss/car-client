import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchUser } from "~/api/userApi";

interface AppContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    isOwner: boolean,
    setIsOwner: React.Dispatch<React.SetStateAction<boolean>>,
    isLoggedIn: boolean,
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>,
    logOut: () => void;
    isLoading: boolean
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
        logOut: () => {},
        isLoading: false
    });

export const AppProvider = ({ children } : { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [cars, setCars] = useState<Car | null>(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setShowLogin] = useState(false);

    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

    const logOut = () => {
        setToken(null);
        setUser(null);
        setIsOwner(false);
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = '';
        toast.success('You have logged out');
    }

    useEffect(() => {
        
        const loadAuth = async () => {

            try {
                setIsLoading(true);
                const user = await fetchUser();

                if (!user) {
                    setIsLoading(false);
                    return null;
                };

                setUser(user);
                setIsOwner(user.role === 'owner');
    
            } catch (error) {
                toast.error('Something went wrong');
                setIsLoading(false);
                logOut();
            } finally {
                setIsLoading(false);
            }
        }
        
        loadAuth();
            
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
        isLoading
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