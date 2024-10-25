import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Private = ({ Item }) => {
    const { logado } = useAuth();

    return logado > 0 ? <Item /> : <Login />;
}

const RoutesApp = () => {
    return(
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/home" element={<Private Item={Home} />} />
                    <Route path="/" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route path="*" element={<Login />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
};

export default RoutesApp;