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

const useStyles = createStyles((theme) => ({
	header: {
		height: "100%",
		maxWidth: "100%",
		backgroundColor: "#e0e0e0",
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

	const handleGameLogoClick = (gameId) => {
		navLogoHandler(gameId);
	};
	const handleHome = (e) => {
		handleToHome(e);
	};
	const handleLogout = () => {
		onLogout();
	};

	return (
		<Header height={98}>
			<Container className={classes.header}>
				<Group className={classes.links}>
					<Group spacing={46} ml={55}>
						<ActionIcon variant="transparent" color="black" onClick={handleHome}>
							<BsHouse size={35} />
						</ActionIcon>
						<Menu
							control={
								<ActionIcon variant="transparent" color="black">
									<FiPlus size={35} />
								</ActionIcon>
							}>
							<Menu.Item
								icon={
									<BsPen
										size={14}
										// component={Link} to="/hello"
									/>
								}
								component="a"
								href="http://localhost:3000/create/post"
								target="_blank">
								Create a post
							</Menu.Item>
							<Menu.Item
								icon={<BsPeople size={14} />}
								component="a"
								href="http://localhost:3000/create/room"
								target="_blank">
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
							<BsBell size={23} />
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
							<Menu.Item icon={<CgLogIn size={16} />} onClick={handleLogout}>
								Log Out
							</Menu.Item>
						</Menu>
					</Group>
				</Group>
			</Container>
		</Header>
	);
}

export default UserHeader;
