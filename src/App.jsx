import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./ui/Layout";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./components/NotFound";
import Forgot from "./pages/Forgot";
import Register from "./pages/Register";
import ProfileSettings from "./components/ProfileSettings";
import Careers from "./pages/Careers";
import ContactUs from "./pages/ContactUs";
import WorkerDetails from "./components/WorkerDetails";

function App() {
  const [workers, setWorkers] = useState([]);

  return (
    <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes inside Layout */}
        <Route element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/home" element={<Home setWorkers={setWorkers} />}/>
          <Route path="/profilesettings" element={<ProfileSettings/>}/>
          <Route path="/worker/:id" element={<WorkerDetails workers={workers} />} />
        </Route>        

        {/* Catch-all for unmatched routes */}
        <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
