
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  CalendarDays,
  ChartNoAxesColumn,
  Users,
  Settings,
  Search,
  Menu,
  ChevronDown,
  LogOut,
} from "lucide-react";

import "../styles/MainLayout.css";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Header hanya ditampilkan pada halaman Project Board
  const isProjectBoard = location.pathname === "/board";

  const menus = [
    {
      name: "Project Board",
      description: "Project Management",
      path: "/board",
      icon: LayoutGrid,
    },
    {
      name: "Sprint Management",
      description: "Manage sprints",
      path: "/sprints",
      icon: CalendarDays,
    },
    {
      name: "Reports",
      description: "Analytics & insights",
      path: "/reports",
      icon: ChartNoAxesColumn,
    },
    {
      name: "Team",
      description: "Manage team members",
      path: "/team",
      icon: Users,
    },
    {
      name: "Settings",
      description: "Project settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    // Sementara kembali ke Login
    navigate("/login");
  };

  return (
    <div className="main-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        {/* Logo */}
        <div className="sidebar-brand">
          <div className="brand-icon">
            <Menu size={22} />
          </div>

          <div>
            <h2>ProjectHub</h2>
            <p>Project Management</p>
          </div>
        </div>

        {/* Menu Navigasi */}
        <nav className="sidebar-menu">
          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `menu-item ${isActive ? "active" : ""}`
                }
              >
                <Icon size={19} />

                <div className="menu-text">
                  <span>{item.name}</span>
                  <small>{item.description}</small>
                </div>
              </NavLink>
            );
          })}
        </nav>

        {/* Profil dan Logout */}
        <div className="sidebar-bottom">
          <button className="user-profile" type="button">
            <div className="profile-avatar">N</div>

            <div className="profile-info">
              <strong>Nama</strong>
              <small>Posisi</small>
            </div>

            <ChevronDown size={16} />
          </button>

          <button
            className="logout-button"
            type="button"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <div className="main-area">

        {/* Header khusus Project Board */}
        {isProjectBoard && (
          <header className="topbar">
            <div className="welcome-text">
              <h2>Hello, Nama!</h2>
              <p>
                Manage your projects and track progress
              </p>
            </div>

            <div className="topbar-actions">
              <div className="search-box">
                <Search size={17} />
                <input
                  type="text"
                  placeholder="Search"
                />
              </div>

              <div className="header-avatar">N</div>
            </div>
          </header>
        )}

        {/* Isi halaman berubah sesuai menu */}
        <main
          className={`page-content ${
            isProjectBoard ? "with-header" : "without-header"
          }`}
        >
          <Outlet />
        </main>

      </div>
    </div>
  );
}
