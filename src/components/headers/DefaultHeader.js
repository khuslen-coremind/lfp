import {
	Button,
	Container,
	Header,
	createStyles,
	ActionIcon,
	Select,
	Group,
	Box,
} from "@mantine/core";
import { BsHouse } from "react-icons/bs";
import { SiEpicgames } from "react-icons/si";
import { BiChevronDown } from "react-icons/bi";
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

function DefaultHeader() {
	const { classes } = useStyles();
	return (
		<Header height={98} pt="xs">
			<Container className={classes.header}>
				<Group spacing={5} className={classes.links}>
					<Group spacing={46}>
						<ActionIcon variant="transparent" color="black">
							<BsHouse size={35} />
						</ActionIcon>
						{/* <ActionIcon variant="transparent" color="black">
							<FiPlus size={35} />
						</ActionIcon> */}
					</Group>
					<Group>
						{new Array(6).fill(undefined).map((e, i) => {
							return (
								<ActionIcon key={i.toString()} variant="transparent">
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
						<Button variant="filled">Sign Up</Button>
						<Button variant="outline">Login</Button>
					</Group>
				</Group>
			</Container>
		</Header>
	);
}

export default DefaultHeader;
