import React from "react";

const Button = ({ text, onClick, type = "button" }) => {
    return(
        <button
            Type={type}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button;