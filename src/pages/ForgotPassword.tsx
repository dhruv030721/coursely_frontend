import { Input, Button } from "@/components";
import yayin_logo_bgremove from "@/assets/logo_icon.png";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { userServices } from "@/services";
import toast from "react-hot-toast"
import { toastDarkStyle } from "@/components/GlobalStyle";
import { useNavigate } from "react-router-dom";
import { start } from "repl";

const ForgotPassword = () => {

    const [steps, setSteps] = useState(1);
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [timer, setTimer] = useState(0);
    const navigate = useNavigate();

    const handleSendOTP = async (email: FieldValues, isResend: boolean = false) => {
        await toast.promise(
            userServices.SendOTP(email),
            {
                loading: "Sending OTP",
                success: (response) => {
                    if (!isResend) {
                        setSteps(prev => prev > 2 ? 1 : prev + 1)
                        startTimer()
                    } else {
                        startTimer()
                    }
                    return `${response.data.message}`
                },
                error: (error) => {
                    return `${error.response.data.message}`
                }
            },
            toastDarkStyle()
        )
    }

    const handleChangePassword = async (data: FieldValues) => {
        await toast.promise(
            userServices.ChangePassword(data),
            {
                loading: "Changing Password",
                success: (response) => {
                    navigate("/login")
                    return `${response.data.message}`
                },
                error: (error) => {
                    return `${error.response.data.message}`
                }
            },
            toastDarkStyle()
        )
    }

    const startTimer = () => {
        setTimer(60)
        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
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
                                    errors.email && <p className="text-xs text-red-500 absolute -bottom-5 ">Please enter valid email!</p>
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
                        < form onSubmit={handleSubmit((data) => handleChangePassword(data))} className="w-full max-w-96 flex flex-col space-y-5 mt-8 md:mt-10">
                            <div className="relative">
                                <Input
                                    type="text"
                                    label="OTP"
                                    required={true}
                                    placeholder="Enter your OTP"
                                    {...register("otp", {
                                        required: true,
                                        validate: (value) => value.length == 6
                                    })}
                                />
                                <span className={`text-xs ${timer == 0 ? "text-zinc-400" : "text-zinc-600"} absolute -bottom-5 right-0 flex gap-x-1 cursor-pointer`} onClick={() => {
                                    if (timer == 0) {
                                        handleSendOTP(getValues("email"), true)
                                    }
                                }}>Resend OTP <p className="text-red-500 w-4">{timer == 0 ? "" : `${timer}s`}</p></span>
                                {
                                    errors.otp && <p className="text-xs text-red-500 absolute -bottom-5 ">Please enter valid OTP!</p>
                                }
                            </div>
                            <div className="relative">
                                <Input
                                    type="password"
                                    label="New Password"
                                    required={true}
                                    placeholder="Enter your new Password"
                                    {...register("password", {
                                        required: true,
                                        validate: (value) => value.length > 8
                                    })}
                                />
                                {
                                    errors.password && <p className="text-xs text-red-500 absolute -bottom-5">Please enter valid password!</p>
                                }
                            </div>
                            <div className="relative">
                                <Input
                                    type="password"
                                    label="Re-enter Password"
                                    required={true}
                                    placeholder="Re-enter your Password"
                                    {...register("retypepassword", {
                                        required: true,
                                        validate: (value) =>
                                            value === getValues("password") || "Both password are not same!"
                                    })}
                                />
                                {
                                    errors.retypepassword && <p className="text-xs text-red-500 absolute -bottom-5">Both password are not same!</p>
                                }
                            </div>
                            <Button
                                name="Change Password"
                                type="submit"
                                btnClass="bg-green-900 w-full rounded-md flex justify-center text-white border-r border-b hover:bg-green-800 transition-colors"
                            />
                        </form>
                    )
                }

            </section ></>
    )
}

export default ForgotPassword