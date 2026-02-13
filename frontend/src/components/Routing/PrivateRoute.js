import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContext";

// Simple private route wrapper that checks for an auth token.
// Usage: <Route element={<PrivateRoute><SomeComponent /></PrivateRoute>} />
const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  const hasToken = !!token || !!localStorage.getItem("authToken");

  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
