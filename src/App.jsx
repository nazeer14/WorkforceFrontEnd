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

function App() {
  return (
      <Routes>
        {/* Pages WITHOUT Header */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<SignIn />} />

        {/* Pages WITH Header (Layout) */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/booking" element={<Booking />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
