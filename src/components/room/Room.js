import {
	Card,
	Text,
	Group,
	Badge,
	createStyles,
	ActionIcon,
	Button,
	Avatar,
	Box,
} from "@mantine/core";
// import { GasStation, Gauge, ManualGearbox, Users } from "tabler-icons-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { IoChatbox } from "react-icons/io5";
import Tools from "../tools/Tools";
import LfpTimer from "../lfpTimer/LfpTimer";
const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
		maxWidth: "",
		marginTop: 10,
		// minHeight: 156,
		// padding: "10px 8px 7px 10px !important",
	},

	imageSection: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
	},

	label: {
		marginBottom: theme.spacing.xs,
		lineHeight: 1,
		fontWeight: 700,
		fontSize: theme.fontSizes.xs,
		letterSpacing: -0.25,
		textTransform: "uppercase",
	},

	section: {
		padding: theme.spacing.md,
		borderTop: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},

	icon: {
		marginRight: 5,
		color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[5],
	},
	img: {
		width: 43,
		height: 43,
	},

	txtContainer: {
		maxWidth: 380,
		flexGrow: 1,
	},
	name: {
		maxWidth: 150,
		width: 150,
	},
	sparound: {
		justifyContent: "space-around",
	},
}));

function Room(props) {
	const { classes } = useStyles();
	const roomDetail = props.roomDetail;

	return (
		<Card pt={10} pr={8} pb={7} pl={10} withBorder radius="sm" className={classes.card}>
			<Group className={classes.imageSection} p={0} m={0}>
				<Group position="apart" spacing={10}>
					<Avatar
						src="https://i1.sndcdn.com/artworks-sAsRV00EqUmWoXUQ-OMw9yQ-t500x500.jpg"
						alt="Tesla Model S"
						radius="xl"
						size={43}
					/>
					<div>
						<Group spacing={5} className={classes.name}>
							<Text lineClamp={7} weight={700} size="md">
								{roomDetail.userName}
							</Text>
							<Text size="xs" weight="lighter">
								<i>LFP</i>
							</Text>
							<img
								height={15}
								width={15}
								src="https://images.cults3d.com/4QqRV9kLYYEuw9ur_X3yjQl1sjk=/516x516/https://files.cults3d.com/uploaders/15024335/illustration-file/a86d53e4-2bd9-4a8f-9550-986686c3131a/gi0mAjIh_400x400.png"
								alt="game logo"
							/>
						</Group>
						<Badge size="sm" radius="md" color="#515151">
							{roomDetail.badge}
						</Badge>
					</div>
				</Group>
				<Tools />
				<Box sx={{ display: "flex" }}>
					<LfpTimer roomDetail={roomDetail} />
					<ActionIcon variant="hover" mr={-4}>
						<BsThreeDotsVertical
							size={16} // fill="#FFF"
						/>
					</ActionIcon>
				</Box>

				{/* <Divider size="xs" /> */}
			</Group>
			<Group pt="sm" pl={2} position="apart">
				<img height={36} width={36} src={roomDetail.rank} alt="game logo" />
				<Group
					direction="column"
					position="center"
					spacing={1}
					align="start"
					className={classes.txtContainer}>
					<Text weight="bold">{roomDetail.title.toUpperCase()}</Text>
					<Text>{roomDetail.description}</Text>
				</Group>
			</Group>
			<Group position="apart" pt="md" pl={6}>
				<ActionIcon pt={2} radius="xl" size={30} variant="filled">
					<IoChatbox size={16} />
				</ActionIcon>
				<Group position="right" spacing={5}>
					{[...Array(roomDetail.partyMembersCount)].map((e, i) => {
						return (
							<Avatar key={i.toString()} color="blue" radius="xl">
								<FiPlus size={22} />
							</Avatar>
						);
					})}

					<Button ml={1} radius="xl" variant="filled" px={22} style={{ fontSize: 18 }}>
						JOIN
					</Button>
				</Group>
			</Group>
		</Card>
	);
}

export default Room;
