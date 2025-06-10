import { Button, Input } from "@/components"
import yayin_logo_bgremove from "@/assets/logo_icon.png";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form"
import toast from "react-hot-toast";
import userServices from "@/services/User/UserServices";
import { toastDarkStyle } from "@/components/GlobalStyle";

const Signup = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm()

  const handleSignup = async (data: FieldValues) => {
    await toast.promise(
      userServices.Signup(data),
      {
        loading: "Processing",
        success: (response) => {
          navigate("/login")
          return `${response.data.message}`
        },
        error: (error) => {
          if (error.response.data == "") return `${error.response.statusText}`
          return `${error.response.data.message}`
        }
      },
      toastDarkStyle("")
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
          <h1 className="font-dm_sans text-3xl md:text-5xl">Welcome back!</h1>
          <p className="text-xs text-zinc-400 mt-2">
            Enter to get unlimited access of data & information
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit((data => handleSignup(data)))} className="w-full max-w-96 grid grid-cols-1 justify-center items-center md:grid-cols-2 gap-5 mt-8 md:mt-10">
          <div className="relative">
            <Input
              type="text"
              label="Name"
              required={true}
              placeholder="Enter your name"
              divClasses="col-span-1"
              isValid={false}
              error=""
              {
              ...register('name', { required: true })
              }
            />
            {
              errors.name && <p className="text-xs text-red-500 absolute -bottom-5 animate-bounce">Please enter your name!</p>
            }
          </div>
          <div className="relative">
            <Input
              type="email"
              label="Email"
              required={true}
              placeholder="Enter your email"
              divClasses="col-span-1"
              {
              ...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })
              }
            />
            {
              errors.email && <p className="text-xs text-red-500 absolute -bottom-5 animate-bounce">Please enter valid email!</p>
            }
          </div>
          <div className="relative">
            <Input
              type="password"
              label="Password"
              required={true}
              placeholder="Enter your password"
              divClasses="col-span-1"
              {
              ...register("password", { required: true, validate: (value) => value.length > 8 })
              }
            />
            {
              errors.password && <p className="text-xs text-red-500 absolute -bottom-5 animate-bounce">Please enter valid password!</p>
            }
          </div>
          <div className="relative">
            <Input
              type="password"
              label="Confirm Password"
              required={true}
              placeholder="Enter your password"
              divClasses="col-span-1"
              {
              ...register("confirmpassword", {
                required: true,
                validate: (value) => value === getValues("password") || "Both password are not same!"
              })
              }
            />
            {
              errors.confirmpassword && <p className="text-xs text-red-500 absolute -bottom-5 animate-bounce">Both password are not same!</p>
            }
          </div>
          <div className="relative">
            <Input
              type="number"
              label="Age"
              required={true}
              placeholder="Enter your age"
              divClasses="col-span-1"
              {
              ...register("age", { required: true, validate: (value) => value >= 18 })
              }
            />
            {
              errors.age && <p className="text-xs text-red-500 absolute -bottom-5 animate-bounce">Only above 18 are eligible!</p>
            }
          </div>
          <div className="relative">
            <Input
              type="number"
              label="Contact"
              required={true}
              placeholder="Enter your contact number"
              divClasses="col-span-1"
              {
              ...register("contact", { required: true, validate: (value) => value.length == 10 })
              }
            />
            {
              errors.contact && <p className="text-xs text-red-500 absolute -bottom-5 animate-bounce">Please enter valid contact!</p>
            }
          </div>
          <div className="col-span-1 md:col-span-2">
            <Button
              name="Signup"
              type="submit"
              btnClass="bg-green-900 w-full rounded-md flex justify-center text-white border-r border-b hover:bg-green-800 transition-colors"
            />
          </div>
          <div className="col-span-1 md:col-span-2 text-center">
            <span className="text-center text-sm text-zinc-200">
              Alreay have an account?{" "}
              <span className="underline text-zinc-400 hover:text-white cursor-pointer" onClick={() => { navigate('/login') }}>
                Login Here
              </span>
            </span>
          </div>
        </form>
      </section>
    </>
  )
}

export default Signup
