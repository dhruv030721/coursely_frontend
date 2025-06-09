import { ChangeEventHandler, ReactNode } from "react";


interface InputProps {
    type: string,
    placeholder: string,
    label?: string,
    name: string,
    divClasses?: string,
    inputClasses?: string,
    required?: boolean,
    icon?: ReactNode,
    postIcon?: ReactNode,
    value?: string,
    innerDivClasses?: string,
    handler?: ChangeEventHandler<HTMLInputElement>,
    isValid?: Boolean,
    error?: string
}

const Input = ({ type, placeholder, value, label, name, divClasses, inputClasses, required, icon, postIcon, handler, innerDivClasses, isValid, error }: InputProps) => {
    return (
        <div className={`flex relative flex-col font-geist ${divClasses}`}>
            <label htmlFor={name} className="text-xs ml-1 mb-1">{label} {required ? <span className="text-red-500">*</span> : ""}</label>
            <div className={`${innerDivClasses ? innerDivClasses : "bg-zinc-800"} flex items-center border-b-[0.5px] border-zinc-400  justify-around space-x-2 text-white rounded-md p-2`}>
                {icon}
                <input type={type} value={value} placeholder={placeholder} name={name} className={`text-xs outline-none w-full bg-transparent ${inputClasses}`} onChange={handler} />
                {postIcon}
            </div>
            {
                !isValid && <p className="text-xs text-red-500 absolute -bottom-5 animate-bounce">{error}</p>
            }
        </div>
    )
}

export default Input
