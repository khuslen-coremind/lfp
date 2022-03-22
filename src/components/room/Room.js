import {
	Card,
	Image,
	Text,
	Group,
	Badge,
	createStyles,
	ActionIcon,
	Button,
	Avatar,
	Box,
	Divider,
} from "@mantine/core";
// import { GasStation, Gauge, ManualGearbox, Users } from "tabler-icons-react";
import {
	BsMic,
	BsHeadset,
	BsHeadphones,
	BsClock,
	BsThreeDotsVertical,
} from "react-icons/bs";
import { FiPlus } from "react-icons/fi";

import { FaDiscord } from "react-icons/fa";
import {IoChatbox} from "react-icons/io5"
const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
		maxWidth: 476
	},

	imageSection: {
		padding: theme.spacing.sm,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
		borderBottom: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
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
	time: {
		padding: "2px 6px",
		borderRadius: 30,
		backgroundColor: "#1CC300",
	},
	txtContainer:{
		maxWidth: 380,
		flexGrow:1
	}
}));

// const mockdata = [
// 	{ label: "4 passengers", icon: Users },
// 	{ label: "100 km/h in 4 seconds", icon: Gauge },
// 	{ label: "Automatic gearbox", icon: ManualGearbox },
// 	{ label: "Electric", icon: GasStation },
// ];

function Room() {
	const { classes } = useStyles();
	// const features = mockdata.map((feature) => (
	// 	<Center key={feature.label}>
	// 		<feature.icon size={18} className={classes.icon} />
	// 		<Text size="xs">{feature.label}</Text>
	// 	</Center>
	// ));
	const roomDetail = {
		userName: "dummbygod",
		gameName: "dota",
		title: "Childe ascention material farming",
		description: "oin, I will be waiting",
		rank: "immortal",
		tools: {
			mic: true,
			earphone: true,
			discord: true,
		},
		targetTime: "NOW",
		partyMembersCount: 4,
		badge: "try harder",
	};
	const tools = [
		<BsHeadphones size={10} fill="#FFFFFF" />,
		<BsHeadset size={10} fill="#FFFFFF" />,
		<BsMic size={10} fill="#FFFFFF" />,
		// <FaDiscord size={10} fill="#FFFFFF" />,
	];
	return (
		<Card withBorder radius="sm" className={classes.card}>
			<Card.Section className={classes.imageSection}>
				<Group  position="apart" mt="md" spacing={10}>
					<Avatar
						src="https://i1.sndcdn.com/artworks-sAsRV00EqUmWoXUQ-OMw9yQ-t500x500.jpg"
						alt="Tesla Model S"
						radius="xl"
						size={43}
					/>
					<div>
						<Group spacing={5}>
							<Text weight={700} size="md">
								{roomDetail.userName}
							</Text>
							<Text size="xs">
								<i>LFP</i>
							</Text>
							<img
								height={15}
								width={15}
								src="https://images.cults3d.com/4QqRV9kLYYEuw9ur_X3yjQl1sjk=/516x516/https://files.cults3d.com/uploaders/15024335/illustration-file/a86d53e4-2bd9-4a8f-9550-986686c3131a/gi0mAjIh_400x400.png"
								alt="game logo"
							/>
						</Group>
						<Badge size="sm" radius="md">
							{roomDetail.badge}
						</Badge>
					</div>
				</Group>
				<Group position="center" mt="sx" spacing={5}>
					{tools.map((e) => {
						return (
							<Box
								sx={(theme) => ({
									backgroundColor:
										theme.colorScheme === "dark"
											? theme.colors.dark[6]
											: theme.colors.gray[0],
									textAlign: "center",
									padding: "2px 6px",
									borderRadius: "11px",
									cursor: "pointer",
									backgroundColor: "#615F5F",
								})}>
								{e}
							</Box>
						);
					})}
					<div
						style={{
							padding: "2px 6px",
							borderRadius: 11,
							backgroundColor: "#5865F2",
						}}>
						<FaDiscord size={10} fill="#FFF" />
					</div>
				</Group>
				<Group position="center" mt="sx" spacing={5} className={classes.time}>
					<Text color="white" pl={7} pb={1} weight={600}>
						NOW
					</Text>
					<BsClock size={16} fill="#FFF" style={{ marginRight: 5 }} />
				</Group>
				<ActionIcon variant="hover">
					<BsThreeDotsVertical
						size={16}
						// fill="#FFF"
					/>
				</ActionIcon>
				<Divider my="sx" />
			</Card.Section>
			<Group  position="apart" pt="sm">
				<img
					 height={36}
					 width={36}
					 src="https://raw.githubusercontent.com/Pipaolo/Valorant-Elo-Checker/main/assets/images/20.png"
					 alt="game logo"
					 />		
				<Group direction="column" position="center"
				spacing={1}   align="start" className={classes.txtContainer}>
						<Text weight="bold" >
							{roomDetail.title}
						</Text>
						<Text >
							{roomDetail.description}
						</Text>
				</Group>
			</Group>
			<Group position="apart" pt="sm" mt={17}>
				<ActionIcon  pt={2} radius="xl" size={30} variant="filled">
					<IoChatbox size={15}/>
				</ActionIcon>	
				<Group position="right"
				spacing={5}  >
					<Avatar color="blue" radius="xl">
        <FiPlus size={24} />
      </Avatar>
	  <Avatar color="white" radius="xl">
        <FiPlus size={24} fill="#FFF" />
      </Avatar>
	  <Avatar color="blue" radius="xl">
        <FiPlus size={24} />
      </Avatar>
	  <Avatar color="blue" radius="xl">
        <FiPlus size={24} />
      </Avatar>
					<Button radius="xl" variant="filled"
					
					px={22} style={{fontSize:18}}>JOIN</Button>
				</Group>
			</Group>
			
		</Card>
	);
}

export default Room;
