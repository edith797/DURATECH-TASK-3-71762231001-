import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "../styles/Sidebar.css";
import {
  FaBook,
  FaUser,
  FaHome,
  FaClipboardList,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

export default function Sidebar() {
  const { user, setUser, enrolledCourses } = useContext(AppContext);
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login");
  };

  const assessmentLink =
    enrolledCourses.length > 0 ? `/assessments/${enrolledCourses[0]}` : "/assessments";

  const handleNavClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && (
        <button
          className="toggle-btn"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
      )}

      <aside className={`sidebar ${sidebarOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-icon">📚</div>
          <h1 className="logo-text">Edu-Learn</h1>
        </div>

        <div className="user-info">
          <div className="user-icon">{user?.email?.charAt(0).toUpperCase()}</div>
          <div className="user-details">
            <p>{user?.displayName || user?.email}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            onClick={handleNavClick}
          >
            <FaHome /> Dashboard
          </NavLink>

          <NavLink
            to="/courses"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            onClick={handleNavClick}
          >
            <FaBook /> Courses
          </NavLink>

          <NavLink
            to="/my-courses"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            onClick={handleNavClick}
          >
            <FaClipboardList /> My Courses
          </NavLink>

          <NavLink
            to={assessmentLink}
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            onClick={handleNavClick}
          >
            <FaUser /> Assessments
          </NavLink>

          <button onClick={handleLogout} className="nav-link logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
