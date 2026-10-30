
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProjectBoard from "./pages/ProjectBoard";
import MainLayout from "./components/MainLayout";
import Notification from "./components/Notification";

function Placeholder({ title }) {
  return <h2>{title}</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Notifikasi tersedia di semua halaman */}
      <Notification />

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Semua halaman ini memakai sidebar yang sama */}
        <Route element={<MainLayout />}>
          <Route path="/board" element={<ProjectBoard />} />

          <Route
            path="/sprints"
            element={<Placeholder title="Sprint Management" />}
          />

          <Route
            path="/reports"
            element={<Placeholder title="Reports" />}
          />

          <Route
            path="/team"
            element={<Placeholder title="Team" />}
          />

          <Route
            path="/settings"
            element={<Placeholder title="Settings" />}
          />
        </Route>

        {/* Jika URL tidak ditemukan, kembali ke Login */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
