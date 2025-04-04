import React, { useState } from 'react';

function Filter() {
    const [filters, setFilters] = useState({
        category: '',
        location: '',
        timing: '',
        gender: ''
    });
    const [error, setError] = useState('');
    const [workers, setWorkers] = useState([]);

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async () => {
        if (!filters.category || !filters.location || !filters.timing || !filters.gender) {
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
            } else {
                setWorkers(data);
            }
        } catch (error) {
            console.error('Error fetching workers:', error);
            setError('An error occurred while fetching workers.');
        }
    };

    return (
        <div className="bg-gray-300 p-4 rounded-lg shadow-md">
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

                <select name="timing" onChange={handleChange} className="border border-purple-600 p-2 rounded-lg w-full lg:w-auto">
                    <option value="">-- Time --</option>
                    <option value="full">Full Day</option>
                    <option value="half">Half Day</option>
                    <option value="hour">Per Hour</option>
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

            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

            {workers.length > 0 && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Available Workers:</h2>
                    <ul>
                        {workers.map((worker) => (
                            <li key={worker.id} className="border-b p-2">
                                {worker.name} - {worker.category} ({worker.location})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Filter;
