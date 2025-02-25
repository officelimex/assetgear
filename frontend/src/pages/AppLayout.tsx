import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Button, Typography, Avatar } from "antd";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	LogoutOutlined,
	HomeOutlined,
	SettingOutlined,
	UserOutlined,
	FileOutlined,
} from "@ant-design/icons";
import { useUser } from "@/context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/AppLayout.css";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

export default function AdminLayout() {
	const [collapsed, setCollapsed] = useState(false);
	const { logout, user } = useUser();

	const menuItems = [
		{
			key: "1",
			icon: <HomeOutlined />,
			label: <Link to="/app/dashboard">Dashboard</Link>,
		},
		{
			key: "2",
			icon: <UserOutlined />,
			label: <Link to="/app/assets">Assets</Link>,
		},
		{
			key: "3",
			icon: <FileOutlined />,
			label: <Link to="/app/documents">Documents</Link>,
		},
		{
			key: "4",
			icon: <SettingOutlined />,
			label: <Link to="/app/settings">Settings</Link>,
		},
	];

	const logoutItem = {
		key: "5",
		icon: <LogoutOutlined />,
		label: "Logout",
		onClick: logout,
		className: "text-danger",
	};

	return (
		<Layout className="vh-100">
			{/* Sidebar */}
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={setCollapsed}
				className="d-flex flex-column ">
				<div className="text-center mb-3 mt-3">
					<Title level={4} className="text-white">
						{collapsed ? "AG" : "AssetGear"}
					</Title>
				</div>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={["1"]}
					className="flex-grow-1 p-2"
					items={menuItems}
				/>
				<Menu
					theme="dark"
					mode="inline"
					className="mt-auto"
					items={[logoutItem]}
				/>
			</Sider>

			{/* Main Layout */}
			<Layout>
				<Header className="d-flex justify-content-between align-items-center px-3 bg-white shadow-sm">
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
					/>
					<div className="d-flex align-items-center gap-3">
						<div className="d-flex flex-column text-end">
							<Text strong>{user?.name}</Text>
							<Text type="secondary" className="fs-8">
								{user?.email}
							</Text>
						</div>
						<Avatar src="/profile.png" size={35} />
					</div>
				</Header>
				<Content className="p-1">
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
}
