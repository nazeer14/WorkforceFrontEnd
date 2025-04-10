// src/components/PhoneLogin.js
import React, { useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";

const PhoneLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();

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
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmation(confirmationResult);
      setMessage("OTP sent!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      await confirmation.confirm(otp);
      setVerified(true);
      setMessage("✅ Phone verified!");

      // Redirect after 2.5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      console.error(error);
      setMessage("❌ Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">📱 Phone OTP Login</h2>

        {!verified ? (
          <>
            <input
              className="border border-gray-300 p-3 rounded-lg w-full mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="tel"
              placeholder="+1234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={sendOtp}
              className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold p-3 w-full rounded-lg mb-4"
            >
              Send OTP
            </button>

            <AnimatePresence>
              {confirmation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    className="border border-gray-300 p-3 rounded-lg w-full mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    onClick={verifyOtp}
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-600 transition text-white font-semibold p-3 w-full rounded-lg flex justify-center items-center gap-2"
                  >
                    {loading && <CgSpinner className="animate-spin" size={20} />}
                    Verify OTP
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AiOutlineCheckCircle size={64} className="text-green-500 mb-2" />
            <p className="text-lg font-semibold text-green-600">Phone Verified!</p>
            <p className="text-sm text-gray-500 mt-1">Redirecting to dashboard...</p>
          </motion.div>
        )}

        <div id="recaptcha"></div>

        {message && (
          <motion.p
            className="mt-4 text-center text-sm text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PhoneLogin;
