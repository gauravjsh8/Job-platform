import React from "react";

const HomePage = () => {
  return (
    <div className="max-w-6xl mx-auto p-12 space-y-16">
      <div className="flex flex-row items-center gap-8">
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
            alt="Welcome"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div className="flex-[2]">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Website!</h1>
          <p className="text-lg text-gray-700">
            Here you can explore and apply to various job opportunities that
            suit your skills and ambitions. We strive to connect talented people
            with their dream jobs easily and quickly.
          </p>
        </div>
      </div>
      <h1 className="text-center font-extrabold my-8">OUR MISSIONS</h1>
      <div className="flex flex-row justify-between gap-8">
        <div className="flex-1 bg-indigo-50 p-6 rounded-lg shadow-md">
          <p className="text-gray-700">
            Provide equal opportunities for all job seekers and employers.
          </p>
        </div>

        <div className="flex-1 bg-indigo-50 p-6 rounded-lg shadow-md">
          <p className="text-gray-700">
            Build a reliable and easy-to-use platform for job applications.
          </p>
        </div>

        <div className="flex-1 bg-indigo-50 p-6 rounded-lg shadow-md">
          <p className="text-gray-700">
            Support career growth through timely job notifications and guidance.
          </p>
        </div>
      </div>

      <h1 className="text-center font-bold text-blue-600">
        Start your job search today
      </h1>
    </div>
  );
};

export default HomePage;
