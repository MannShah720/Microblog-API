import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Feed from "./pages/Feed";

// Protect pages that require authentication
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = sessionStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default route */}
        <Route
          path="/"
          element={<Navigate to="/feed" replace />}
        />

        {/* Public pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected pages */}
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />

        {/* Unknown routes */}
        <Route
          path="*"
          element={<Navigate to="/feed" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;