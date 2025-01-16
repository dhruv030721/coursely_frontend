import { Button, Input } from "@/components"
import yayin_logo_bgremove from "@/assets/logo_icon.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  const handleSignup = () => {

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
          <h1 className="font-dm_sans text-3xl md:text-5xl">Welcome back!</h1>
          <p className="text-xs text-zinc-400 mt-2">
            Enter to get unlimited access of data & information
          </p>
        </div>

        {/* Form */}
        <form className="w-full max-w-96 flex flex-col space-y-5 mt-8 md:mt-10">
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
          <Input
            name="Confirm Password"
            type="password"
            label="Confirm Password"
            required={true}
            placeholder="Enter your password"
          />
          <Button
            name="Login"
            handler={handleSignup}
            btnClass="bg-green-900 w-full rounded-md flex justify-center text-white border-r border-b hover:bg-green-800 transition-colors"
          />
          <span className="text-center text-sm text-zinc-200">
            Alreay have an account?{" "}
            <span className="underline text-zinc-400 hover:text-white cursor-pointer" onClick={() => { navigate('/login') }}>
              Login Here
            </span>
          </span>
        </form>
      </section>
    </>
  )
}

export default Signup
