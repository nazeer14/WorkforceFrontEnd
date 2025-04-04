import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({ username: "", password: "" });
  const [data, setData] = useState(null); // Holds API response data
  const [error, setError] = useState(""); // Track login errors

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

    const handleLogin = async (e) => {
      e.preventDefault();
    
      try {
        const response = await fetch("http://localhost:8080/jpa/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
    
        if (!response.ok) {
          throw new Error(`Login failed: ${response.statusText}`);
        }
    
        const result = await response.json();
    
        if (result.username) {
          // Store user data in Redux & localStorage
          dispatch(
            login({
              user: {
                username: result.username,
                firstname: result.firstname,
                lastname: result.lastname,
                phoneno: result.phoneno,
                mail: result.mail,
              },
            })
          );
          localStorage.setItem("user", JSON.stringify(result)); // Save user data
    
          navigate("/home"); // Redirect after login
        } else {
          setError("Invalid username or password.");
        }
      } catch (error) {
        console.error("Login Error:", error);
        setError("An error occurred. Please try again.");
      }
    };
    

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src="Clogo2.png" className="mx-auto h-30 w-auto" />
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">Login</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              onChange={handleChange}
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <Link to="/forgot" className="text-sm text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              onChange={handleChange}
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Create Account?{" "}
          <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
