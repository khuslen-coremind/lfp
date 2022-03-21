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
} from "@mantine/core";
import { BsHouse, BsBell } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { SiEpicgames, SiRiotgames } from "react-icons/si";
// import Header from "./components/Header";
const useStyles = createStyles((theme) => ({
	header: {
		height: "100%",
	},

	links: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		height: "100%",
		width: "100%",
		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},
	},
}));

function App() {
	const { classes } = useStyles();
	return (
		<AppShell
			padding="md"
			header={
				<Header height={98} p="xs">
					<Container className={classes.header}>
						<Group spacing={5} className={classes.links}>
							<ActionIcon variant="transparent" color="black">
								<BsHouse size={35} />
							</ActionIcon>
							<ActionIcon variant="transparent" color="black">
								<FiPlus size={35} />
							</ActionIcon>
							<ActionIcon>
								<SiEpicgames />
							</ActionIcon>
							<ActionIcon>
								<SiRiotgames />
							</ActionIcon>
							<ActionIcon>
								<SiEpicgames />
							</ActionIcon>
							<ActionIcon>
								<SiRiotgames />
							</ActionIcon>
							<ActionIcon>
								<SiEpicgames />
							</ActionIcon>
							<ActionIcon>
								<SiRiotgames />
							</ActionIcon>
							<ActionIcon>
								<SiEpicgames />
							</ActionIcon>
							<Select
								placeholder="OTHER"
								size="md"
								data={[
									{ value: "react", label: "React" },
									{ value: "ng", label: "Angular" },
									{ value: "svelte", label: "Svelte" },
									{ value: "vue", label: "Vue" },
								]}
							/>
							{/* <ActionIcon variant="transparent">
							<BsBell />
						</ActionIcon> */}
							<Button variant="outline">Sign Up</Button>
							<Button variant="filled">Login</Button>
						</Group>
					</Container>
				</Header>
			}
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			})}>
			{/* Your application here */}
		</AppShell>
	);
}

export default App;
