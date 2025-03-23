import React from "react";
import illustration from "../assets/friends.svg";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-4 px-6 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold tracking-wider">AlumniConnect</h1>
        <nav>
          <ul className="flex space-x-4">
            {["Home", "Features", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="transition-colors duration-300 hover:text-blue-200 cursor-pointer"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-r from-blue-50 to-blue-100 py-20 px-6 flex flex-col md:flex-row items-center justify-between gap-10 min-h-screen"
      >
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-gray-800 leading-tight">
            Connecting Alumni with Students for a Better Tomorrow
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Join our platform to network, share opportunities, and build lasting
            relationships that empower careers and communities.
          </p>
          <div className="flex space-x-4">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer shadow-lg hover:shadow-xl"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer shadow-lg hover:shadow-xl"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
        <div className="md:w-1/2 max-w-md">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={illustration}
              alt="Networking"
              className="rounded-lg shadow-xl object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Networking",
              description:
                "Connect with alumni and students to grow your professional network.",
              icon: "🤝",
            },
            {
              title: "Job Opportunities",
              description:
                "Discover and share exclusive job openings from our alumni community.",
              icon: "💼",
            },
            {
              title: "Mentorship Program",
              description:
                "Get personalized 1:1 guidance from experienced professionals in your field.",
              icon: "🧭",
            },
            {
              title: "Interview Preparation",
              description:
                "Access mock interviews, practice sessions, and expert coaching from alumni.",
              icon: "💻",
            },
            {
              title: "Resume Review",
              description:
                "Get professional feedback and suggestions to enhance your resume.",
              icon: "📄",
            },
            {
              title: "Mentor Chat",
              description:
                "Direct messaging with industry mentors for real-time career advice.",
              icon: "💬",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-lg shadow-sm text-center hover:shadow-md transition-all group transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-8 px-6 text-center"
      >
        <p>
          Contact us at{" "}
          <a
            href="mailto:alumni@example.com"
            className="hover:text-blue-200 transition-colors"
          >
            alumni@example.com
          </a>
        </p>
        <p className="mt-2">
          &copy; {new Date().getUTCFullYear()} AlumniConnect. All Rights
          Reserved.
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          {["LinkedIn", "Twitter", "Instagram"].map((platform) => (
            <a
              key={platform}
              href="#"
              className="hover:text-blue-200 transition-colors"
            >
              {platform}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
