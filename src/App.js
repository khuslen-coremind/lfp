// import logo from "./logo.svg";
import "./App.css";
import { AppShell, Container, createStyles, Text, Box, Group } from "@mantine/core";
// import DefaultHeader from "./components/headers/DefaultHeader";
import UserHeader from "./components/headers/UserHeader";
import Room from "./components/room/Room";
import List from "./components/followList/List";
import Hub from "../src/containers/Hub/Hub";
import { Routes, Route, Link } from "react-router-dom";
import DefaultHoc from "./containers/default hoc/DefaultHoc";
import CreateRoom from "./components/room/CreateRoom";
import { IconContext } from "react-icons";
const useStyles = createStyles((theme) => ({
	container: {
		display: "flex",
		justifyContent: "space-around",
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
		<Routes>
			<Route
				path="/"
				element={
					<DefaultHoc>
						<Box mt={45}>
							<Text mb={16}>Recent Activities</Text>
							<Room roomDetail={tahh[0]} />
							<Room roomDetail={tahh[1]} />
							<Room roomDetail={tahh[2]} />
							<Room roomDetail={tahh[3]} />
							<Room roomDetail={tahh[2]} />
							<Room roomDetail={tahh[3]} />
						</Box>

						<Box mt={45}>
							<Text mb={16}>Games that you follow</Text>
							<List />
						</Box>
					</DefaultHoc>
				}></Route>
			<Route
				path="valorant"
				element={
					<DefaultHoc>
						<Box mt={45}>
							<Text mb={16}>Community posts</Text>
						</Box>
						<Box mt={45}>
							<Text mb={16}>LFP activities</Text>
							<CreateRoom />
							<Room roomDetail={tahh[0]} />
							<Room roomDetail={tahh[1]} />
							<Room roomDetail={tahh[2]} />
							<Room roomDetail={tahh[3]} />
							<Room roomDetail={tahh[2]} />
							<Room roomDetail={tahh[3]} />
						</Box>
					</DefaultHoc>
				}
			/>
		</Routes>
	);
}

export default App;
