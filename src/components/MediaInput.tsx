import { IoIosCloudUpload } from "react-icons/io";
import { useRef, useState } from "react";

interface InputProps {
    label: string;
    name: string;
    divClasses?: string;
    inputClasses?: string;
    required: boolean;
    instruction: Array<string>;
}

const MediaInput = ({
    label,
    name,
    divClasses,
    inputClasses,
    required,
    instruction,
}: InputProps) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onload = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const triggerFileInput = () => {
        console.log(fileInputRef)
        fileInputRef.current?.click(); // Use the `ref` to programmatically trigger the file input
    };

    return (
        <div className={`flex flex-col space-y-1 font-geist ${divClasses}`}>
            <label htmlFor={name} className="text-xs">
                {label} {required ? <span className="text-red-500">*</span> : ""}
            </label>
            <div
                className="flex flex-col space-y-2 items-center border-b-[0.5px] border-zinc-400 bg-zinc-800 justify-around text-white rounded-md p-2"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input
                    type="file"
                    name={name}
                    ref={fileInputRef}
                    className={`text-xs outline-none w-full bg-transparent hidden ${inputClasses}`}
                    id={name}
                    onChange={handleFileChange}
                    accept="image/*"
                />
                {previewImage ? (
                    <div>
                        <div className="bg-black rounded-md">
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="w-full max-h-72 object-cover rounded-md"
                            />
                        </div>
                        <div className="text-xs flex mt-2 space-x-1">
                            <p>To change the photo, Click on </p>
                            <button
                                type="button"
                                onClick={triggerFileInput}
                                className="text-red-500 cursor-pointer underline text-xs"
                            >
                                Change
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <IoIosCloudUpload size={25} />
                        <h1 className="text-xs">
                            Drag and drop an image, or{" "}
                            <label
                                htmlFor={name}
                                className="text-red-500 cursor-pointer underline"
                            >
                                Browse
                            </label>
                        </h1>
                        <ul className="text-xs text-zinc-400 list-disc pl-5">
                            {instruction.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default MediaInput;
