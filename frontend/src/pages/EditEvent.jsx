import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

const EditEvent = () => {
  const { id } = useParams(); // Get the event ID from the URL
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

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEventData(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
        setError("Error fetching event details");
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("location", eventData.location);
    formData.append("maxAttendees", eventData.maxAttendees);
    if (image) {
      formData.append("image", image);
    }

    try {
      await api.put(`/events/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Event updated successfully");
      navigate("/my-events");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError("Error updating event");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="w-full max-w-md px-8 py-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-red-600">Edit Event</h2>
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
              className="w-full px-4 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-400"
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
              className="w-full px-4 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-400"
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
              className="w-full px-4 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-400"
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
              className="w-full px-4 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-400"
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
              className="w-full px-4 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-400"
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
              className="w-full px-4 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-400"
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition duration-200 bg-red-600 rounded-md hover:bg-red-700"
          >
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;