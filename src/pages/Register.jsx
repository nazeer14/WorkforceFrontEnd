import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    phoneno:"",
    email: ""  
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/jpa/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error("Registration failed");

      navigate("/login"); // Redirect to login after successful registration
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Register</h2>
        
        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <input type="text" name="username" placeholder="Username" required className="w-full p-2 border rounded-md" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required className="w-full p-2 border rounded-md" onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" required className="w-full p-2 border rounded-md" onChange={handleChange} />
          <input type="text" name="firstname" placeholder="First Name" required className="w-full p-2 border rounded-md" onChange={handleChange} />
          <input type="text" name="lastname" placeholder="Last Name" className="w-full p-2 border rounded-md" onChange={handleChange} />
          <input type="number" name="phoneno" placeholder="Phone Number (optional)" className="w-full p-2 border rounded-md" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required className="w-full p-2 border rounded-md" onChange={handleChange} />
           {error && <p className="text-sm text-red-500">{error}</p>}

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500">
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
