import { Input, Button } from "@/components";
import yayin_logo_bgremove from "@/assets/logo_icon.png";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { userServices } from "@/services";
import toast from "react-hot-toast"
import { toastDarkStyle } from "@/components/GlobalStyle";

const ForgotPassword = () => {

    const [steps, setSteps] = useState(1);
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();

    const handleSendOTP = async (data: FieldValues) => {
        await toast.promise(
            userServices.SendOTP(data), 
            {   
                loading: "Sending OTP",
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
        <>
            {/* Form Section */}
            <section className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-0 bg-zinc-950">
                {/* Heading Section */}
                <div className="flex flex-col items-start w-full max-w-96">
                    <img
                        src={yayin_logo_bgremove}
                        alt="Yayin Stock Logo"
                        className="w-20 md:w-14 mb-6"
                    />
                    <h1 className="font-dm_sans text-2xl md:text-5xl">Reset Password!</h1>
                    <p className="text-xs text-zinc-400 mt-2">
                        Verify your email to reset your password
                    </p>
                </div>
                {
                    steps === 1 && (
                        < form className="w-full max-w-96 flex flex-col space-y-5 mt-8 md:mt-10" onSubmit={handleSubmit((data) => handleSendOTP(data.email))}>
                            <div className="relative">
                                <Input
                                    type="email"
                                    label="Email"
                                    required={true}
                                    placeholder="Enter your email"
                                    {...register("email", {
                                        required: true,
                                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                                    })}
                                />
                                {
                                    errors.email && <p className="text-xs text-red-500 absolute -bottom-5 animate-bounce">Please enter valid email!</p>
                                }
                            </div>
                            <Button
                                name="Send OTP"
                                type="submit"
                                btnClass="bg-green-900 w-full rounded-md flex justify-center text-white border-r border-b hover:bg-green-800 transition-colors"
                            />
                        </form>
                    )
                }
                {
                    steps === 2 && (
                        < div className="w-full max-w-96 flex flex-col space-y-5 mt-8 md:mt-10">
                            <Input
                                type="text"
                                label="New Password"
                                required={true}
                                placeholder="Enter your new Password"
                                {...register("password", {
                                    required: true,
                                    validate: (value) => value.lenght > 8
                                })}
                            />
                            <Input
                                type="text"
                                label="Re-enter Password"
                                required={true}
                                placeholder="Re-enter your Password"
                                {...register("retypepassword", {
                                    required: true,
                                    validate: (value) =>
                                        value === getValues("password") || "Both password are not same!"
                                })}
                            />
                            <Button
                                name="Change Password"
                                type="submit"
                                btnClass="bg-green-900 w-full rounded-md flex justify-center text-white border-r border-b hover:bg-green-800 transition-colors"
                            />
                        </div>
                    )
                }

            </section ></>
    )
}

export default ForgotPassword