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
    <div className="m-2 p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <img
        src={worker.profileImage || "userpic.jpg"}
        alt={worker.firstname}
        className="w-1/2 h-1/4 object-cover rounded-md mx-auto"
      />
      <h2 className="text-2xl font-bold mt-4">{worker?.firstname?.toUpperCase()}<span className="text-gray-800"> ({worker?.workCategory})</span></h2>
      <p className="text-xl mt-2"><strong>Name : </strong><span>{worker?.firstname?.toUpperCase()} {worker?.lastname?.toUpperCase()}</span></p>
      <p className="mt-1 text-yellow-800">{worker.rating || 4.5} ⭐</p>
      <p className="mt-1"><strong>Age: </strong>{worker?.age ||"N/A"}</p>
      <p><strong>Experience : </strong> {worker?.experience ? `${worker.experience} years` : <span>N/A</span>}</p>
      <p><strong>Location : </strong> {worker.preferedLocation}</p>
      <p className="mt-1 text-yellow-600"><strong className="text-black">Amount : </strong>₹{worker.price} / day</p>
      
      <p className="mt-1 text-gray-800">Revies: {worker.description || "No Reviews available."}</p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleBack}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Back
        </button>
        <button
          onClick={() => navigate(`/worker/booking/${worker?.id}`,{ state: { worker }})}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default WorkerDetails;
