import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

let stompClient = null;

const BookingStatusTracker = ({ bookingId }) => {
  const [status, setStatus] = useState("Waiting for updates...");

  useEffect(() => {
    const connect = () => {
      const socket = new SockJS("http://localhost:8080/ws");
      stompClient = over(socket);
      stompClient.connect({}, () => {
        stompClient.subscribe(`/topic/bookings/${bookingId}`, (message) => {
          const update = JSON.parse(message.body);
          setStatus(update.status);
        });
      });
    };
    connect();
    return () => stompClient?.disconnect();
  }, [bookingId]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Booking Status</h2>
      <p>Status: {status}</p>
    </div>
  );
};

export default BookingStatusTracker;
