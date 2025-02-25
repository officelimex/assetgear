import React, { useState, useEffect, Key } from "react";
import { Table, Tag, Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type Asset = {
	key: string;
	name: string;
	category: string;
	status: string;
	purchaseDate: string;
};

const AssetList: React.FC = () => {
	const [assets, setAssets] = useState<Asset[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		// Simulated API call
		setTimeout(() => {
			setAssets([
				{
					key: "1",
					name: "Laptop XPS 15",
					category: "Electronics",
					status: "In Use",
					purchaseDate: "2023-06-15",
				},
				{
					key: "2",
					name: "Office Chair",
					category: "Furniture",
					status: "Available",
					purchaseDate: "2022-09-10",
				},
				{
					key: "3",
					name: "Projector HD",
					category: "Electronics",
					status: "Under Maintenance",
					purchaseDate: "2021-03-25",
				},
			]);
			setLoading(false);
		}, 1000);
	}, []);

	const columns = [
		{
			title: "Asset Name",
			dataIndex: "name",
			key: "name",
			width: 200, // Set a width
		},
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
			width: 150, // Set a width
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			width: 150,
			render: (status: string) => {
				let color =
					status === "In Use"
						? "green"
						: status === "Available"
							? "blue"
							: "volcano";
				return <Tag color={color}>{status}</Tag>;
			},
		},
		{
			title: "Purchase Date",
			dataIndex: "purchaseDate",
			key: "purchaseDate",
			width: 150,
		},
		{
			title: "Actions",
			key: "actions",
			width: 150,
			render: (_: unknown, record: Asset) => (
				<Space>
					<Button type="link">Edit</Button>
					<Button type="link" danger>
						Delete
					</Button>
				</Space>
			),
		},
	];

	return (
		<div style={{ padding: 20 }}>
			<Space style={{ marginBottom: 16 }}>
				<Button type="primary" icon={<PlusOutlined />}>
					Add Asset
				</Button>
			</Space>
			<Table
				columns={columns}
				dataSource={assets}
				loading={loading}
				scroll={{ x: "max-content" }}
			/>
		</div>
	);
};

export default AssetList;
