import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        const userStorage = localStorage.getItem("users_db");

        if(userToken && userStorage) {
            const hasUser = JSON.parse(userStorage)?.filter(
                (user) => user.email === JSON.parse(userToken).email
            );

            if (hasUser) setUser(hasUser[0]);
        }

    }, [])

    const login = async (email, password) => {
        const hasUser = JSON.parse( await axios.post(process.env.BACKEND_URL, "/login", JSON.stringify(email, password)));

        if(hasUser?.error) {
            return hasUser.error;
        }

        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({token, email}));
        setUser({email, password});
        return;
    };

    const register = async (username, email, password, first_name, last_name) => {
        const hasUser = JSON.parse( await axios.post(process.env.BACKEND_URL, "/regsiter", JSON.stringify(username, email, password, first_name, last_name)));

        if(hasUser?.error) {
            return hasUser.error;
        }
        return;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    };


    return (
        <AuthContext.Provider
            value={{ user, logado: !!user, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}