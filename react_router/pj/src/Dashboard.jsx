import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.user) {
        setUser(data.user);
      } else {
        setMsg("Access Denied or Invalid Token");
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow w-[400px] text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Dashboard</h1>

        {user ? (
          <>
            <p className="text-xl font-semibold mb-2">
              Welcome, <span className="text-green-600">{user.username}</span>
            </p>
            <p className="text-gray-700">Email: {user.email}</p>

            <p className="mt-4 text-sm text-gray-500">
              Role: <span className="font-medium">{user.role}</span>
            </p>
          </>
        ) : (
          <p className="text-red-600 font-semibold">{msg}</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
