import React, { useState } from 'react';

function Filter() {
    const [filters, setFilters] = useState({
        category: '',
        location: '',
        gender: ''
    });
    const [error, setError] = useState('');
    const [workers, setWorkers] = useState([]);
    const [showHome, setShowHome] = useState(true); // NEW: control home data

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async () => {
        if (!filters.category || !filters.location || !filters.gender) {
            setError('All fields are required!');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/workers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filters)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch workers');
            }

            const data = await response.json();
            if (data.length === 0) {
                setError('Sorry! No Workers Available.');
                setWorkers([]);
                setShowHome(false); // hide home if search was valid but empty
            } else {
                setWorkers(data);
                setShowHome(false); // hide home after successful fetch
            }
        } catch (error) {
            console.error('Error fetching workers:', error);
            setError('An error occurred while fetching workers.');
        }
    };

    return (
        <div className="bg-gray-300 p-6 rounded-lg shadow-md">
            {/* Home Section (before filtering) */}
            {showHome && (
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-purple-700 mb-2">Welcome to WorkForce!</h1>
                    <p className="text-gray-700">
                        Find reliable workers near you. Use the filters below to get started.
                    </p>
                </div>
            )}

            {/* Filter Section */}
            <nav className="flex flex-col lg:flex-row gap-3 lg:gap-4 justify-center items-center">
                <select name="category" onChange={handleChange} className="border border-purple-600 p-2 rounded-lg w-full lg:w-auto">
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

                <select name="location" onChange={handleChange} className="border border-purple-600 p-2 rounded-lg w-full lg:w-auto">
                    <option value="">--Location--</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Pune">Pune</option>
                </select>

                <select name="gender" onChange={handleChange} className="border border-purple-600 p-2 rounded-lg w-full lg:w-auto">
                    <option value="">--Gender--</option>
                    <option value="any">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <button className="text-white bg-blue-600 p-2 rounded-lg w-full lg:w-auto transition hover:bg-blue-700" onClick={handleSubmit}>
                    Search
                </button>
            </nav>

            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

            {/* Filtered Results */}
            {workers.length > 0 && (
                <div className="mt-6 p-4 bg-white rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-3 text-center">Available Workers:</h2>
                    <ul className="divide-y divide-gray-200">
                        {workers.map((worker) => (
                            <li key={worker.id} className="py-2">
                                <strong>{worker.firstname}</strong> - {worker.category} ({worker.location})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Filter;
