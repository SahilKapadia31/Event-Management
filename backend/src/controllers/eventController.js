const Event = require("../models/eventModel");
const path = require("path");

// Helper function to check authorization
const checkAuthorization = (event, userId) => {
  if (event.createdBy.toString() !== userId.toString()) {
    throw new Error("You are not authorized to perform this action");
  }
};

// Create a new event
const createEvent = async (req, res) => {
  const { title, description, date, location, maxAttendees } = req.body;

  if (!title || !description || !date || !location || !maxAttendees) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const event = await Event.create({
      title,
      description,
      date,
      location,
      maxAttendees,
      imageUrl,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error while creating the event", error: error.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "username email")
      .populate("attendees", "username");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching events", error: error.message });
  }
};

// Get events created by the logged-in user
const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user._id }).populate("attendees", "username email");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching your events", error: error.message });
  }
};

// Get a specific event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("createdBy", "username email")
      .populate("attendees", "username");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching the event", error: error.message });
  }
};

// Update/Edit an event
const updateEvent = async (req, res) => {
  const { title, description, date, location, maxAttendees } = req.body;

  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    checkAuthorization(event, req.user._id);

    // Update event fields
    Object.assign(event, {
      title: title || event.title,
      description: description || event.description,
      date: date || event.date,
      location: location || event.location,
      maxAttendees: maxAttendees || event.maxAttendees,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : event.imageUrl,
    });

    const updatedEvent = await event.save();
    res.status(200).json(updatedEvent);
  } catch (error) {
    const status = error.message.includes("authorized") ? 403 : 500;
    res.status(status).json({ message: error.message, error: error.message });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    checkAuthorization(event, req.user._id);

    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    const status = error.message.includes("authorized") ? 403 : 500;
    res.status(status).json({ message: error.message, error: error.message });
  }
};

// RSVP to an event
const rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.attendees.includes(req.user._id)) {
      return res.status(400).json({ message: "You have already RSVP'd to this event." });
    }

    if (event.attendees.length >= event.maxAttendees) {
      return res.status(400).json({ message: "This event is fully booked." });
    }

    event.attendees.push(req.user._id);
    await event.save();

    res.status(200).json({ message: "RSVP successful", event });
  } catch (error) {
    res.status(500).json({ message: "Server error while RSVPing to the event", error: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getMyEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  rsvpEvent,
};
