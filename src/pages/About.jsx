import React ,{useState ,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Store/authSlice";

const About = () => {

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

  const team = [
    { name: "Nazeer", role: "Founder", img: "founder.jpg" },
    //{ name: "Armando", role: "COO", img: "https://via.placeholder.com/100" },
    //{ name: "Carlo", role: "CTO", img: "https://via.placeholder.com/100" },
    //{ name: "Jesus", role: "Lead Designer", img: "https://via.placeholder.com/100" },
    //{ name: "Valerio", role: "Software Engineer", img: "https://via.placeholder.com/100" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-6">
      <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
      <p className="mt-4 text-center max-w-2xl text-gray-600">
        Welcome to our company! We specialize in innovative solutions, providing high-quality workers for businesses India.
      </p>
      <div className="bg-yellow-400 px-6 py-2 mt-6 text-lg font-semibold rounded-md shadow-md">
        The Team
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {team.map((member, index) => (
          <div key={index} className="flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-lg">
            <img src={member.img} alt={member.name} className="w-44 h-44 rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
