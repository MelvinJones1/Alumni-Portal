import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

const MentorshipPage = () => {
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:5000", { withCredentials: true });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Fetch alumni data
  useEffect(() => {
    const fetchAlumni = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/alumni",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setAlumni(response.data);
      } catch (error) {
        console.error("Error fetching alumni:", error);
      }
    };

    fetchAlumni();
  }, []);

  // Handle chat with a specific alumni
  const handleChatClick = (alum) => {
    setSelectedAlumni(alum);
    fetchChatHistory(alum._id);
  };

  // Fetch chat history
  const fetchChatHistory = async (receiverId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/chat/history?receiverId=${receiverId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Send message
  const sendMessage = () => {
    if (message.trim()) {
      const senderId = sessionStorage.getItem("userId");

      if (!senderId) {
        console.error("Sender ID is missing. User is not logged in.");
        alert("You must be logged in to send a message.");
        return;
      }

      const newMessage = {
        senderId,
        receiverId: selectedAlumni._id,
        message,
      };
      socket.emit("sendMessage", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (newMessage) => {
      if (
        newMessage.senderId === selectedAlumni._id ||
        newMessage.receiverId === selectedAlumni._id
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, selectedAlumni]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/studentLanding")}
        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors mb-8"
      >
        Go Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Mentorship Program
      </h1>

      <div className="flex gap-6">
        {/* Alumni List */}
        <div className="w-1/3">
          {alumni.map((alum) => (
            <div
              key={alum._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all p-5 mb-4 cursor-pointer"
              onClick={() => handleChatClick(alum)}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {alum.name}
              </h2>
              <p className="text-sm text-gray-600">{alum.currentWork}</p>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        {selectedAlumni && (
          <div className="w-2/3 bg-white border border-gray-200 rounded-lg shadow-sm p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Chat with {selectedAlumni.name}
            </h2>
            <div className="h-96 overflow-y-auto mb-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    msg.senderId === sessionStorage.getItem("userId")
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  <p
                    className={`inline-block p-2 rounded-lg ${
                      msg.senderId === sessionStorage.getItem("userId")
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full p-2 border rounded-lg"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorshipPage;
