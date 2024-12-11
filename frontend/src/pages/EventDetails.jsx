import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineClock,
} from "react-icons/hi";
import api from "../api/api";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [userHasRSVPd, setUserHasRSVPd] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
        setUserHasRSVPd(response.data.attendees.includes("your_user_id"));
        setLoading(false);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Error fetching event details");
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleRSVP = async () => {
    try {
      const response = await api.post(`/events/${id}/rsvp`);
      setEvent(response.data.event);
      setUserHasRSVPd(true);
      setRsvpStatus("Event Enrolled Successfully...!");
    } catch (error) {
      console.error("RSVP failed:", error.response?.data || error.message);
      setRsvpStatus(
        error.response?.data?.message || "Error RSVPing to the event."
      );
    }
  };

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!event) return <p>No event details found.</p>;

  const formattedDate = new Date(event.date).toLocaleDateString();
  const formattedTime = new Date(event.date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col gap-8 lg:flex-row">
        {event.imageUrl && (
          <div className="lg:w-1/2">
            <img
              src={`https://swiftrut-task-4.onrender.com/${event.imageUrl}`}
              alt={event.title}
              className="object-cover w-full h-64 rounded-lg shadow-md lg:h-80"
            />
          </div>
        )}

        <div className="lg:w-1/2">
          <div className="mb-6">
            <h2 className="mb-4 text-4xl font-bold text-red-600">
              {event.title}
            </h2>
            <div className="flex items-center gap-4 text-gray-700">
              <HiOutlineCalendar className="w-6 h-6 text-red-500" />
              <span>{formattedDate}</span>
              <HiOutlineClock className="w-6 h-6 text-red-500" />
              <span>{formattedTime}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 text-gray-700">
              <HiOutlineLocationMarker className="w-6 h-6 text-red-500" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-xl font-semibold text-red-600">
              About this event
            </h3>
            <p className="text-gray-700">{event.description}</p>
          </div>

          <div>
            {!userHasRSVPd && event.attendees.length < event.maxAttendees ? (
              <button
                className="w-full px-6 py-3 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 lg:w-auto"
                onClick={handleRSVP}
              >
                Reserve a spot
              </button>
            ) : (
              <p className="text-gray-700">
                {userHasRSVPd
                  ? "You have already booked this event."
                  : "This event is fully booked."}
              </p>
            )}

            {rsvpStatus && <p className="mt-4 text-green-500">{rsvpStatus}</p>}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-2 text-xl font-semibold text-red-600">
          Event Details
        </h3>
        <div className="flex items-center gap-4 text-gray-700">
          <HiOutlineClock className="w-6 h-6 text-red-500" />
          <p>
            {formattedTime} | {event.maxAttendees} total seats
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;