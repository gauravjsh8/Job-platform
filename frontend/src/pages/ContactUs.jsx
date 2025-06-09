import axios from "axios";
import React, { useState } from "react";

const ContactPage = () => {
  const [message, setMessage] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/messages/send-message",
        message,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setMessage({ fullname: "", email: "", phoneNumber: "", message: "" });
      alert("Message sent successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="  max-h-screen flex items-center mt-6 ">
      <div className="w-lg max-w-100 mx-auto p-6 bg-white shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label htmlFor="fullname" className="block mb-2 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={message.fullname}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={message.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block mb-2 font-semibold">
              Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={message.phoneNumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 font-semibold">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              value={message.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="text-center">
            {" "}
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 cursor-pointer mx-auto"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
