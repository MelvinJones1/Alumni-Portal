import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const AlumniChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]); // Messages received by the alumni
  const [students, setStudents] = useState([]); // List of students who sent messages
  const [selectedStudent, setSelectedStudent] = useState(null); // Selected student for chat
  const [message, setMessage] = useState(""); // Message input field
  const [socket, setSocket] = useState(null); // Socket instance

  const alumniId = sessionStorage.getItem("userId"); // Use sessionStorage instead of localStorage

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:5000", { withCredentials: true });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Fetch students who messaged the alumni
  useEffect(() => {
    const fetchStudents = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/chat/students?alumniId=${alumniId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
    console.log("Alumni ID:", alumniId);
  }, [alumniId]);

  // Fetch chat history for the selected student
  useEffect(() => {
    if (!selectedStudent) return;

    const fetchMessages = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/chat/history?receiverId=${selectedStudent._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedStudent]);

  // Listen for new messages
  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (newMessage) => {
      if (
        (newMessage.senderId === selectedStudent?._id &&
          newMessage.receiverId === alumniId) ||
        (newMessage.senderId === alumniId &&
          newMessage.receiverId === selectedStudent?._id)
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, selectedStudent, alumniId]);

  // Handle selecting a student
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  // Send message
  const sendMessage = () => {
    if (message.trim() && selectedStudent) {
      const senderId = alumniId;
      const receiverId = selectedStudent._id;

      if (!senderId || !receiverId) {
        console.error("Sender ID or Receiver ID is missing.");
        return;
      }

      const newMessage = {
        senderId,
        receiverId,
        message,
      };

      socket.emit("sendMessage", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate("/alumniLanding")}
        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors mb-8"
      >
        Go Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Chat with Students
      </h1>

      <div className="flex gap-6">
        {/* Student List */}
        <div className="w-1/3">
          {students.map((student) => (
            <div
              key={student._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all p-5 mb-4 cursor-pointer"
              onClick={() => handleStudentClick(student)}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {student.name}
              </h2>
              <p className="text-sm text-gray-600">{student.email}</p>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        {selectedStudent && (
          <div className="w-2/3 bg-white border border-gray-200 rounded-lg shadow-sm p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Chat with {selectedStudent.name}
            </h2>
            <div className="h-96 overflow-y-auto mb-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    msg.senderId === alumniId ? "text-right" : "text-left"
                  }`}
                >
                  <p
                    className={`inline-block p-2 rounded-lg ${
                      msg.senderId === alumniId
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

export default AlumniChatPage;
