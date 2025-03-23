import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DonationPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    // Handle the donation logic (e.g., send data to the backend or process payment)
    console.log(`Donation Amount: $${amount}`);
    alert(`Thank you for your donation of $${amount}!`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Alumni Donation Portal</h1>
        </div>
      </header>

      {/* Go Back Button */}
      <section className="py-4 px-6">
        <button
          onClick={() => navigate(-1)} // Navigates to the previous page
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Go Back
        </button>
      </section>

      {/* Hero Section */}
      <section className="text-center py-12 bg-white shadow-md">
        <h2 className="text-4xl font-bold text-gray-800">Make a Donation</h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Your generous contribution helps support student scholarships, campus
          development, and innovative initiatives. Together, we can make a
          difference!
        </p>
      </section>

      {/* Donation Form Section */}
      <section className="py-10 px-6">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleDonationSubmit}>
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Donation Amount ($)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg"
                placeholder="Enter amount"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-800 transition"
            >
              Donate Now
            </button>
          </form>
        </div>
      </section>

      {/* Alumni Contributions Section */}
      <section className="py-10 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Alumni Contributions
          </h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Dummy Alumni Contributions */}
            {[
              {
                name: "John Doe",
                batch: "2020 Batch - CSE",
                amount: "$500",
                cause: "Student Scholarships",
              },
              {
                name: "Jane Smith",
                batch: "2018 Batch - ECE",
                amount: "$300",
                cause: "Campus Development",
              },
              {
                name: "Alice Johnson",
                batch: "2019 Batch - IT",
                amount: "$200",
                cause: "Innovative Initiatives",
              },
            ].map((alum, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <p className="text-lg font-semibold text-gray-800">
                  {alum.name}
                </p>
                <p className="text-sm text-gray-600">{alum.batch}</p>
                <p className="text-xl text-blue-600 font-bold mt-2">
                  {alum.amount}
                </p>
                <p className="text-sm text-gray-500 mt-2">for {alum.cause}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
            What Our Alumni Say
          </h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {/* Dummy Testimonials */}
            {[
              {
                name: "John Doe",
                testimonial:
                  "I donated to support scholarships because I believe in giving back to the community that shaped my career.",
              },
              {
                name: "Jane Smith",
                testimonial:
                  "Contributing to campus development feels like investing in the future of our alma mater.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 italic">
                  "{testimonial.testimonial}"
                </p>
                <p className="text-sm text-gray-800 font-semibold mt-4">
                  - {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 text-center">
        <p className="text-sm">
          &copy; 2025 Alumni Connect. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default DonationPage;
