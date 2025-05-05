import React from "react";
import { useNavigate } from "react-router-dom";

function WorkerCard({ worker }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-xl shadow-lg p-1 hover:shadow-xl transition cursor-pointer"
      onClick={() => navigate(`/worker/${worker.id}`)}
    >
      <img
        src={worker.profileImage || "userpic.jpg"}
        alt={worker.firstname}
        className="w-full sm:h-30 h-full object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{worker.firstname}<span className="text-sm text-gray-700"> ({worker.workCategory})</span></h3>
      
      <div className="flex items-center gap-1 mt-1">
        <span className="text-yellow-500">⭐</span>
        <span>{worker.rating || 4.5}</span>
        <span className="text-xs text-gray-500 ml-2">
          ({worker.reviews} reviews)
        </span>
      </div>
      <p className="mt-1 text-gray-700 text-sm">
        Age: {worker.age}, Exp: {worker.experience} years
      </p>
      <p className="text-blue-600 font-bold mt-1">₹{worker.price?<span>{worker?.price}</span>:<span>0</span>} / day</p>
    </div>
  );
}

export default WorkerCard;
