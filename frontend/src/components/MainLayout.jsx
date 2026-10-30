
import { useState } from "react";

import {
  Outlet,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  LayoutGrid,
  CalendarDays,
  ChartNoAxesColumn,
  Users,
  Settings,
  Search,
  Menu,
  ChevronDown,
  ChevronUp,
  LogOut,
  UserRound,
} from "lucide-react";

import toast from 'react-hot-toast';

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

  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
          <div className="profile-dropdown-wrapper">

            {/* Menu yang muncul saat profil diklik */}
            {showProfileMenu && (
              <div className="profile-dropdown">
                <button
                  type="button"
                  className="profile-dropdown-item"
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/settings');
                  }}
                >
                  <UserRound size={17} />
                  <span>Profil Saya</span>
                </button>

                <div className="profile-dropdown-divider" />

                
                <button
                  type="button"
                  className="profile-dropdown-item logout-item"
                  onClick={() => {
                    // Menutup dropdown profil
                    setShowProfileMenu(false);

                    // Kembali ke halaman login
                    navigate('/login', { replace: true });

                    // Menampilkan notifikasi logout berhasil
                    toast.success('Logout berhasil! Kamu telah keluar dari ProjectHub.');
                  }}
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </div>
            )}

            {/* Tombol profil pengguna */}
            <button
              type="button"
              className="user-profile"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              aria-expanded={showProfileMenu}
            >
              <div className="profile-avatar">A</div>

              <div className="profile-info">
                <strong>Admin</strong>
                <small>Project Member</small>
              </div>

              {showProfileMenu ? (
                <ChevronUp size={17} />
              ) : (
                <ChevronDown size={17} />
              )}
            </button>

          </div>
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
