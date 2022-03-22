import logo from "./logo.svg";
import "./App.css";
import {
	AppShell,
	Button,
	Container,
	Header,
	createStyles,
	ActionIcon,
	Select,
	Group,
	Grid,
	Box,
	Global,
} from "@mantine/core";
import { BsHouse, BsChevronDown, BsBell } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { SiEpicgames, SiRiotgames } from "react-icons/si";
import { BiChevronDown } from "react-icons/bi";
// import Header from "./components/Header";
import { Demo } from "./GLobal";
import DefaultHeader from "./components/headers/DefaultHeader";
import UserHeader from "./components/headers/UserHeader";
import Room from "./components/room/Room";
const useStyles = createStyles((theme) => ({
	header: {
		height: "100%",
		maxWidth: 1320,
	},

	links: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		height: "100%",
		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},
	},
	select: {
		maxWidth: "min-content",
	},
}));

function App() {
	const { classes } = useStyles();
	return (
		<AppShell
			padding="md"
			header={<UserHeader />}
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			})}>
			{/* Your application here */}
			<Room />
		</AppShell>
	);
}

export default App;
