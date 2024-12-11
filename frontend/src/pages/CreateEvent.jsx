import React, { useState } from "react";
import api from "../api/api"; // Assuming your axios instance is correctly configured
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxAttendees: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !eventData.title ||
      !eventData.description ||
      !eventData.date ||
      !eventData.location ||
      !eventData.maxAttendees
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    Object.keys(eventData).forEach((key) => formData.append(key, eventData[key]));
    if (image) formData.append("image", image);

    try {
      const response = await api.post("/events/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Event created successfully:", response.data);
      navigate("/my-events");
    } catch (error) {
      console.error("Error creating event:", error.response || error.message);
      setError(
        error.response?.data?.message ||
        "An error occurred while creating the event."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md px-8 py-6 mx-auto rounded-lg shadow-lg bg-red-50">
        <h2 className="mb-6 text-2xl font-bold text-center text-red-600">Create Event</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-red-700">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Enter event title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-red-700">
              Event Description
            </label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Enter event description"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-red-700">
              Event Date
            </label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-red-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Enter location"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-red-700">
              Max Attendees
            </label>
            <input
              type="number"
              name="maxAttendees"
              value={eventData.maxAttendees}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Enter max attendees"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-semibold text-red-700">
              Event Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition duration-200 bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;