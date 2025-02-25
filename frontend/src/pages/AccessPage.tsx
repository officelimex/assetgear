import { Outlet } from "react-router-dom";
import "@/assets/AccessPage.css";

export default function AccessPage() {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-image"></div>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-between">
          <div className="mt-5">
            <div className="text-center mt-5">
              <h1>AssetGear</h1>
              <p>Gearing Up for Maximum Uptime.</p>
            </div>
            <Outlet />
          </div>
          <div className="footer mt-auto fs-8">
            &copy; 2025 Officelime Software Ltd
          </div>
        </div>
      </div>
    </div>
  );
}
