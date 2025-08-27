// pages/booking/index.tsx

import { useState } from "react";
import axios from "axios";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    propertyId: "",
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookings`, formData);
      setSuccess(true);
      setFormData({
        propertyId: "",
        name: "",
        email: "",
        checkIn: "",
        checkOut: "",
      });
    } catch (err) {
      console.error("Booking failed:", err);
      setError("Failed to submit booking. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book a Property</h1>

      {success && <p className="text-green-600 mb-4">Booking submitted successfully!</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="propertyId"
          placeholder="Property ID"
          value={formData.propertyId}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <input
          type="date"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <input
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
}
