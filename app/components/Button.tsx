'use client'
import React, { MouseEvent } from 'react';

type ButtonType = "submit" | "button" | "reset" | undefined;

interface ButtonProps {
    value: string | JSX.Element;
    type: ButtonType;
    handleSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
}





const Button: React.FC<ButtonProps> = ({ value, type, handleSubmit }) => {
    return (
        <button
            type={type}
            onClick={(e) => handleSubmit(e)}
            className="w-full bg-purple-700 hover:bg-purple-900 text-white flex items-center justify-center font-bold py-2 px-4 sm:px-8 sm:py-3 rounded-lg"
        >
            {value}
        </button>
    );
};

export default Button;
