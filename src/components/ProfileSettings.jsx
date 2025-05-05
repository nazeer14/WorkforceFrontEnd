import { useState } from "react";
import { updateProfile } from "../Store/authSlice";
import { useSelector } from "react-redux";

export default function ProfileSettings() {

  const user=useSelector((state) =>state.login.user);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: user?.id,
    fullname: user?.fullname || "",
    mobileno: user?.mobileno || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:8080/users/update?id=${user?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const result = await res.text();
      setMessage(result);
      setEditMode(false);
      dispatch(updateProfile(formData));
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="flex flex-col space-y-4 max-w-md mx-auto p-6 border rounded-2xl shadow-md bg-white">
      <div className="flex items-center space-x-4">
        <img
          src={user?.profileImage || "userpic.jpg"}
          alt="Profile"
          className="h-20 w-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800">{formData.fullname}</h2>
          <p className="text-sm text-gray-600">ID: {formData.id}</p>
        </div>
      </div>

      {editMode ? (
        <>
          <InputField
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />
          <InputField
            label="Phone"
            name="mobileno"
            value={formData.mobileno}
            onChange={handleChange}
            disabled
          />
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {message && <p className="text-green-600 font-semibold">{message}</p>}
          <div className="flex space-x-2">
            <button
              className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-400 text-white rounded px-4 py-2 hover:bg-gray-500"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <InfoField label="Full Name" value={formData.fullname} />
          <InfoField label="Phone" value={formData.mobileno} />
          <InfoField label="Email" value={formData.email} />
          <button
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
}

function InputField({ label, name, value, onChange, disabled }) {
  return (
    <div>
      <label className="font-semibold">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full border rounded-md p-2 mt-1 ${
          disabled ? "bg-gray-100 text-gray-600 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div>
      <span className="font-semibold">{label}</span>
      <p className="lg:text-lg text-sm font-semibold text-gray-600 border rounded-md p-2">
        {value?.trim() ? value : "Not provided"}
      </p>
    </div>
  );
}

