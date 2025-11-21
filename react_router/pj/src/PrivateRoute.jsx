import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Agar token nahi mila → Login page par bhej do
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Agar token mila → Page dikhao
  return children;
};

export default PrivateRoute;
