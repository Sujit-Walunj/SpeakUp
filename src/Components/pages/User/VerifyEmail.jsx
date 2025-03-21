import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { RxCountdownTimer } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, signUp } from '../../../Services/Operations/authAPI';
import { useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
        firstname,
        lastname,
        email,
        username,
        password,
        confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        firstname,
        lastname,
        email,
        username,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-4 bg-blue-50">
      {loading && <div className="text-center text-lg">Loading...</div>}
      {error && <div className="text-center text-red-500 text-lg">{error.message}</div>}
      {!loading && !error && (
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-4">Verify Email</h1>
          <p className="text-lg mb-6 text-gray-700">
            A verification code has been sent to you. Enter the code below.
          </p>
          <form onSubmit={handleVerifyAndSignup} className="space-y-6">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className="w-[48px] sm:w-[60px] border-0 bg-gray-100 rounded-md text-center py-2 text-lg focus:outline-none"
                  style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
                />
              )}
              containerStyle="flex justify-between gap-2"
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 rounded-md mt-4 font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between text-sm text-gray-700">
            <Link to="/signup" className="flex items-center gap-2 hover:text-blue-600">
              <BiArrowBack /> Back to Signup
            </Link>
            <button
              className="flex items-center gap-2 hover:text-blue-600"
              onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer /> Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
