import React from "react";
import { FaBriefcase, FaUsers, FaGlobeAmericas } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-50 via-white to-purple-50 min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-xl space-y-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-700">
          About Us
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
            alt="Company Team"
            className="flex-1 rounded-lg shadow-lg object-cover transition-transform hover:scale-105 duration-300"
            style={{ height: "300px" }}
          />
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
            alt="Office"
            className="flex-1 rounded-lg shadow-lg object-cover transition-transform hover:scale-105 duration-300"
            style={{ height: "300px" }}
          />
        </div>

        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <p>
            <strong className="text-indigo-700">Founded in 2020,</strong> our
            company has steadily grown into a leading platform that connects job
            seekers with their dream careers.
          </p>

          <p>
            We are passionate about simplifying the hiring process—offering a
            smart, intuitive interface for both candidates and employers to
            connect effectively.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-6 text-center">
            <div className="p-4 bg-indigo-50 rounded-lg shadow">
              <FaBriefcase className="mx-auto text-3xl text-indigo-600 mb-2" />
              <p>
                Serving multiple industries including tech, healthcare,
                education, and manufacturing.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg shadow">
              <FaUsers className="mx-auto text-3xl text-purple-600 mb-2" />
              <p>
                <strong>50+ team members</strong> dedicated to enhancing your
                experience and support.
              </p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg shadow">
              <FaGlobeAmericas className="mx-auto text-3xl text-pink-600 mb-2" />
              <p>
                Connecting people and opportunities across the globe for a
                brighter future.
              </p>
            </div>
          </div>

          <p>
            Our mission is to{" "}
            <span className="text-indigo-700 font-semibold">
              empower individuals
            </span>{" "}
            through meaningful employment, foster professional growth, and
            uplift communities worldwide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
