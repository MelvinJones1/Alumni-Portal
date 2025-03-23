import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [pendingAlumni, setPendingAlumni] = useState([]);

  useEffect(() => {
    fetchPendingAlumni();
  }, []);

  const fetchPendingAlumni = async () => {
    try {
      const token = sessionStorage.getItem("token"); // Retrieve token from storage
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/auth/admin/pending-alumni",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setPendingAlumni(response.data); // ✅ Ensure state is updated
      console.log("Pending Alumni:", response.data);
    } catch (error) {
      console.error(
        "Error fetching pending alumni:",
        error.response?.data || error.message,
      );
    }
  };

  const approveAlumni = async (id) => {
    try {
      const token = sessionStorage.getItem("token"); // ✅ Ensure token is sent
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      await axios.put(
        `http://localhost:5000/api/auth/admin/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      setPendingAlumni(pendingAlumni.filter((alumni) => alumni._id !== id)); // ✅ Remove approved alumni from the list
      alert("Alumni approved!");
    } catch (error) {
      console.error(
        "Error approving alumni:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Pending Alumni Approvals
      </h1>
      {pendingAlumni.length === 0 ? (
        <p className="text-gray-600">No pending alumni requests.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ul>
            {pendingAlumni.map((alumni) => (
              <li
                key={alumni._id}
                className="flex justify-between items-center p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {alumni.name}
                  </p>
                  <p className="text-sm text-gray-500">{alumni.email}</p>
                </div>
                <button
                  onClick={() => approveAlumni(alumni._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Approve
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
