import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { token, navigate, backendUrl, setToken } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSumbitHandler = async (e) => {
    try {
      e.preventDefault();
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]); // Added dependency

  return (
    <div className="min-h-[80vh] flex items-center justify-center dark:bg-gray-900 transition-colors duration-300">
        <form
        onSubmit={onSumbitHandler}
        className="flex flex-col items-center w-[90%] sm:max-w-md bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 animate-fade-in-up"
        >
        <div className="inline-flex items-center gap-2 mb-8">
            <p className="prata-regular text-3xl text-gray-800 dark:text-white">{currentState}</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800 dark:bg-white" />
        </div>
        
        {currentState === "Sign Up" && (
            <div className="w-full mb-4">
                <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg outline-none focus:border-black dark:focus:border-white bg-transparent dark:text-white transition-colors"
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                />
            </div>
        )}
        <div className="w-full mb-4">
            <input
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg outline-none focus:border-black dark:focus:border-white bg-transparent dark:text-white transition-colors"
            type="text" // Changed from email to text for phone support flexibility
            placeholder="Email / Phone Number"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            />
        </div>
        <div className="w-full mb-6">
            <input
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg outline-none focus:border-black dark:focus:border-white bg-transparent dark:text-white transition-colors"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            />
        </div>

        <div className="w-full flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-8">
            <p className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">Forgot Password?</p>
            {currentState === "Sign Up" ? (
            <p
                onClick={() => setCurrentState("Login")}
                className="cursor-pointer hover:text-black dark:hover:text-white font-medium transition-colors"
            >
                Login Here
            </p>
            ) : (
            <p
                onClick={() => setCurrentState("Sign Up")}
                className="cursor-pointer hover:text-black dark:hover:text-white font-medium transition-colors"
            >
                Create an account
            </p>
            )}
        </div>

        <button className="w-full bg-black dark:bg-white text-white dark:text-black font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide">
            {currentState}
        </button>
        </form>
    </div>
  );
};

export default Login;
