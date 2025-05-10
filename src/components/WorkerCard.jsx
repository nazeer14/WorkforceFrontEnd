import React from "react";
import { useNavigate } from "react-router-dom";

function WorkerCard({ worker }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-md shadow-lg p-1 hover:shadow-lg hover:bg-gray-200 transition cursor-pointer border"
      onClick={() => navigate(`/worker/${worker.id}`)}
    >
      <img
        src={worker.profileImage || "userpic.jpg"}
        alt={worker.firstname}
        className="w-full h-auto object-cover rounded-md mx-auto"
      />
      <h3 className="text-lg font-bold mt-1">{worker?.firstname?.toUpperCase()}<span className="text-sm text-gray-800"> ({worker.workCategory})</span></h3>
      
      <div className="flex items-center gap-1">
        <strong>Rating : </strong><span>{worker.rating || 4.5}</span>
        <span className="text-yellow-500">⭐</span>
      </div>
      <p className="mt-0.5 text-gray-800 text-md font-bold">
        <strong>Exp: </strong> {worker.experience || "NaN"} years
      </p>
      <p className="text-orange-400 font-bold mt-1"><strong className="text-gray-800">Price : </strong>₹{worker.price?<span>{worker?.price}</span>:<span>0</span>} / day</p>
    </div>
  );
}

export default WorkerCard;
