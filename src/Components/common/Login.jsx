import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Footer } from './Footer';
import { login } from '../../Services/Operations/authAPI';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleOnSubmit(e) {
    e.preventDefault(); // Prevent default form submission
    dispatch(login(email, password, navigate));
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen p-4 mt-[10vh]'>
      <div className='border-2 mt-10 md:mt-20 lg:mt-40 shadow-md flex flex-col p-4 md:p-6 lg:p-8 rounded-3xl w-full sm:w-8/12 md:w-6/12 lg:w-4/12'>
        <h3 className='text-2xl md:text-3xl text-blue-600 font-bold mb-4'>
          Login
        </h3>
        <form className='flex flex-col gap-4' onSubmit={handleOnSubmit}>
          <div className='flex flex-col'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id='email'
              name='email'
              placeholder='Enter email'
              required
              className='outline outline-slate-400 rounded-lg px-3 py-2 my-2'
              value={email}
              onChange={changeHandler}
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id='password'
              name='password'
              placeholder='Enter Password'
              required
              className='outline outline-slate-400 rounded-lg px-3 py-2 my-2'
              value={password}
              onChange={changeHandler}
            />
          </div>

          <button type='submit' className='w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 font-bold'>
            Login
          </button>

          <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 mt-2 text-center">
            Forgot Password?
          </Link>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
