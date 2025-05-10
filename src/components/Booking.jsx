import React from 'react';
import BookingForm from './BookingForm';
import { useNavigate, useLocation } from 'react-router-dom';

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const worker = location.state?.worker;

  const handleBookingSubmit = async (data) => {
    const payload = {
      workDetails: data.workDetails,
      address: data.address,
      latitude: data.latitude,       // <-- Add this
      longitude: data.longitude,     // <-- And this
      days: parseInt(data.days),
      amount: parseFloat(data.amount),
      serviceDate: new Date(`2025-05-10T${data.time}`),
      status: "Pending",
      payment: "PENDING",
      userid: data.userId,
      workerid: data.workerId,
    };
    

    try {
      console.log(payload);
      const res = await fetch("http://localhost:8080/bookings/entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Booking request sent successfully!");
        const data=await res.json();
        alert(data?.message);
        navigate(`/booking/${data?.bookingId}`);
      } else {
        alert("Booking failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (!worker) return <p className="p-4 text-red-500">Worker data missing.</p>;

  return (
    <div>
      <BookingForm worker={worker} onSubmit={handleBookingSubmit} />
    </div>
  );
}

export default Booking;
