import { Input, Button } from "@/components"
import { IoSend } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { PiPhoneCallFill } from "react-icons/pi";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import webServices from "@/services/Web/WebService";
import { toastDarkStyle } from "@/components/GlobalStyle";

const Contactus = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleContact = async (data: FieldValues) => {
        await toast.promise(
            webServices.Contact(data),
            {
                loading: "Sending Query",
                success: (response) => {
                    return `${response.data.message}`
                },
                error: (error) => {
                    return `${error.response.data.message}`
                }
            },
            toastDarkStyle()
        )
    }


    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-black">
            <div className="relative top-32 sm:top-20 lg:top-32 px-4 sm:px-0">
                <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-white text-center">
                    Contact <span className="bg-gradient-to-r from-green-800 to-green-950 bg-clip-text text-transparent">Us</span>
                </h1>
            </div>

            <div className="relative w-full text-white flex flex-col items-center " id="ContactSection">
                <div className="px-8">
                    <div className="flex flex-col lg:flex-row relative top-36 sm:top-28 lg:top-40 z-10 rounded-3xl py-6 sm:py-8 lg:py-10 px-4 sm:px-8 lg:px-16 bg-black/20 shadow-xl border border-zinc-700 backdrop-blur-2xl w-full max-w-5xl">
                        {/* Contact Information */}
                        <div className="w-full lg:w-auto lg:flex-shrink-0 mb-8 lg:mb-0">
                            <h1 className="text-lg sm:text-xl font-bold text-center mb-6 sm:mb-8 lg:mb-10">Contact Information</h1>
                            <div className="space-y-3 sm:space-y-4">
                                <p className="flex font-dm_sans font-light text-sm sm:text-base items-center gap-x-2 text-zinc-300 justify-center lg:justify-start">
                                    <PiPhoneCallFill size={20} className="flex-shrink-0" />
                                    <span>Phone : +91 1234567891</span>
                                </p>
                                <p className="flex font-dm_sans font-light text-sm sm:text-base items-center gap-x-2 text-zinc-300 justify-center lg:justify-start">
                                    <MdOutlineMail size={20} className="flex-shrink-0" />
                                    <span>Email : support@yayinstocks.in</span>
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden lg:block lg:h-96 border border-zinc-600 mx-6 xl:mx-10"></div>
                        <div className="lg:hidden w-full border-t border-zinc-600 my-6 sm:my-8"></div>

                        {/* Contact Form */}
                        <div className="w-full lg:flex-1">
                            <h1 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4">Contact Our Team</h1>
                            <p className="text-center text-sm sm:text-base text-zinc-400 font-light mb-6 sm:mb-8 font-dm_sans px-2">
                                Questions, Bug Report, Feedback --- We're here for all!
                            </p>

                            <form onSubmit={handleSubmit((data) => handleContact(data))} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div className="relative">
                                    <Input
                                        placeholder="Enter your name"
                                        type="text"
                                        required={true}
                                        label="Name"
                                        {...register("name", { required: true })}
                                    />
                                    {errors.name && <p className="text-xs text-red-500 absolute -bottom-5">Please enter your name!</p>}
                                </div>
                                <div className="relative">
                                    <Input
                                        placeholder="Enter your email"
                                        type="email"
                                        required={true}
                                        label="Email"
                                        {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
                                    />
                                    {errors.email && <p className="text-xs text-red-500 absolute -bottom-5">Please enter your email!</p>}
                                </div>
                                <div className="relative">
                                    <Input
                                        placeholder="Enter your Phone number"
                                        type="number"
                                        required={true}
                                        label="Phone Number"
                                        {...register("contact", { required: true, validate: (value) => value.length == 10 })}
                                    />
                                    {errors.contact && <p className="text-xs text-red-500 absolute -bottom-5">Please enter your phone number!</p>}
                                </div>
                                <div className="relative">
                                    <Input
                                        placeholder="Enter your Subject"
                                        type="text"
                                        required={true}
                                        label="Subject"
                                        {...register("subject", { required: true })}
                                    />
                                    {errors.subject && <p className="text-xs text-red-500 absolute -bottom-5">Please enter your subject!</p>}
                                </div>
                                <div className="col-span-1 sm:col-span-2 relative">
                                    <Input
                                        placeholder="Enter your message"
                                        type="text"
                                        required={true}
                                        label="Message"
                                        {...register("message", { required: true })}
                                    />
                                    {errors.message && <p className="text-xs text-red-500 absolute -bottom-5">Please enter your message!</p>}
                                </div>
                                <div className="col-span-1 sm:col-span-2 flex justify-center sm:justify-end">
                                    <Button
                                        name="Submit"
                                        btnClass="rounded-md px-4 sm:px-6 py-2 bg-green-950 border-b-[0.5px] border-r-[0.5px] border-zinc-600 gap-x-2 text-sm sm:text-sm w-64 md:w-full"
                                        type="submit"
                                        posticon={<IoSend />}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Green Section */}
                <div className="w-full h-52 sm:h-40 lg:h-52 bg-green-950 mt-8 sm:mt-12 lg:mt-0" />
            </div>
        </div>
    );
};

export default Contactus;