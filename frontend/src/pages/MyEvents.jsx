import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import api from "../api/api";

const BASE_URL = "https://swiftrut-task-4.onrender.com";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await api.get("/events/my-events");
        setEvents(response.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Error fetching events");
      } finally {
        setLoading(false);
      }
    };
    fetchMyEvents();
  }, []);

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/events/${eventId}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
      alert("Event deleted successfully");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to delete event");
    }
  };

  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="container py-8 mx-auto">
      <h2 className="mb-8 text-4xl font-bold text-red-700">My Events</h2>
      {events.length === 0 ? (
        <p className="text-gray-700">You have not created any events yet.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <li
              key={event._id}
              className="transition-shadow duration-300 ease-in-out bg-white border border-red-200 rounded-lg shadow-lg hover:shadow-xl"
            >
              {event.imageUrl && (
                <img
                  src={`${BASE_URL}${event.imageUrl}`}
                  alt={event.title}
                  className="object-cover w-full h-48 rounded-t-lg"
                />
              )}

              <div className="p-6">
                <h2 className="mb-2 text-2xl font-semibold text-red-800">
                  {event.title}
                </h2>

                <p className="mb-2 text-gray-700">
                  <span className="font-medium text-red-600">Date: </span>
                  {new Date(event.date).toLocaleDateString()}
                </p>

                <p className="mb-4 text-gray-700">
                  <span className="font-medium text-red-600">Location: </span>
                  {event.location}
                </p>

                <p className="mb-4 font-semibold text-red-700">Enrolled Users:</p>
                {event.attendees.length > 0 ? (
                  <ul className="text-gray-700 list-disc list-inside">
                    {event.attendees.map((attendee) => (
                      <li key={attendee._id}>{attendee.username}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No users have RSVPed yet.</p>
                )}

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => handleEdit(event._id)}
                    className="flex items-center justify-center px-4 py-2 text-red-600 transition-transform transform border border-red-600 rounded-md hover:bg-red-600 hover:text-white active:scale-95"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="flex items-center justify-center px-4 py-2 text-red-600 transition-transform transform border border-red-600 rounded-md hover:bg-red-600 hover:text-white active:scale-95"
                  >
                    <FaTrashAlt className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyEvents;