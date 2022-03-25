import {
	TextInput,
	Group,
	Button,
	createStyles,
	Input,
	Avatar,
	Text,
	ActionIcon,
} from "@mantine/core";
// import { GasStation, Gauge, ManualGearbox, Users } from "tabler-icons-react";
import {
	BsCaretUpFill,
	BsCaretDownFill,
	BsCaretUp,
	BsCaretDown,
	BsChatLeftText,
	BsChatSquare,
	BsEyeSlash,
	BsFlag,
} from "react-icons/bs";
import { AiOutlineShareAlt } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
const useStyles = createStyles((theme) => ({
	button: {
		border: "1px solid #e9ecef",
		borderRadius: 4,
		display: "flex",
		flexDirection: "row",
		alignItems: "stretch",
		justifyContent: "stretch",
		marginTop: 10,
	},
	vote: {
		background: "#00000010",
	},
}));
const PostInput = { flexGrow: 1 };
function Post(props) {
	const { postData } = props;
	const { classes } = useStyles();
	return (
		<Group
			// position="apart" p="xs"
			className={classes.button}
			// pr={17} pl={16}
		>
			<Group
				direction="column"
				align="center"
				spacing={5}
				className={classes.vote}
				px={10}
				pt={8}>
				<ActionIcon>
					<BsCaretUp size={22} />
				</ActionIcon>
				<Text weight="bold">{postData.voteCount}</Text>
				<ActionIcon>
					<BsCaretDown size={22} />
				</ActionIcon>
			</Group>
			<Group
				pl={19}
				pt={9}
				pr={15}
				pb={10}
				sx={{ flexGrow: 1 }}
				// sx={{ maxHeight: 153 }}
			>
				<Group direction="column" sx={{ flexGrow: 1 }}>
					<Group direction="column" spacing={2}>
						<Text weight="lighter" size="sm">
							Posted by {postData.userName} <b>{postData.postedOn}</b> ago
						</Text>
						<Group direction="column" spacing={0}>
							<Text mt={16} size="xl">
								{postData.title}
							</Text>
							<Text mt={16} underline variant="link">
								{postData.content}
							</Text>
						</Group>
					</Group>
					<Group spacing={0} position="apart" sx={{ width: "100%" }}>
						<Group>
							<Button
								px={11}
								leftIcon={<BsChatSquare style={{ marginTop: 1 }} />}
								variant="subtle">
								{postData.comments.length} Comments
							</Button>
							<Button px={11} leftIcon={<AiOutlineShareAlt />} variant="subtle">
								Share{" "}
							</Button>
							<Button px={11} leftIcon={<BsEyeSlash />} variant="subtle">
								Hide
							</Button>
						</Group>
						<Button pr={11} leftIcon={<BsFlag />} variant="light">
							Report
						</Button>
					</Group>
				</Group>
			</Group>
			{/* <Button
				px={15}
				pr={14}
				rightIcon={
					<IconContext.Provider
						value={{
							style: { marginLeft: -2, fontSize: 13 },
						}}>
						<BsPen />
					</IconContext.Provider>
				}>
				WRITE
			</Button> */}
		</Group>
	);
}

export default Post;
