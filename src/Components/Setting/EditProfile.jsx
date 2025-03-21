import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../Services/Operations/SettingsAPI";
import IconBtn from "../common/IconBtn";
import { useState } from "react";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    try {
      setLoading(true);
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <form onSubmit={handleSubmit(submitProfileForm)}>
        <div className="my-5 rounded-md border border-slate-400 bg-white py-6 px-4 md:px-6 lg:px-8">
          <h1 className="text-lg md:text-xl lg:text-2xl mb-6 font-semibold text-slate-800 uppercase tracking-wider">
            Profile Information
          </h1>

          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col md:flex-row gap-5">
              <label className="w-full">
                <p className="text-sm md:text-base font-medium mb-1 uppercase tracking-wider">
                  First Name <span className="text-pink-100">*</span>
                </p>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  defaultValue={user?.firstname}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm md:text-base placeholder:text-sm placeholder:uppercase focus:outline-none focus:ring-2 focus:ring-pink-500"
                  {...register('firstname', { required: true })}
                />
                {errors.firstname && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter your first name
                  </p>
                )}
              </label>

              <label className="w-full">
                <p className="text-sm md:text-base font-medium mb-1 uppercase tracking-wider">
                  Last Name <span className="text-pink-100">*</span>
                </p>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  defaultValue={user?.lastname}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm md:text-base placeholder:text-sm placeholder:uppercase focus:outline-none focus:ring-2 focus:ring-pink-500"
                  {...register('lastname', { required: true })}
                />
                {errors.lastname && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter your last name
                  </p>
                )}
              </label>

              <label className="w-full">
                <p className="text-sm md:text-base font-medium mb-1 uppercase tracking-wider">
                  User Name <span className="text-pink-100">*</span>
                </p>
                <input
                  type="text"
                  name="UserName"
                  placeholder="Enter username"
                  defaultValue={user?.username}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm md:text-base placeholder:text-sm placeholder:uppercase focus:outline-none focus:ring-2 focus:ring-pink-500"
                  {...register('username', { required: true })}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter your username
                  </p>
                )}
              </label>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <label className="w-full">
                <p className="text-sm md:text-base font-medium mb-1 uppercase tracking-wider">
                  Contact Number <span className="text-pink-100">*</span>
                </p>
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Enter contact number"
                  defaultValue={user?.profile?.contactNumber}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm md:text-base placeholder:text-sm placeholder:uppercase focus:outline-none focus:ring-2 focus:ring-pink-500"
                  {...register('contactNumber', {
                    required: {
                      value: true,
                      message: 'Please enter your contact number',
                    },
                    maxLength: {
                      value: 12,
                      message: 'Invalid contact number',
                    },
                    minLength: {
                      value: 10,
                      message: 'Invalid contact number',
                    },
                  })}
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.contactNumber.message}
                  </p>
                )}
              </label>

              <label className="w-full">
                <p className="text-sm md:text-base font-medium mb-1 uppercase tracking-wider">
                  About <span className="text-pink-100">*</span>
                </p>
                <input
                  type="text"
                  name="about"
                  placeholder="Enter bio detail"
                  defaultValue={user?.profile?.about}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm md:text-base placeholder:text-sm placeholder:uppercase focus:outline-none focus:ring-2 focus:ring-pink-500"
                  {...register('about', { required: true })}
                />
                {errors.about && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter your bio details
                  </p>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard/my-profile')}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md font-semibold uppercase tracking-wider hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>

          <IconBtn
            type="submit"
            disabled={loading}
            text={loading ? 'Saving...' : 'Save'}
            customClasses="bg-pink-700 text-white py-2 px-4 rounded-md font-semibold uppercase tracking-wider hover:bg-pink-800"
          />
        </div>
      </form>
    </div>
  );
}
