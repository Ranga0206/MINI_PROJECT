import React from 'react'

const TextArea = ({ id, placeholder, value, setValue, className = "" }) => {
    return (
        <textarea
            id={id}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className={`w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800
                placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all
                duration-200  resize-y ${className}`
            }
        ></textarea >
    )
}

export default TextArea