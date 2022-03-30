import {
	Group,
	createStyles,
	Accordion,
	Button,
	Avatar,
	Box,
	Text,
	Paper,
} from "@mantine/core";
// import { GasStation, Gauge, ManualGearbox, Users } from "tabler-icons-react";
import { FiPlus } from "react-icons/fi";
import Room from "../room/Room";
const useStyles = createStyles((theme, _params, getRef) => ({
	icon: { ref: getRef("icon") },

	control: {
		ref: getRef("control"),
		border: 0,
		// opacity: 0.6,
		opacity: 1,
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
		"&:hover": {
			backgroundColor: "transparent",
			//   opacity: 1,
		},
		padding: "12px 17.8px 12px 19px",
	},

	item: {
		borderBottom: 0,
		width: 531,
		overflow: "hidden",
		transition: `box-shadow 150ms ${theme.transitionTimingFunction}`,
		border: "1px solid transparent",
		borderRadius: theme.radius.sm,
		borderColor:
			theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[3],
		marginBottom: 8,
		// backgroundColor: "#2C384B",
	},

	itemOpened: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
		borderColor:
			theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[3],

		[`& .${getRef("control")}`]: {
			opacity: 1,
		},

		[`& .${getRef("icon")}`]: {
			transform: "rotate(45deg)",
		},
	},

	content: {
		paddingLeft: 0,
	},
}));
function List(props) {
	//   const roomDetail = props.roomDetail;
	const charactersList = [
		{
			image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
			label: "Dota 2",
			content:
				"Bender Bending Rodríguez, (born September 4, 2996), designated Bending Unit 22, and commonly known as Bender, is a bending unit created by a division of MomCorp in Tijuana, Mexico, and his serial number is 2716057. His mugshot id number is 01473. He is Fry's best friend.",
		},

		{
			image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
			label: "Valorant",
			content:
				"Carol Miller (born January 30, 2880), better known as Mom, is the evil chief executive officer and shareholder of 99.7% of Momcorp, one of the largest industrial conglomerates in the universe and the source of most of Earth's robots. She is also one of the main antagonists of the Futurama series.",
		},
		{
			image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
			label: "Genshin Impact",
			content:
				"Homer Jay Simpson (born May 12) is the main protagonist and one of the five main characters of The Simpsons series(or show). He is the spouse of Marge Simpson and father of Bart, Lisa and Maggie Simpson.",
		},
		// {
		//   image:
		//     "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
		//   label: "Spongebob Squarepants",
		//   content:
		//     "SpongeBob is a childish and joyful sea sponge who lives in a pineapple with his pet snail Gary in the underwater city of Bikini Bottom. He works as a fry cook at the Krusty Krab, a job which he is exceptionally skilled at and enjoys thoroughly. ",
		// },
	];
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

	const das = tahh.map((item) => <Room key={item.userName} roomDetail={item} />);
	const items = charactersList.map((item) => (
		<Accordion.Item label={<AccordionLabel {...item} />} key={item.label}>
			{das.map((item) => {
				return item;
			})}
		</Accordion.Item>
	));
	return (
		<Box>
			<StyledAccordion
			// initialItem={2}
			>
				{items}
			</StyledAccordion>
			<Group>
				<Button
					fullWidth
					style={{
						height: 51,
						display: "flex",
						justifyContent: "start",
						border: "1px solid transparent",
					}}
					color="gray"
					leftIcon={
						<Box
							sx={(theme) => ({
								borderRadius: theme.radius.xl,
								padding: 5,
								paddingLeft: 6,
								paddingRight: 6,
								backgroundColor: "grey",
							})}>
							<FiPlus
								size={20}
								color="white
              "
							/>
						</Box>
						// <Box radius="xl" size={35} color="gray">
						// </Box>
					}>
					Add a game to the list
				</Button>
			</Group>
		</Box>
	);
}
function AccordionLabel({ label, image }) {
	return (
		<Group noWrap>
			<Avatar src={image} radius="xl" size="sm" />
			<Text>{label}</Text>
		</Group>
	);
}

function StyledAccordion(props) {
	const { classes } = useStyles();
	return <Accordion iconSize={16} iconPosition="right" classNames={classes} {...props} />;
}

export default List;
