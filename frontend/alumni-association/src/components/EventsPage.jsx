import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation

const EventsPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Dummy event data
  const events = [
    {
      title: "Career Development Workshop",
      description:
        "Join us for a workshop on career growth, resume building, and interview preparation.",
      date: "2025-02-10",
      location: "Online",
    },
    {
      title: "Networking Meetup",
      description:
        "Meet industry professionals and alumni to grow your network.",
      date: "2025-02-15",
      location: "College Campus",
    },
    {
      title: "Tech Talk: AI in Industry",
      description:
        "A tech talk on the role of AI in various industries, with insights from experts.",
      date: "2025-02-20",
      location: "San Francisco, CA",
    },
    {
      title: "Startup Pitch Night",
      description:
        "Pitch your startup ideas to potential investors and get feedback from mentors.",
      date: "2025-02-25",
      location: "Austin, TX",
    },
    {
      title: "Hackathon 2025",
      description:
        "Participate in our 48-hour hackathon and showcase your coding skills to win prizes.",
      date: "2025-03-01",
      location: "New York City, NY",
    },
    {
      title: "Web Development Bootcamp",
      description:
        "An intensive bootcamp to learn the latest web technologies, including React and Tailwind.",
      date: "2025-03-05",
      location: "Online",
    },
    {
      title: "Data Science Workshop",
      description:
        "Dive into data science and machine learning with hands-on projects.",
      date: "2025-03-10",
      location: "Seattle, WA",
    },
    {
      title: "Entrepreneurship Panel",
      description:
        "Listen to successful entrepreneurs share their journeys and advice.",
      date: "2025-03-15",
      location: "Boston, MA",
    },
    {
      title: "Blockchain Basics Seminar",
      description:
        "Learn the fundamentals of blockchain and its applications in different fields.",
      date: "2025-03-20",
      location: "Online",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Events</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:underline">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/logout" className="hover:underline">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Go Back Button */}
      <section className="py-4 px-6">
        <button
          onClick={() => navigate("/studentLanding")} // Navigate back to StudentLandingPage
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Go Back
        </button>
      </section>

      {/* Events List */}
      <section className=" px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Upcoming Events
        </h2>
        {/* Use grid layout for side-by-side display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {event.title}
              </h3>
              <p className="text-gray-600">{event.date}</p>
              <p className="text-gray-500 mt-2">{event.description}</p>
              <p className="text-gray-400 mt-2">{event.location}</p>
              <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                Join Now
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
