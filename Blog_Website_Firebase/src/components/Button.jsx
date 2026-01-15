import React from 'react'

const Button = ({ text, onClick, type = "primary", className = "" }) => {

    const baseStyles = "w-full px-4 py-3 rounded-md font-medium transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-sm";

    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200/50",
        secoundary: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200",
        danger: "bg-red-500 hover:bg-red-600 text-white",
        ghost: "text-slate-600 hover:bg-slate-100 bg-transparent shadow-none"
    }
    return (
        <button onClick={onClick} className={`${baseStyles} ${variants[type]}`}>{text}</button>
    )
}

export default Button