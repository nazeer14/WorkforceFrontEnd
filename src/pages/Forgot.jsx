import React, { useState } from "react";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../firebase.config";

function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
        callback: () => {},
      });
      window.recaptchaVerifier.render();
    }
  };

  const sendOtp = async () => {
    setError("");
    if (!/^\+91 \d{10}$/.test(phone.trim())) {
      setError("Phone must be in +91 XXXXXXXXXX format.");
      return;
    }

    setupRecaptcha();
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone.trim(),
        window.recaptchaVerifier
      );
      setConfirmation(confirmationResult);
      setMessage("OTP sent to your phone.");
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP. Try again.");
    }
  };

  const validateForm = () => {
    if (!otpVerified) {
      setError("Please verify your phone number.");
      return false;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      setError("Password fields cannot be empty.");
      return false;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setError("Passwords do not match.");
      return false;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password.trim())) {
      setError(
        "Password must be at least 8 characters and include uppercase, number, and special character."
      );
      return false;
    }

    return true;
  };

  const verifyOtp = async () => {
    setError("");
    try {
      await confirmation.confirm(otp);
      setOtpVerified(true);
      setMessage("Phone number verified.");
    } catch (err) {
      console.error(err);
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:8080/users/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobileno: phone.trim(),
          password: password.trim(),
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Reset failed.");
      }

      const result = await response.text();
      setMessage(result || "Password reset successfully.");
      setError("");
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Forgot Password
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Enter your phone number to reset your password
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number (+91 format)
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                placeholder="+91XXXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
              />
              <button
                type="button"
                onClick={sendOtp}
                className="bg-indigo-500 text-white px-3 py-2 rounded-lg hover:bg-indigo-600"
              >
                Send OTP
              </button>
            </div>
          </div>

          {confirmation && (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={verifyOtp}
                disabled={otpVerified}
                className={`w-full py-2 text-white rounded-md transition-colors duration-200 ${
                  otpVerified
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-500"
                }`}
              >
                {otpVerified ? "Verified" : "Verify OTP"}
              </button>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md transition"
          >
            Reset Password
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-600">
            {message}{" "}
            <a
              href="/"
              className="text-blue-500 underline hover:text-blue-800"
            >
              Login
            </a>
          </p>
        )}
      </div>

      {/* Firebase Recaptcha container */}
      <div id="recaptcha"></div>
    </div>
  );
}

export default ForgotPassword;
