import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Filter from "../components/Filter";
import { login } from "../Store/authSlice"; // Import login action

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        dispatch(login({ user: storedUser })); // Restore user from localStorage
      } else {
        navigate("/login"); // Redirect if no user is found
      }
    }
    setLoading(false);
  }, [user, navigate, dispatch]);

  if (loading || !user) return null; // Prevent flickering

  return (
    <>
      <Filter />
    </>
  );
}

export default Home;
