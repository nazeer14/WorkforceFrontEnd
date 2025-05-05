import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function WorkerDetails({ workers }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  // Try to find the worker in props first
  useEffect(() => {
    const found = workers.find((w) => w.id === parseInt(id));
    if (found) {
      setWorker(found);
      setLoading(false);
    } else {
      // Fallback: fetch from API
      fetch(`http://localhost:8080/workers/getworker?id=${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Worker not found");
          return res.json();
        })
        .then((data) => {
          setWorker(data);
        })
        .catch((err) => {
          console.error(err);
          setWorker(null);
        })
        .finally(() => setLoading(false));
    }
  }, [id, workers]);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/home"); // fallback route
    }
  };
  

  if (loading) return <p className="p-4">Loading...</p>;
  if (!worker) return <p className="p-4 text-red-500">Worker not found</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <img
        src={worker.profileImage || "userpic.jpg"}
        
        alt={worker.firstname}
        className="w-full h-full object-cover rounded-md"
      />
      <h2 className="text-2xl font-bold mt-4">{worker?.firstname}</h2>
      <p className="text-gray-700">{worker?.workCategory}</p>
      <p className="mt-2">Age: {worker?.age}</p>
      <p>Experience: {worker?.experience ? `${worker.experience} years` : <span>N/A</span>}</p>
      <p>Location: {worker.preferedLocation}</p>
      <p>Amount: ₹{worker.price} / day</p>
      <p className="mt-2 text-yellow-600">⭐ {worker.rating || 4.5} stars</p>
      <p className="mt-2 text-gray-600">Description: {worker.description || "No bio available."}</p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleBack}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Back
        </button>
        <button
          onClick={() => alert("Booking requested!")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default WorkerDetails;
