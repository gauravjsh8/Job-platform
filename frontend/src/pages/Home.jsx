import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
            alt="Welcome"
            className="rounded-3xl shadow-2xl"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-6">
            Welcome to CareerLink
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Explore exciting job opportunities that match your passion and
            skills. We connect you with your dream job in just a few clicks.
          </p>
        </div>
      </div>

      {/* Missions Section */}
      <section>
        <h2 className="text-center text-3xl font-bold mb-8 text-indigo-600">
          Our Mission
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Provide equal opportunities for all job seekers and employers.",
            "Build a reliable and user-friendly job search platform.",
            "Support your career growth with updates and guidance.",
          ].map((text, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-indigo-100 to-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <p className="text-gray-800 text-lg">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Ready to take the next step?
        </h3>
        <p className="text-gray-600 mb-6">
          Find your dream job or post openings to hire top talent today.
        </p>
        <button
          className="px-6 py-3 bg-blue-600 text-white text-lg rounded-full hover:bg-blue-700 transition cursor-pointer"
          onClick={() => navigate("/jobs")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
