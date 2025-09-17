import { Button, CandleStickLoader, Input, Toast } from '@/components';
import { userServices } from '@/services';
import { RootState } from '@/store';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUser } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchUserData = async () => {
    if (user?.email) {
      try {
        setLoading(true);
        const response: any = await userServices.GetUser(user?.email);
        const userData = response.data.data;

        if (userData) {
          setValue('name', userData.name || '');
          setValue('email', userData.email || '');
          setValue('age', userData.age || '');
          setValue('contact', userData.contact || '');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const onSubmit = async (data: any) => {
    await Toast.promise(userServices.UpdateUser(data.email, data.name, data.age, data.contact), {
      loading: 'Updating profile...',
      success: (response) => {
        const data = response.data.user;
        setValue('name', data.name || '');
        setValue('email', data.email || '');
        setValue('age', data.age || '');
        setValue('contact', data.contact || '');
        return `${response.data.message}`;
      },
      error: (error) => {
        return `${error.response.data.message}`;
      },
    });
  };

  useEffect(() => {
    fetchUserData();
  }, [user?.email]);

  if (loading) {
    return <CandleStickLoader />;
  }

  return (
    <div className="pt-20 bg-black text-white">
      <div className="p-20">
        <h1 className="flex gap-x-2 text-2xl mb-6">
          <FiUser size={30} className="hover:scale-110 transition-all" />
          User Profile
        </h1>
        <div className="border border-zinc-700 rounded-md">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="relative">
                <Input
                  type="email"
                  label="Email"
                  inputClasses="text-gray-400"
                  innerDivClasses="border-none bg-zinc-900"
                  required={true}
                  readOnly={true}
                  placeholder="Enter your email"
                  divClasses=""
                  {...register('email', {
                    required: 'Please enter your email!',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Please enter a valid email!',
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">Please enter a valid email!</p>
                )}
              </div>
              <div className="relative">
                <Input
                  type="text"
                  label="Name"
                  required={true}
                  placeholder="Enter your name"
                  divClasses=""
                  isValid={false}
                  error=""
                  {...register('name', { required: 'Please enter your name!' })}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">Please enter your name!</p>
                )}
              </div>
              <div className="relative">
                <Input
                  type="number"
                  label="Age"
                  required={true}
                  placeholder="Enter your age"
                  divClasses=""
                  {...register('age', {
                    required: 'Please enter your age!',
                    validate: (value) => value >= 18 || 'Only above 18 are eligible!',
                  })}
                />
                {errors.age && (
                  <p className="text-xs text-red-500 mt-1">Only above 18 are eligible!</p>
                )}
              </div>

              <div className="relative">
                <Input
                  type="tel"
                  label="Contact"
                  required={true}
                  placeholder="Enter your contact number"
                  divClasses=""
                  {...register('contact', {
                    required: 'Please enter your contact number!',
                    validate: (value) =>
                      value.toString().length === 10 || 'Please enter a valid 10-digit contact!',
                  })}
                />
                {errors.contact && (
                  <p className="text-xs text-red-500 mt-1">
                    Please enter a valid 10-digit contact!
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center md:justify-start">
              <Button
                name="Update Profile"
                type="submit"
                btnClass="bg-green-900 px-8 py-2 rounded-md text-white border-r border-b hover:bg-green-800 transition-colors"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
