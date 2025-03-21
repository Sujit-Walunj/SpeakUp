import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignupData } from '../../Slices/authSlice';
import { sendOtp } from '../../Services/Operations/authAPI';
import { Footer } from './Footer';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { firstname, lastname, email, username, password, confirmPassword } = formData;

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleOnSubmit(e) {
    e.preventDefault(); // Prevent default form submission

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    const signupData = {
      ...formData
    };

    dispatch(setSignupData(signupData));
    console.log("email is ",formData.email);
    dispatch(sendOtp(formData.email, navigate));

    // setFormData({
    //   firstname: "",
    //   lastname: "",
    //   email: "",
    //   username: "",
    //   password: "",
    //   confirmPassword: "",
    // });
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen p-4 mt-[10vh]'>
      <div className='border-2 mt-10 md:mt-20 lg:mt-32 shadow-md flex flex-col p-4 md:p-6 lg:p-8 rounded-3xl w-full sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12'>
        <h3 className='text-2xl md:text-3xl text-blue-600 font-bold mb-4 text-center'>
          Sign Up
        </h3>
        <form className='flex flex-col gap-4' onSubmit={handleOnSubmit}>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex flex-col w-full'>
              <label htmlFor="firstname">First Name</label>
              <input 
                type="text" 
                name="firstname" 
                required
                placeholder='First Name'
                className='outline outline-slate-400 rounded-lg px-3 py-2 my-2 w-full'
                value={firstname}
                onChange={changeHandler} 
              />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor="lastname">Last Name</label>
              <input 
                type="text" 
                name="lastname" 
                required
                placeholder='Last Name'
                className='outline outline-slate-400 rounded-lg px-3 py-2 my-2 w-full'
                value={lastname}
                onChange={changeHandler} 
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              name='email' 
              id='email' 
              required
              placeholder='Email Address'
              className='outline outline-slate-400 rounded-lg px-3 py-2 my-2 w-full'
              value={email}
              onChange={changeHandler} 
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              name='username' 
              id='username' 
              required
              placeholder='Username'
              className='outline outline-slate-400 rounded-lg px-3 py-2 my-2 w-full'
              value={username}
              onChange={changeHandler} 
            />
          </div>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex flex-col w-full'>
              <label htmlFor="password">Create Password</label>
              <input 
                type={showPassword ? "text" : "password"}
                id='password'
                name='password' 
                placeholder='Enter Password'
                required
                className='outline outline-slate-400 rounded-lg px-3 py-2 my-2 w-full'
                value={password}
                onChange={changeHandler} 
              />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type={showConfirmPassword ? "text" : "password"}
                id='confirmPassword' 
                name='confirmPassword' 
                placeholder='Confirm Password'
                required
                className='outline outline-slate-400 rounded-lg px-3 py-2 my-2 w-full'
                value={confirmPassword}
                onChange={changeHandler} 
              />
            </div>
          </div>
          <button type='submit' className='w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 font-bold'>
            Create Account
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
