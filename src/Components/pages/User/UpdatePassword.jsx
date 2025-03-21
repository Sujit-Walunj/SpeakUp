import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { resetPassword } from '../../../Services/Operations/authAPI';

function UpdatePassword() {
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }));
  };

  const { password, confirmPassword } = formData;
  const dispatch = useDispatch();
  const location = useLocation();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split('/').at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-blue-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {
          loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-4">Choose New Password</h1>
              <p className="mb-6">Almost done. Enter your new password.</p>
              <form onSubmit={handleOnSubmit} className="space-y-4">
                <label className="block">
                  <p className="text-sm font-medium text-gray-700">New Password</p>
                  <div className="relative">
                    <input
                      type={showPassword ? "password" : "text"}
                      name="password"
                      value={password}
                      onChange={handleOnChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter new password"
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </span>
                  </div>
                </label>
                <label className="block">
                  <p className="text-sm font-medium text-gray-700">Confirm New Password</p>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "password" : "text"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleOnChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Confirm new password"
                    />
                    <span
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    >
                      {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                    </span>
                  </div>
                </label>
                <button
                  type='submit'
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Reset Password
                </button>
                <div className="text-center">
                  <Link to='/login' className="text-indigo-600 hover:text-indigo-500">
                    Back to login
                  </Link>
                </div>
              </form>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default UpdatePassword;
