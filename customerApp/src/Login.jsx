import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {

  const navigate = useNavigate();

  const googleAuth = (code) => axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/google?code=${code}`)

  const responseGoogle = async (authResult) => {
    try {
      if (authResult['code']) {
        const result = await googleAuth(authResult['code']);
        const { email, name } = result.data.user;
        const token = result.data.token;
        toast.success("User Logined...", { autoClose: 1000 });
        setTimeout(() => {
          navigate("/")
        }, 2000)
        console.log(result.data.user);
        localStorage.setItem("userToken", token);
        localStorage.setItem("userEmail", email);
        // console.log(localStorage)
      }
    } catch (error) {
      console.error('Error while req google', error)
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code'
  })

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center gap-5 w-80">
          <h2 className="text-lg font-semibold text-gray-700">Sign in with Google</h2>
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
            onClick={googleLogin}
          >
            Google Login
          </button>
          {/* <button
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            onClick={() => console.log(localStorage)}
          >
            cocleo
          </button> */}
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login