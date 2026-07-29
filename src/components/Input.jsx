import React, { useId } from "react";

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return(
        <div className="w-full">
            {label && (
                <label
                    className="block mb-1.5 pl-0.5 text-sm font-medium text-slate-700"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-4 py-2.5 rounded-xl bg-white text-slate-900
                    border border-slate-200 w-full
                    placeholder:text-slate-400
                    outline-none
                    transition-all duration-150
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                    hover:border-slate-300
                    ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input