import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setBookings } from '../Store/bookingsSlice';

function BookingsHistory() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const navigate = useNavigate();
  const [booking, setBooking] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error,setError]=useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/bookings/getuh?userId=${user.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const data = await response.json();
        if (data.length === 0) {
          setMessage("No Bookings Available!!");
          setBooking([]);
        } else {
          setBooking(data);
          dispatch(setBookings(data));
        }
      } catch (error) {
        console.error(error);
        setError("Error fetching bookings.");
      }      
      setLoading(false);
    }
    fetchBookings();
  }, [user.id]);
  const filteredBookings = booking.filter((booking) => {
    const term = searchTerm.toLowerCase();
    return (
      (booking.serviceDate || "").toLowerCase().includes(term) ||
      String(booking.id || "").includes(term) ||
      String(booking.amount || "").includes(term) ||
      (booking.status || "").toLowerCase().includes(term)
    );
  });
  

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <input
              type="text"
              placeholder="Search by ID, Date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-400 p-2 rounded w-full sm:w-1/2"
            />
          </div>
      {filteredBookings.length > 0 ? (
        <div className="flex flex-col">      
          <div className="overflow-x-auto">
            <table className="min-w-full border shadow">
              <thead className="bg-gray-600 text-white">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Booking Date</th>
                  <th className="p-2">Service Date</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Payment</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-100 cursor-pointer "
                    onClick={() => navigate(`/booking/${booking?.id}`)}
                  >
                    <td className="p-2 text-center">{booking?.id}</td>
                    <td className="p-2 text-center">{booking?.bookingDate}</td>
                    <td className="p-2 text-center">{booking?.serviceDate}</td>
                    <td className="p-2 text-center">₹ {booking?.amount}</td>
                    <td className="p-2 text-center">{booking?.payment}</td>
                    <td className="p-2 text-center">{booking?.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ):(<p className='text-xl'>No Bookings Available</p>)}

      {message && <p className="text-2xl text-center mt-4">{message}</p>}
      {error&& <p className='text-xl text-red-500 mt-5'>{error}</p>}
    </div>
  );
}

export default BookingsHistory;
