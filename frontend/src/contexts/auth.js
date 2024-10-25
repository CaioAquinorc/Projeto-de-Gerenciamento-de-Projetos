import { Children, createContext, useEffect, useState } from "react";
import { json } from "react-router-dom";

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

    const login = (email, password) => {
        const userStorage = JSON.parse(localStorage.getItem("users_db"))

        const hasUser = userStorage?.filter((user) => user.email === email);

        if(hasUser?.length) {
            if(hasUser[0].email === email && hasUser[0].password === password){
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem("user_token", JSON.stringify({token}));
                setUser({email, password});
                return;
            } else {
                return "E-mail ou senha incorretos";
            }
        } else {
            return "Usuário não cadastrado";
        }
    };

    const register = (email, password) => {
        const userStorage = JSON.parse(localStorage.getItem("users_bd"));

        const hasUser = userStorage?.filter((user) => user.email === email);

        if(hasUser?.length){
            return "Já tem uma conta com esse E-mail";
        }

        let newUser;

        if(userStorage) {
            newUser = [...userStorage, {email, password}];
        } else {
            newUser = [{email, password}]
        }

        localStorage.setItem("users_db", JSON.stringify(newUser));

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