import { forwardRef, useState } from "react";
import {
	Container,
	Header,
	createStyles,
	ActionIcon,
	Group,
	Menu,
	Avatar,
	Text,
} from "@mantine/core";
import { BsHouse, BsBell, BsPen, BsPeople, BsPersonCircle } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { CgLogIn } from "react-icons/cg";
// import pfp from "./621.png";
import GamesNavigator from "../GamesNavigator";
import AuthService from "../../services/auth.service";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { ModalsContext } from "../../ModalsContext";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
	header: {
		height: "100%",
		maxWidth: "100%",
		backgroundColor: "#090F1A",
	},

	links: {
		display: "flex",
		justifyContent: "space-between",
		// justifyContent: "stretch",
		alignItems: "center",
		maxWidth: 1200,
		margin: "auto",
		paddingTop: 28,
		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},
	},
}));
function UserHeader({ navLogoHandler, handleToHome, onLogout }) {
	const { classes } = useStyles();
	let navigate = useNavigate();
	const { loginModal, registerModal, roomModal } = useContext(ModalsContext);
	const [roomModalOpen, setRoomModalOpen] = roomModal;
	const handleGameLogoClick = (gameId) => {
		navLogoHandler(gameId);
	};
	const handleHome = (e) => {
		handleToHome(e);
	};
	const handleLogout = () => {
		onLogout();
	};
	const LogoutButton = () => {
		return (
			<Menu.Item
				icon={<CgLogIn size={16} />}
				onClick={() => {
					console.log("log out");
					AuthService.logout();
					window.location.reload();
				}}>
				Log Out
			</Menu.Item>
		);
	};

	return (
		<Header height={98}>
			<Container className={classes.header}>
				<Group className={classes.links}>
					<Group spacing={46} ml={55}>
						<ActionIcon variant="transparent" onClick={handleHome}>
							<BsHouse size={35} color="#dedede" />
						</ActionIcon>
						<Menu
							control={
								<ActionIcon variant="transparent" color="black">
									<FiPlus size={35} color="#dedede" />
								</ActionIcon>
							}>
							<Menu.Item
								icon={
									<BsPen
										size={14}
										// component={Link} to="/hello"
									/>
								}
								onClick={(e) => navigate("/create/post")}
								// component="a"
								// target="_blank"
							>
								Create a post
							</Menu.Item>
							<Menu.Item
								icon={<BsPeople size={14} />}
								onClick={() => setRoomModalOpen(true)}>
								Create a waiting room
							</Menu.Item>
						</Menu>
					</Group>
					<GamesNavigator click={handleGameLogoClick} />
					{/* <ActionIcon variant="transparent">
							<BsBell />
						</ActionIcon> */}
					<Group spacing="xl">
						<ActionIcon>
							<BsBell size={23} color="#dedede" />
						</ActionIcon>
						<Menu
							placement="center"
							withArrow
							control={
								<Avatar
									src={"https://practicaltyping.com/wp-content/uploads/2020/08/gon.png"}
									alt="pfp"
									radius="xl"
									sx={{
										"&:hover": {
											cursor: "pointer",
										},
									}}
									// styles={{ image: { objectFit: "cover" } }}
								/>
							}>
							<Menu.Item icon={<BsPersonCircle size={16} />}>Profile</Menu.Item>
							<LogoutButton />
						</Menu>
					</Group>
				</Group>
			</Container>
		</Header>
	);
}

export default UserHeader;
