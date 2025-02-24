import { Outlet } from "react-router-dom";
import "@/assets/WelcomePage.css";

export default function WelcomePage() {
	return (
		<div className="container-fluid vh-100">
			<div className="row h-100">
				<div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-image"></div>
				<div className="col-md-6 d-flex align-items-center justify-content-center">
					<div className="text-center">
						<h1>AssetGear</h1>
						<p>Gearing Up for Maximum Uptime.</p>
						<div className="mt-5">
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
