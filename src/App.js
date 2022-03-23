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
	Text,
	Box,
	Global,
	Divider,
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
import Tools from "./components/tools/Tools";
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
	container: {
		display: "flex",
		justifyContent: "space-between",
		maxWidth: 1320,
	},
}));
const tahh = [
	{
		userName: "dummbygod",
		gameName: "dota",
		title: "Childe ascention material farming",
		description: "oin, I will be waiting",
		rank: "https://raw.githubusercontent.com/Soneliem/WAIUA/master/Demo/images/ranksimg/20.png",
		tools: {
			mic: true,
			earphone: true,
			discord: true,
		},
		targetTime: "NOW",
		partyMembersCount: 4,
		badge: "try harder",
	},
	{
		userName: "jesus",
		gameName: "dota",
		title: "christ",
		description: "do not join, i dont like to wait ",
		rank: "https://raw.githubusercontent.com/Soneliem/WAIUA/master/Demo/images/ranksimg/15.png",
		tools: {
			mic: true,
			earphone: true,
			discord: true,
		},
		targetTime: "15 : 30",
		partyMembersCount: 2,
		badge: "newbie",
	},
	{
		userName: "XDDDD",
		gameName: "dota",
		title: "awww, lets try out the new patch lads",
		description: "title says it all ",
		rank: "https://raw.githubusercontent.com/Soneliem/WAIUA/master/Demo/images/ranksimg/23.png",
		tools: {
			mic: true,
			earphone: true,
			discord: true,
		},
		targetTime: "NOW",
		partyMembersCount: 3,
		badge: "pro",
	},
	{
		userName: "sadas",
		gameName: "dota",
		title: "ahem nvm",
		description: "oin, I will be waitingoin, I will be waitingoin, I will be waiting",
		rank: "https://raw.githubusercontent.com/Soneliem/WAIUA/master/Demo/images/ranksimg/13.png",
		tools: {
			mic: true,
			earphone: true,
			discord: true,
		},
		targetTime: "21 : 00",
		partyMembersCount: 4,
		badge: "try harder",
	},
];
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
			<Container className={classes.container}>
				<Box mt={45}>
					<Text mb={16}>Recent Activities</Text>
					<Room roomDetail={tahh[0]} />
					<Room roomDetail={tahh[1]} />
					<Room roomDetail={tahh[2]} />
					<Room roomDetail={tahh[3]} />
					<Room roomDetail={tahh[2]} />
					<Room roomDetail={tahh[3]} />
				</Box>
				<div></div>
				<Tools />
			</Container>
		</AppShell>
	);
}

export default App;
