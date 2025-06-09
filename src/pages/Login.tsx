import { Input, Button } from "@/components";
import yayin_logo_bgremove from "@/assets/logo_icon.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { toastDarkStyle } from "@/components/GlobalStyle";
import { useState } from "react"
import { CheckValidation } from "@/utility/Validation";
import userServices from "@/services/User/UserServices";

interface LoginProps {
    email: string;
    password: string;
}

const Login = () => {

    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async ({ email, password }: LoginProps) => {
        if (validEmail && validPassword) {
            await toast.promise(
                userServices.Login({ email, password }),
                {
                    loading: "Verifying",
                    success: (response) => {
                        navigate("/")
                        return `${response.data.message}`
                    },
                    error: (error) => {
                        return `${error.response.data.message}`
                    }
                },
                toastDarkStyle("")
            )
        }
    };

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
                    <h1 className="font-dm_sans text-3xl md:text-5xl">Welcome back!</h1>
                    <p className="text-xs text-zinc-400 mt-2">
                        Enter to get unlimited access of data & information
                    </p>
                </div>

                {/* Form */}
                <div className="w-full max-w-96 flex flex-col space-y-5 mt-8 md:mt-10">
                    <Input
                        name="Email"
                        type="email"
                        label="Email"
                        required={true}
                        value={email}
                        placeholder="Enter your email"
                        handler={(e) => {
                            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                            CheckValidation({ value: e.target.value, regex: emailRegex }) ? setValidEmail(true) : setValidEmail(false)
                            setEmail(e.target.value)
                        }}
                        isValid={validEmail}
                        error="*Please enter a valid email"
                    />
                    <Input
                        name="Password"
                        type="password"
                        label="Password"
                        required={true}
                        value={password}
                        placeholder="Enter your password"
                        handler={(e) => {
                            const minLength = 6;
                            if (e.target.value.length >= minLength) {
                                setValidPassword(true);
                            } else {
                                setValidPassword(false);
                            }
                            setPassword(e.target.value);
                        }}
                        isValid={validPassword}
                        error="*Please enter a valid password"
                    />
                    <Link to="/forgotpassword" > <span className="text-end text-sm text-zinc-200 hover:text-white cursor-pointer">
                        Forgot your password?
                    </span></Link>
                    <Button
                        name="Login"
                        handler={() => { handleLogin({ email, password }) }}
                        btnClass="bg-green-900 w-full rounded-md flex justify-center text-white border-r border-b hover:bg-green-800 transition-colors"
                    />
                    <span className="text-center text-sm text-zinc-200">
                        Don't have an account?{" "}
                        <span className="underline text-zinc-400 hover:text-white cursor-pointer" onClick={() => { navigate('/signup') }}>
                            Register Here
                        </span>
                    </span>
                </div>
            </section>
        </>
    );
};

export default Login;