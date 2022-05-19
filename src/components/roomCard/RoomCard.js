import {
	Card,
	Text,
	Group,
	Menu,
	createStyles,
	ActionIcon,
	Button,
	Avatar,
	Box,
	Image,
} from "@mantine/core";
// import { GasStation, Gauge, ManualGearbox, Users } from "tabler-icons-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { IoChatbox } from "react-icons/io5";
import { AiOutlineLink } from "react-icons/ai";
import { MdReportProblem } from "react-icons/md";
import Tools from "../tools/Tools";
import LfpTimer from "../lfpTimer/LfpTimer";
import { useNavigate } from "react-router-dom";
import UserBadge from "../userBadge/UserBadge";

import dotaPng from "../../../src/images/gamesPictures/dota2.png";
import lolPng from "../../../src/images/gamesPictures/lol.png";
import csgoPng from "../../../src/images/gamesPictures/csgo.png";
import valorantPng from "../../../src/images/gamesPictures/valorant.png";
import genshintPng from "../../../src/images/gamesPictures/genshin.png";
import mlPng from "../../../src/images/gamesPictures/ml.png";
import pubgmPng from "../../../src/images/gamesPictures/pubgm.png";
import { gameRanks } from "../../constants/gameRanks";
const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
		width: 475,
		maxWidth: 475,
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

function RoomCard({ key, roomDetail }) {
	const { classes } = useStyles();
	const gameIdPicPair = {
		1: dotaPng,
		2: lolPng,
		3: csgoPng,
		4: valorantPng,
		5: genshintPng,
		6: mlPng,
		7: pubgmPng,
	};
	let navigate = useNavigate();
	const handleJoin = () => {
		navigate("/room/12");
	};

	return (
		<Card
			key={key}
			pt={10}
			pr={8}
			pb={7}
			pl={10}
			withBorder
			radius="sm"
			className={classes.card}>
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
							<Image
								fit="contain"
								height={15}
								width={25}
								src={gameIdPicPair[roomDetail.gameId]}
								alt="game logo"
							/>
						</Group>
						<UserBadge badge={roomDetail.badge} />
						<UserBadge badge={roomDetail.badge} />
					</div>
				</Group>
				<Tools tools={roomDetail.tools} />
				<Box sx={{ display: "flex" }}>
					<LfpTimer roomDetail={roomDetail} />
					<Menu
						withArrow
						placement="center"
						// position="right"
						control={
							<ActionIcon variant="hover" mr={-4}>
								<BsThreeDotsVertical
									size={16} // fill="#FFF"
								/>
							</ActionIcon>
						}>
						<Menu.Item icon={<AiOutlineLink size={14} />}>Room link</Menu.Item>
						<Menu.Item
							color="red"
							icon={
								<MdReportProblem
									size={14}
									// component={Link} to="/hello"
								/>
							}>
							Report room
						</Menu.Item>
					</Menu>
				</Box>

				{/* <Divider size="xs" /> */}
			</Group>
			<Group pt="sm" pl={2} position="apart">
				{roomDetail.hasCustomData ? (
					<div></div>
				) : (
					<img
						height={36}
						width={36}
						src={
							"../../" +
							gameRanks[roomDetail.gameId].filter(
								(e) => e.value == roomDetail.gameRankId
							)[0]["image"]
						}
						alt="user rank"
					/>
				)}
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

					<Button
						ml={1}
						radius="xl"
						variant="filled"
						px={22}
						style={{ fontSize: 18 }}
						onClick={handleJoin}>
						JOIN
					</Button>
				</Group>
			</Group>
		</Card>
	);
}

export default RoomCard;
