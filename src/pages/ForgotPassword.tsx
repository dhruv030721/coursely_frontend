import { Input, Button } from "@/components";
import yayin_logo_bgremove from "@/assets/logo_icon.png";
import { useState } from "react";

const ForgotPassword = () => {

    const [steps, setSteps] = useState(1);

    const handleSendOTP = (email: string) => {
        console.log("Sending OTP to:", email);
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
                        < div className="w-full max-w-96 flex flex-col space-y-5 mt-8 md:mt-10">
                            <Input
                                name="Email"
                                type="email"
                                label="Email"
                                required={true}
                                placeholder="Enter your email"
                            />
                            <Button
                                name="Send OTP"
                                handler={handleSendOTP}
                                btnClass="bg-green-900 w-full rounded-md flex justify-center text-white border-r border-b hover:bg-green-800 transition-colors"
                            />
                        </div>
                    )
                }
                {
                    steps === 2 && (
                        < div className="w-full max-w-96 flex flex-col space-y-5 mt-8 md:mt-10">
                            <Input
                                name="New Password"
                                type="text"
                                label="New Password"
                                required={true}
                                placeholder="Enter your new Password"
                            />
                            <Input
                                name="Re-enter Password"
                                type="text"
                                label="Re-enter Password"
                                required={true}
                                placeholder="Re-enter your Password"
                            />
                            <Button
                                name="Change Password"
                                handler={handleSendOTP}
                                btnClass="bg-green-900 w-full rounded-md flex justify-center text-white border-r border-b hover:bg-green-800 transition-colors"
                            />
                        </div>
                    )
                }

            </section ></>
    )
}

export default ForgotPassword