// import logo from "./logo.svg";
import "./App.css";
import { createStyles, Text, Box, Group, Divider } from "@mantine/core";
// import DefaultHeader from "./components/headers/DefaultHeader";
// import UserHeader from "./components/headers/UserHeader";
import Room from "./components/room/Room";
import List from "./components/followList/List";
// import Hub from "../src/containers/Hub/Hub";
import { Routes, Route, Link } from "react-router-dom";
import DefaultHoc from "./containers/default hoc/DefaultHoc";
import CreateRoom from "./components/room/CreateRoom";
import CreatePost from "./components/post/CreatePost";
import Post from "./components/post/Post";
import PostForm from "./containers/PostForm/PostForm";
import RoomFormModal from "./containers/RoomFormModal/RoomFormModal";
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
			discord: true,
		},
		targetTime: "21 : 00",
		partyMembersCount: 4,
		badge: "try harder",
	},
];
const posts = [
	{
		userName: "ruizaki",
		postedOn: "2h",
		voteCount: 15,
		title: "I believe so yah. If an effect is causing a loopm",
		content: "https://tkdodo.eu/blog/react-query-data-transformations",
		comments: [{}, {}, {}, {}],
	},
	{
		userName: "imTheEdgyKid",
		postedOn: "4h",
		voteCount: "2",
		title: "Childe ascention material farming",
		content: "oin, I will be waiting",
		comments: [{}, {}, {}],
	},
	{
		userName: "okayChamp",
		postedOn: "30m",
		voteCount: "544",
		title: "Childe ascention material farming",
		content: "oin, I will be waiting",
		comments: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
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
							<CreatePost />
							{posts.map((e, i) => {
								return <Post postData={e} />;
							})}
						</Box>
						<div>
							<Divider mt={85} orientation="vertical" />
						</div>
						<Box mt={45}>
							<Text mb={16}>LFP activities</Text>
							<CreateRoom />
							{tahh.map((e, i) => {
								return <Room roomDetail={e} />;
							})}
						</Box>
					</DefaultHoc>
				}
			/>
			<Route
				path="valorant/create/post"
				element={
					<DefaultHoc>
						<Box mt={45}>
							<PostForm />
						</Box>
					</DefaultHoc>
				}
			/>
			{/* <Route
				path="valorant/create/room"
				element={
					<DefaultHoc>
						<Box mt={45}>
							
						</Box>
					</DefaultHoc>
				}
			/> */}
		</Routes>
	);
}

export default App;
