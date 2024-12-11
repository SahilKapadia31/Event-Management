import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import api from "../api/api"; // Axios instance
import { format } from "date-fns";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    date: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events/all");
        const fetchedEvents = response.data;
        setEvents(fetchedEvents);
        setFilteredEvents(fetchedEvents);

        const uniqueLocations = [
          ...new Set(fetchedEvents.map((event) => event.location)),
        ];
        setLocations(uniqueLocations);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    // Filter by title
    if (filters.title) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by date
    if (filters.date) {
      filtered = filtered.filter(
        (event) => format(new Date(event.date), "yyyy-MM-dd") === filters.date
      );
    }

    setFilteredEvents(filtered);
  }, [filters, events]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFilters({ ...filters, [id]: value });
  };

  const clearFilters = () => {
    setFilters({ title: "", location: "", date: "" });
  };

  if (loading) {
    return <div className="text-center text-red-500">Loading events...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-8 text-4xl font-bold text-red-600">Upcoming Events</h1>

      {/* Filter UI */}
      <div className="flex flex-wrap items-center justify-between p-4 mb-8 bg-white border rounded-lg shadow-md">
        {/* Event Title Filter */}
        <div className="flex flex-col mb-4 sm:mb-0">
          <label htmlFor="title" className="mb-1 text-sm font-medium text-red-700">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            value={filters.title}
            onChange={handleInputChange}
            placeholder="Search by event title"
            className="w-full p-2 text-gray-700 border rounded-md sm:w-auto focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Location Filter */}
        <div className="flex flex-col mb-4 sm:mb-0">
          <label htmlFor="location" className="mb-1 text-sm font-medium text-red-700">
            Location
          </label>
          <select
            id="location"
            value={filters.location}
            onChange={handleInputChange}
            className="w-full p-2 text-gray-700 border rounded-md sm:w-auto focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div className="flex flex-col mb-4 sm:mb-0">
          <label htmlFor="date" className="mb-1 text-sm font-medium text-red-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={filters.date}
            onChange={handleInputChange}
            className="w-full p-2 text-gray-700 border rounded-md sm:w-auto focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center">
          <button
            onClick={clearFilters}
            className="px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 gap-6 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              id={event._id}
              title={event.title}
              date={event.date}
              location={event.location}
              imageUrl={event.imageUrl}
            />
          ))
        ) : (
          <p className="text-center text-red-500">No events available</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;