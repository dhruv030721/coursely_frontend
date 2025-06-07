import { Input, Button } from "@/components";
import yayin_logo_bgremove from "@/assets/logo_icon.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { toastDarkStyle } from "@/components/GlobalStyle";

interface LoginProps {
    email: string;
    password: string;
}

const Login = () => {

    const navigate = useNavigate();

    const handleLogin = ({email, password} : LoginProps) => {
        // toast.promise(
        //     "Login Successful!", toastDarkStyle("SUCCESS") as object);
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
                        placeholder="Enter your email"
                    />
                    <Input
                        name="Password"
                        type="password"
                        label="Password"
                        required={true}
                        placeholder="Enter your password"
                    />
                    <Link to="/forgotpassword" > <span className="text-end text-sm text-zinc-200 hover:text-white cursor-pointer">
                        Forgot your password?
                    </span></Link>
                    <Button
                        name="Login"
                        handler={handleLogin}
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