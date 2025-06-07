import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-10">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
          alt="Company Team"
          className="flex-1 rounded-lg shadow-md object-cover"
          style={{ height: "300px" }}
        />
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
          alt="Office"
          className="flex-1 rounded-lg shadow-md object-cover"
          style={{ height: "300px" }}
        />
      </div>

      <div className="space-y-6 text-gray-700">
        <p>
          <strong>Founded in 2020,</strong> our company has steadily grown to
          become a leader in connecting job seekers with their dream
          opportunities. We are passionate about creating an easy-to-use
          platform where candidates and employers can find the perfect match.
        </p>

        <p>
          We specialize in diverse job sectors ranging from technology and
          healthcare to education and manufacturing. Our platform offers
          thousands of listings tailored to your skills and career goals.
        </p>

        <p>
          Currently, we have a dedicated team of <strong>50+ employees</strong>{" "}
          working tirelessly to improve our services and provide personalized
          assistance to our users.
        </p>

        <p>
          Our mission is to empower individuals through meaningful employment,
          foster professional growth, and contribute positively to communities
          worldwide.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
