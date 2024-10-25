import React, { useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

 const Home = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [email] = useState("");

    return (
        <div>
            <h1>Bem Vindo Usuario</h1>
            <p>Do Email: {email}</p>
            <Button
                text="Sair"
                onClick={() => [logout(), navigate("/")]}
            />
        </div>
    );
 };

 export default Home;