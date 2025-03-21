import {setLoading} from "../../Slices/authSlice"
import apiConnector from "../apiConnector";
import { toast } from "react-hot-toast"
import { endpoints } from "../apis"
import { setToken } from "../../Slices/authSlice";
import { setUser } from "../../Slices/profileSlice";
import axios from "axios";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
  } = endpoints
  


  export function sendOtp(email, navigate) {
    return async (dispatch) => {

      dispatch(setLoading(true))
      try {
        const data = {
          email:email
        }
        const response = await axios.post(
          SENDOTP_API,data
        )
        
        console.log("SENDOTP API RESPONSE............", response)
  
        console.log(response.data.success)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
      } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
      }
      dispatch(setLoading(false))
    }
  }
  
  export function signUp(
    firstname,
    lastname,
    email,
    username,
    password,
    confirmPassword,
    otp,
    navigate
  ) {
    return async (dispatch) => {
    
      dispatch(setLoading(true))
      try {
        const data ={
          firstname,
          lastname,
          email,
          username,
          password,
          confirmPassword,
          otp,
        }
        const response = await axios.post(SIGNUP_API,data);
       
  
        console.log("SIGNUP API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Sign Up Successful")
        navigate("/login")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Sign Up Failed")
        navigate("/signup")
      }
      dispatch(setLoading(false))
    }
  }
  export function login(email, password, navigate) {
    return async (dispatch) => {
      dispatch(setLoading(true));
  
      try {
        // Make API call using apiConnector
        const response = await apiConnector('POST', LOGIN_API, {
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            email,
            password,
          },
        });
  
        console.log("LOGIN API RESPONSE.....:", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Login Successful");
  
        // Dispatch actions to set token and user in Redux
        dispatch(setToken(response.data.token));
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstname} ${response.data.user.lastname}`;
  
        dispatch(setUser({ ...response.data.user, image: userImage }));
  
        // Store token and user info in localStorage
        localStorage.setItem("token", JSON.stringify(response.data.token));

        const expiry = Date.now() + 120000;
        localStorage.setItem("tokenExpiry", expiry);



        localStorage.setItem("user", JSON.stringify(response.data.user));
  
        // Navigate to the dashboard
        navigate("/dashboard/my-profile"); // change this route
      } catch (error) {
        console.log("LOGIN API ERROR............", error);
        toast.error("Login Failed");
      } finally {
        dispatch(setLoading(false));
      }
    };
  }











  
  export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {

      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", RESETPASSTOKEN_API, {
          email,
        })
  
        console.log("RESETPASSTOKEN RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Reset Email Sent")
        setEmailSent(true)
      } catch (error) {
        console.log("RESETPASSTOKEN ERROR............", error)
        toast.error("Failed To Send Reset Email")
      }
      dispatch(setLoading(false))
    }
  }
  
  export function resetPassword(password, confirmPassword, token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", RESETPASSWORD_API, {
          password,
          confirmPassword,
          token,
        })
  
        console.log("RESETPASSWORD RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Password Reset Successfully")
        navigate("/login")
      } catch (error) {
        console.log("RESETPASSWORD ERROR............", error)
        toast.error("Failed To Reset Password")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }
  
  export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null));
      dispatch(setUser(null));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged Out");
      navigate("/")
      
    }
  }
  
