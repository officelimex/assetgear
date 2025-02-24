import { useEffect, useState } from "react";
import { fetchAssets } from "@/utils/api";

export default function Dashboard() {
	const [assets, setAssets] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		async function loadAssets() {
			const response = await fetchAssets();
			if (response.error) setError(response.error);
			else setAssets(response.data);
		}
		loadAssets();
	}, []);

	return (
		<div>
			<h1>Dashboard</h1>
			{error && <p>{error}</p>}
			<ul>
				{assets.map((asset, index) => (
					<li key={index}>{asset.name}</li>
				))}
			</ul>
		</div>
	);
}
