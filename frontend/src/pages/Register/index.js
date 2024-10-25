import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const[error, setError] = useState("");

    const handleRegister = () => {
        if(!email | !password | confirmPassword){
            setError("Preencha todos os campos");
            return;
        } else if (password !== confirmPassword){
            setError("Uma das senha esta incorreta");
            return;
        }

        const res = register(email, password);

        if(res){
            setError(res);
            return;
        }

        alert("Usuário cadastrado com sucesso!")
        navigate("/")
    }

    return(
        <div>
            <h1>Registro</h1>
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
            <div>
                <Input
                    type="confirmPassword"
                    placeholder="Digite novamente sua Senha"
                    value={confirmPassword}
                    onChange={(e) => [setConfirmPassword(e.target.value), setError("")]}
            />
            </div>
            <p>{error}</p>
            <Button
                text="Registrar"
                onClick={handleRegister}
            />
            <div>
                Ja tem uma conta?
                <Link to="/">&nbsp;Login</Link>
            </div>
        </div>
    );
};

export default Register;