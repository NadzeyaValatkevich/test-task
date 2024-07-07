import { FC, useState } from "react";

interface IButton {
    title: string,
    className: string,
    onClick?: () => void,
    type?: "button" | "reset" | "submit"
}

export const Button: FC<IButton> = ({ title, className, onClick, type = "button" }: IButton) => {

    return (
        <button
            onClick={onClick}
            className={`rounded-md py-2.5 px-6 font-medium leading-5 ${className}`}
            type={type}
        >
            {title}
        </button>
    );

};