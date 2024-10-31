import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if(!email | !password) {
            setError("Preencha todos os campos");
            return;
        }
        
        const res = await login(email, password);

        if(res){
            setError(res);
            return;
        }

        navigate("/home")
    };

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");

    return(
        <div>
            <h1>Login</h1>
            <div>
                <Input
                    type="email"
                    placeholder="Digite seu E-mail"
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError("")]}
                />
            </div>
            <div>
                <Input
                    type="password"
                    placeholder="Digite sua Senha"
                    value={password}
                    onChange={(e) => [setPassword(e.target.value), setError("")]}
            />
            </div>
            <p>{error}</p>
            <Button
                text="Entrar"
                onClick={handleLogin}
            />
            <div>
                Ainda não tem uma conta?
                <Link to="/register">&nbsp;Reegistre-se</Link>
            </div>
        </div>
    );
};

export default Login;