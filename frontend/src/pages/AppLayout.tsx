import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import "@/assets/AppLayout.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AdminLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 768);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { logout } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 35);
    };

    const handleResize = () => {
      setIsTablet(window.innerWidth < 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container-fluid d-flex p-0">
      {/* Sidebar Toggle Button */}
      <button
        className="btn btn-primary position-fixed top-0 start-0 m-2 d-md-none"
        onClick={() => setShowOffcanvas(true)}
        style={{ zIndex: 1045 }}
      >
        <i className="bi bi-list"></i>
      </button>

      {/* Sidebar (Collapsible) */}
      <nav
        className={`nav flex-column p-3 vh-100 position-fixed d-none d-md-flex ${isSidebarCollapsed ? "collapsed" : ""}`}
        style={{
          width: isSidebarCollapsed ? "60px" : "180px",
          transition: "width 0.3s ease",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="fw-bold text-center">
            {!isSidebarCollapsed && "AssetGear"}
          </div>
          <button
            className="btn btn-sm"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <i
              className={`bi ${isSidebarCollapsed ? "bi-chevron-right" : "bi-chevron-left"}`}
            ></i>
          </button>
        </div>
        <li className="nav-item">
          <Link className="nav-link active" to="/app/dashboard">
            <i className="bi bi-house-door"></i>{" "}
            {!isSidebarCollapsed && "Dashboard"}
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="bi bi-house-door"></i>{" "}
            {!isSidebarCollapsed && "Dashboard"}
          </a>
        </li>
        <li className="nav-item mt-auto">
          <a className="nav-link text-danger" href="#" onClick={logout}>
            <i className="bi bi-box-arrow-right"></i>{" "}
            {!isSidebarCollapsed && "Logout"}
          </a>
        </li>
      </nav>

      <div
        className={`offcanvas offcanvas-start ${showOffcanvas ? "show" : ""}`}
        tabIndex={-1}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">AssetGear</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowOffcanvas(false)}
          ></button>
        </div>
        <div className="offcanvas-body">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Active
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item mt-auto">
            <a className="nav-link text-danger" href="#" onClick={logout}>
              Logout
            </a>
          </li>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="content flex-grow-1 px-4"
        style={{
          marginLeft: isTablet ? "0" : isSidebarCollapsed ? "60px" : "180px",
          transition: "margin 0.3s ease",
        }}
      >
        <div
          className={`topmenu pb-3 pt-2 position-sticky bg-white rounded-0 d-flex justify-content-between align-items-center ${
            isScrolled ? "glass-e" : ""
          }`}
        >
          <div className="d-flex align-items-center gap-4 ms-auto">
            <i className="bi bi-bell" style={{ fontSize: "1.6rem" }}></i>
            <img
              src="/profile.png"
              alt="Profile"
              className="rounded-circle"
              style={{ width: "35px", height: "35px" }}
            />
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
