
interface TextAreaProps {
    placeholder: string,
    label: string,
    name: string,
    divClasses?: string,
    inputClasses?: string,
    required: boolean,

}

const TextArea = ({ placeholder, label, name, divClasses, inputClasses, required }: TextAreaProps) => {
    return (
        <div className={`flex flex-col space-y-1 font-geist${divClasses}`}>
            <label htmlFor={name} className="text-xs">{label} {required ? <span className="text-red-500">*</span> : ""}</label>
            <div className="flex items-center border-b-[0.5px] border-zinc-400 bg-zinc-800 justify-around space-x-2 text-white rounded-md p-2">

                <textarea placeholder={placeholder} name={name} className={`text-xs outline-none w-full bg-transparent ${inputClasses}`} />
            </div>
        </div>
    )
}

export default TextArea
