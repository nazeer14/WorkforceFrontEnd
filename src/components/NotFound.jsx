import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NotFound() {
const navigate=useNavigate()

const handleBack=()=>{
  navigate(-1);
}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-blue-50 to-purple-100 text-center p-6">
      {/* Floating Emoji Animation */}
      <motion.div
        className="text-6xl"
        initial={{ y: 0 }}
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        🧭
      </motion.div>

      {/* Main Content */}
      <motion.h1
        className="text-6xl font-bold text-gray-800 mt-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-xl text-gray-600 mt-4 max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Oops! The page you're looking for doesn’t exist. Maybe it got lost in the service space 🌌
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <Link
          onClick={handleBack}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition duration-300"
        >
          Go Back
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound