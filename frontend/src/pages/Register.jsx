import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, email, password } = formData;
      await register(username, email, password);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {/* Title */}
        <h1 className="mb-6 text-2xl font-bold text-center text-red-700">Register</h1>

        {/* Error Message */}
        {errorMessage && (
          <p className="mb-4 font-medium text-center text-red-600">{errorMessage}</p>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 font-semibold text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Register
          </button>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <span className="text-gray-600">Already have an account?</span>{" "}
          <Link
            to="/login"
            className="font-semibold text-red-600 hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;