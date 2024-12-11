import React from "react";
import { useNavigate } from "react-router-dom";
import { HiCalendar, HiUserGroup, HiBadgeCheck } from "react-icons/hi"; // React Icons

// Base URL for the backend
const BASE_URL = "https://swiftrut-task-4.onrender.com"; // Ensure this matches your backend's URL

const EventCard = ({
  id,
  title,
  date,
  location,
  imageUrl,
  attendeesCount,
  isFree,
}) => {
  const navigate = useNavigate();
  const fullImageUrl = `${BASE_URL}${imageUrl}`;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleViewDetails = () => {
    if (id) {
      navigate(`/event/${id}`);
    } else {
      console.error("Event ID is undefined. Check if the ID is passed correctly.");
    }
  };

  return (
    <div className="p-4 transition-shadow duration-300 ease-in-out bg-white border border-red-300 rounded-lg shadow-md hover:shadow-lg">
      {imageUrl && (
        <img
          src={fullImageUrl}
          alt={title}
          className="object-cover w-full h-40 mb-4 rounded-t-lg"
        />
      )}
      <div className="p-2">
        <h2 className="mb-2 text-lg font-bold text-red-700 truncate">{title}</h2>
        <p className="mb-4 text-sm text-red-500">
          Hosted by: <span className="font-medium">Chennai Tisax Automotive Cybersecurity Meetup Group</span>
        </p>

        <div className="flex items-center mb-4 text-sm text-red-600">
          <HiCalendar className="mr-2 text-red-500" />
          <p>
            {formattedDate} - {location}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-red-600">
          <div className="flex items-center">
            <HiUserGroup className="mr-1" />
            <p>{attendeesCount} going</p>
          </div>
          <div className="flex items-center">
            <HiBadgeCheck className={`mr-1 ${isFree ? "text-green-500" : "text-red-500"}`} />
            <p>{isFree ? "Free" : "Paid"}</p>
          </div>
        </div>

        <button
          className="w-full py-2 mt-4 text-white transition-colors duration-300 bg-red-500 rounded-md hover:bg-red-600"
          onClick={handleViewDetails}
        >
          See More About Event
        </button>
      </div>
    </div>
  );
};

export default EventCard;
