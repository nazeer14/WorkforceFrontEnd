import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function BookingData() {
  const { id } = useParams(); // Get the booking ID from URL
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate=useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`http://localhost:8080/bookings/get/${id}`);
        if (!response.ok) {
          setMessage("Booking not found");
          setLoading(false);
          return;
        }
        const data = await response.json();
        setBooking(data);
      } catch (err) {
        setMessage("Error loading booking.");
      }
      setLoading(false);
    };

    fetchBooking();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (message) return <p>{message}</p>;

  return (
    <div className='p-4 border-1 shadow-2xl '>
      <h2 className="text-xl font-bold mb-4">Booking Details</h2>
      <p><strong>ID:</strong> {booking.id}</p>
      <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
      <p><strong>Service Date:</strong> {booking.serviceDate}</p>
      <p><strong>Amount:</strong> ₹ {booking.amount}</p>
      <p><strong>Status:</strong> {booking.status}</p>
      <p><strong>Payment:</strong> {booking.payment}</p>
      <button className='bg-gray-600 rounded-md px-2 text-white' onClick={()=>navigate(-1)}>Back</button>
    </div>
  );
}

export default BookingData;
