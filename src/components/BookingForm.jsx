import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import MapPicker from "./Maps/MapPicker";

function BookingForm({ worker, onSubmit }) {
  const user = useSelector((state) => state.login.user);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    workDetails: "",
    address: "",
    latitude: null,
    longitude: null,
    days: 1,
    time: "",
    amount: "",
    serviceDate: "", // new field
  });

  const [timer, setTimer] = useState(120); // 2 minutes timer
  const [status, setStatus] = useState("Pending");
  const [bookingStarted, setBookingStarted] = useState(false);
  const [message,setMessage]=useState("");
  const [lMessage,setLMessage]=useState("");
  const [dmessage,setDMessage]=useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Update amount dynamically when days or worker.price changes
  useEffect(() => {
    const amount = Number(form.days) * Number(worker?.price || 0);
    setForm((prev) => ({ ...prev, amount }));
  }, [form.days, worker?.price]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setLMessage("");
    setDMessage("");
    if(form.serviceDate=== "" || form.workDetails==="" || form.time === ""){
      setMessage("fields are required.");
      return;
    }
    if(form.address=== "" && form.latitude===null){
      setLMessage("Location is required.");
      return;
    }
   

    if (Number(form.amount) <= 0) {
      setDMessage("Please enter a valid number of days.");
      return;
    }

    const bookingData = {
      ...form,
      userId: user.id,
      workerId: worker.id,
      status,
      createdAt: new Date().toISOString(),
    };

    onSubmit(bookingData);
    setBookingStarted(true);
    setTimer(120);
  };

  const handleAutomaticCancellation = () => {
    if (status === "Pending") {
      setStatus("Cancelled");
      alert(
        "Booking automatically cancelled: Worker did not accept the request in time."
      );
    }
  };

  useEffect(() => {
    let countdown;

    if (bookingStarted && status === "Pending") {
      countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            handleAutomaticCancellation();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdown) clearInterval(countdown);
    };
  }, [bookingStarted, status]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Work Details */}
        <div>
          <label className="block font-medium mb-1">Work Description</label>
          <textarea
            name="workDetails"
            value={form.workDetails}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="e.g., Need someone to paint 2 rooms..."
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium mb-1">
            Address (optional)
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter address or landmark (e.g., 123 Main St, near park)"
          />
        </div>
        {/*Location Sharing */}
        <div>
          <label className="block font-medium mb-1">
            Select Work Location on Map
          </label>
          <MapPicker
            value={
              form.latitude && form.longitude
                ? [form.latitude, form.longitude]
                : null
            }
            onChange={(latlng) =>
              setForm((prev) => ({
                ...prev,
                latitude: latlng.lat,
                longitude: latlng.lng,
              }))
            }
          />
        </div>
            {lMessage && <p className="text-sm text-red-500">{lMessage}</p>}
        {/* Service Date */}
        <div>
          <label className="block font-medium mb-1">Service Date</label>
          <input
            type="date"
            name="serviceDate"
            value={form.serviceDate}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Days */}
        <div>
          <label className="block font-medium mb-1">Number of Days</label>
          <input
            type="number"
            name="days"
            required
            min="1"
            value={form.days}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        {dmessage && <p className="text-sm text-red-500">{dmessage}</p>}
        {/* Timings */}
        <div>
          <label className="block font-medium mb-1">Time</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Amount */}
        <label className="block font-medium mb-1">Amount</label>
        <input
          type="text"
          name="amount"
          value={String(form.amount)}
          readOnly
          className="w-full border rounded p-2 bg-gray-100"
          disabled
        />
        {message && <p className="text-sm text-red-500">{message}</p>}
        {/* Timer */}
        <div className="text-sm text-gray-600">
          <p>
            Time remaining for worker to accept: {Math.floor(timer / 60)}:
            {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
          </p>
        </div>
        <div className="flex flex-row gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-gray-800 hover:bg-gray-500 transition rounded-lg shadow-sm"
          >
            Back
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-purple-600 text-white hover:bg-purple-800 transition rounded-lg shadow-sm"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
