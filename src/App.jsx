import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./ui/Layout";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Booking from "./components/Booking";
import Workers from "./components/Workers";
import About from "./pages/About";
import NotFound from "./components/NotFound";
import Forgot from "./pages/Forgot";
import Register from "./pages/Register";
import ProfileSettings from "./components/ProfileSettings";
import Careers from "./pages/Careers";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers/>}/>
          <Route path="/contact-us" element={<ContactUs/>}/>
          {/* Nested routes under /home */}

          <Route path="/home" element={<Home />}>
            <Route path="profilesetting" element={<ProfileSettings />} />
            <Route path="workers" element={<Workers />} />
            <Route path="booking" element={<Booking />} />

          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
