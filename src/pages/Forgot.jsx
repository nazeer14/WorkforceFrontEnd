import React, { useState } from "react";

function Forgot() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!email.trim() && !phone.trim()) {
      setError("Please enter either your email or phone number.");
      return false;
    }

    if (email.trim() && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError("Invalid email format.");
      return false;
    }

    if (phone.trim() && !/^\d{10}$/.test(phone)) {
      setError("Phone number must be 10 digits.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:8080/jpa/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() || null, phone: phone.trim() || null }),
      });

      const data = await response.json(); // Extract JSON response

      if (!response.ok) throw new Error(data.message || "No account found with the provided details.");

      setMessage("A reset link has been sent to your email or phone.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Forgot Password</h2>
        <p className="text-gray-500 text-center mt-2">Enter your email or phone to reset your password</p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-2 border rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full mt-2 px-4 py-2 border rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Display Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button type="submit" className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md transition">
            Reset Password
          </button>
        </form>

        {/* Display Success Message */}
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
}

export default Forgot;
