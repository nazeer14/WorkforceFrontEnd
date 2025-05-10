import React, { useEffect, useState } from "react";
import WorkerCard from "./WorkerCard";
import { useDispatch, useSelector } from "react-redux";
import { setWorkers } from "../Store/WorkerSlice";

function Filter() {
  const dispatch = useDispatch();
  const reduxWorkers = useSelector((state) => state.worker.list);

  const [filters, setFilters] = useState({
    workCategory: "",
    preferedLocation: "",
    gender: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [showHome, setShowHome] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleBack = () => {
    setShowHome(true);
  };

  const handleSubmit = async () => {
    setError("");

    if (!filters.workCategory || !filters.preferedLocation || !filters.gender) {
      setError("All fields are required!");
      return;
    }

    const filterData = {
      ...filters,
      gender: filters.gender === "any" ? null : filters.gender,
    };

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/workers/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filterData),
      });

      if (response.status === 404 || response.status === 204) {
        setError("Sorry! No Workers Available.");
        dispatch(setWorkers([]));
        setShowHome(true);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch workers");
      }

      const data = await response.json();

      if (data.length === 0) {
        setError("Sorry! No Workers Available.");
        dispatch(setWorkers([]));
        setShowHome(true);
      } else {
        dispatch(setWorkers(data));
        setShowHome(false);
      }
    } catch (error) {
      console.error("Error fetching workers:", error);
      setError("An error occurred while fetching workers.");
    } finally {
      setLoading(false);
    }
  };

  // Filtered list based on search term
  const filteredWorkers = reduxWorkers.filter((worker) =>
    (worker.firstname || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-300 p-6 rounded-lg shadow-md">
      {showHome ? (
        <>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-purple-700 mb-2">
              Welcome to WorkForce!
            </h1>
            <p className="text-gray-700">
              Find reliable workers near you. Use the filters below to get
              started.
            </p>
          </div>

          {/* Filter Section */}
          <nav className="flex flex-col md:flex-row lg:flex-row gap-3 lg:gap-4 justify-center items-center">
            <select
              name="workCategory"
              onChange={handleChange}
              className="border border-purple-600 p-2 rounded-lg w-full lg:w-auto"
              value={filters.workCategory}
            >
              <option value="">--Work Type--</option>
              <option value="Construction">Construction</option>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="AC-worker">AC-Worker</option>
              <option value="Cleaner">Cleaner</option>
              <option value="Cook">Cook</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Welder">Welder</option>
              <option value="Painter">Painter</option>
            </select>

            <select
              name="preferedLocation"
              onChange={handleChange}
              className="border border-purple-600 p-2 rounded-lg w-full lg:w-auto"
              value={filters.preferedLocation}
            >
              <option value="">--Location--</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Pune">Pune</option>
            </select>

            <select
              name="gender"
              onChange={handleChange}
              className="border border-purple-600 p-2 rounded-lg w-full lg:w-auto"
              value={filters.gender}
            >
              <option value="">--Gender--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="any">Any</option>
            </select>
          </nav>

          {/* Buttons */}
          <div className="mt-4 flex flex-row-reverse justify-center items-center gap-3">
            <button
              className="text-white bg-blue-600 p-2 px-6 rounded-lg w-full sm:w-auto hover:bg-blue-700 transition"
              onClick={handleSubmit}
            >
              {loading ? "Searching..." : "Search"}
            </button>
            <button
              className=" border-2 p-2 px-6 rounded-lg w-full sm:w-auto hover:bg-gray-700 hover:text-white"
              onClick={() => {
                setFilters({
                  workCategory: "",
                  preferedLocation: "",
                  gender: "",
                });
                dispatch(setWorkers([]));
                setError("");
              }}
            >
              Reset
            </button>
          </div>
        </>
      ) : (
        <></>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {/* Back Button & Search Box */}

      {/* Workers List */}
      {reduxWorkers.length > 0 && (
        <>
          <div className="mt-3 p-2 bg-white rounded-lg shadow">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-400 p-2 rounded w-full sm:w-1/2"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2">
              {filteredWorkers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              handleBack();
              dispatch(setWorkers([]));
              setSearchTerm("");
            }}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-purple-800"
          >
            ← Back
          </button>
        </>
      )}
    </div>
  );
}

export default Filter;
