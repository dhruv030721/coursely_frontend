import { Button, Input } from '@/components';
import { toastDarkStyle } from '@/components/GlobalStyle';
import userServices from '@/services/User/UserServices';
import { login } from '@/store/slices/auth.slice';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data: FieldValues) => {
    const { email, password } = data;
    if (email != '' && password != '') {
      await toast.promise(
        userServices.Login({ email, password }),
        {
          loading: 'Verifying',
          success: (response) => {
            const data = response.data.data;
            dispatch(
              login({
                _id: data._id,
                email: data.email,
                name: data.name,
                contact: data.contact,
                cartItemCount: data.cartItemCount,
              })
            );
            navigate('/');
            return `${response.data.message}`;
          },
          error: (error) => {
            if (error.response.data == '') return `${error.response.statusText}`;
            return `${error.response.data.message}`;
          },
        },
        toastDarkStyle()
      );
    }
  };

  return (
    <>
      {/* Form Section */}
      <section className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-0 bg-zinc-950">
        {/* Heading Section */}
        <div className="flex flex-col items-start w-full max-w-96">
          <img
            src={
              'https://res.cloudinary.com/dkkawe9gq/image/upload/v1749928894/logo_icon_ez4nif.png'
            }
            alt="Yayin Stock Logo"
            className="w-20 md:w-14 mb-6"
          />
          <h1 className="font-dm_sans text-3xl md:text-5xl">Welcome back!</h1>
          <p className="text-xs text-zinc-400 mt-2">
            Enter to get unlimited access of data & information
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit((data) => handleLogin(data))}
          className="w-full max-w-96 flex flex-col space-y-5 mt-8 md:mt-10"
        >
          <div className="relative">
            <Input
              type="email"
              label="Email"
              required={true}
              placeholder="Enter your email"
              {...register('email', {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 absolute -bottom-5">Please enter valid email!</p>
            )}
          </div>
          <div className="relative">
            <Input
              type="password"
              label="Password"
              required={true}
              placeholder="Enter your password"
              {...register('password', { required: true, validate: (value) => value.length >= 8 })}
            />
            {errors.password && (
              <p className="text-xs text-red-500 absolute -bottom-5">
                Please enter valid password!
              </p>
            )}
          </div>
          <Link to="/forgotpassword">
            {' '}
            <span className="text-end text-sm text-zinc-200 hover:text-white cursor-pointer">
              Forgot your password?
            </span>
          </Link>
          <Button
            name="Login"
            type="submit"
            btnClass="bg-green-900 w-full rounded-md flex justify-center text-white border-r border-b hover:bg-green-800 transition-colors"
          />
          <span className="text-center text-sm text-zinc-200">
            Don't have an account?{' '}
            <span
              className="underline text-zinc-400 hover:text-white cursor-pointer"
              onClick={() => {
                navigate('/signup');
              }}
            >
              Register Here
            </span>
          </span>
        </form>
      </section>
    </>
  );
};

export default Login;
