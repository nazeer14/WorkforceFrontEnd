import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase.config";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: "",
    mobileno: "",
    password: "",
    confirmPassword:""
  });


  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
        callback: (response) => {},
      });
      window.recaptchaVerifier.render();
    }
  };
  const phoneRegex = /^\+91\s*\d{10}$/;

  const sendOtp = async () => {
    if (!user.mobileno.startsWith("+91")) {
      setMessage("Include country code (e.g., +91)");
      return;
    }
    
    if (!phoneRegex.test(user.mobileno)) {
      setMessage("Enter a valid phone number");
      return;
    }

    setupRecaptcha();
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, user.mobileno, window.recaptchaVerifier);
      setConfirmation(confirmationResult);
      setMessage("OTP sent to your phone");
    } catch (error) {
      setMessage("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      await confirmation.confirm(otp);
      setOtpVerified(true); // ✅ Mark as verified
      setMessage("Phone verified!");
    } catch (error) {
      console.error(error);
      setMessage("Invalid OTP");
    }
  };
  

  const handleRegister = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!otpVerified) {
      setError("Please verify your phone number.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/users/adduser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error("Registration failed");
      navigate("/login");//redirection
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-indigo-700">Create an Account</h2>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="mobileno" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="flex gap-2">
              <input
                id="mobileno"
                name="mobileno"
                type="tel"
                required
                onChange={handleChange}
                placeholder="+91 8008398263"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={sendOtp}
                className="bg-indigo-500 text-white px-3 py-2 rounded-lg hover:bg-indigo-600"
              >
                Send OTP
              </button>
            </div>

            {confirmation && (
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border mt-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={verifyOtp}
                  disabled={isVerified} // 🔒 Disable after success
                  className={`w-full py-2 text-white rounded-md transition-colors duration-200 ${
                    isVerified ? "bg-green-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
                  }`}
                >
                  {isVerified ? "Verified" : "Verify OTP"}
                </button>

              </div>
            )}
          </div> {message && <p className="text-sm text-green-600">{message}</p>}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <p className="text-sm text-gray-500">
            By registering, you agree to our <a href="/terms" className="text-indigo-600 hover:underline">Terms</a> and <a href="/pp" className="text-indigo-600 hover:underline">Privacy Policy</a>.
          </p>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg font-medium transition-colors duration-200"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline font-medium">
            Login
          </a>
        </p>

        <div id="recaptcha"></div>
      </div>
    </div>
  );
}

export default Register;
