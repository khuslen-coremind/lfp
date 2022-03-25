import {
	Container,
	Header,
	createStyles,
	ActionIcon,
	Select,
	Group,
	Box,
	Avatar,
} from "@mantine/core";
import { BsHouse, BsBell } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { SiEpicgames } from "react-icons/si";
import { BiChevronDown } from "react-icons/bi";
// import pfp from "./621.png";
import { useNavigate } from "react-router-dom";
const useStyles = createStyles((theme) => ({
	header: {
		height: "100%",
		maxWidth: 1210,
	},

	links: {
		display: "flex",
		justifyContent: "space-between",
		// justifyContent: "stretch",
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

function UserHeader() {
	const { classes } = useStyles();
	let navigate = useNavigate();
	const handleGameLogoClick = (e) => {
		navigate("/valorant");
	};
	const handleHome = (e) => {
		navigate("/");
	};
	return (
		<Header height={98} pt="xs">
			<Container className={classes.header}>
				<Group className={classes.links}>
					<Group spacing={46}>
						<ActionIcon variant="transparent" color="black" onClick={handleHome}>
							<BsHouse size={35} />
						</ActionIcon>
						<ActionIcon variant="transparent" color="black">
							<FiPlus size={35} />
						</ActionIcon>
					</Group>
					<Group spacing={29}>
						{new Array(6).fill(undefined).map((e, i) => {
							return (
								<ActionIcon
									key={i.toString()}
									variant="transparent"
									onClick={handleGameLogoClick}>
									<SiEpicgames size={35} />
								</ActionIcon>
							);
						})}

						<Box className={classes.select}>
							<Select
								placeholder="OTHER"
								size="md"
								rightSection={<BiChevronDown size={14} />}
								rightSectionWidth={30}
								styles={{ rightSection: { pointerEvents: "none" } }}
								data={[
									{ value: "react", label: "React" },
									{ value: "ng", label: "Angular" },
									{ value: "svelte", label: "Svelte" },
									{ value: "vue", label: "Vue" },
									{ value: "react", label: "React" },
									{ value: "ng", label: "Angular" },
									{ value: "svelte", label: "Svelte" },
									{ value: "vue", label: "Vue" },
								]}
							/>
						</Box>
					</Group>
					{/* <ActionIcon variant="transparent">
							<BsBell />
						</ActionIcon> */}
					<Group>
						<ActionIcon>
							<BsBell size={23} />
						</ActionIcon>
						<Avatar
							component="a"
							href="#"
							src={
								"https://i.pinimg.com/736x/ab/75/46/ab754671e4b62d109fcf4d76aec8b4df--anime-manga-saitama.jpg"
							}
							alt="pfp"
							radius="xl"
							style={{ marginLeft: 80 }}
						/>
					</Group>
				</Group>
			</Container>
		</Header>
	);
}

export default UserHeader;
