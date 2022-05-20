import {
	Group,
	Button,
	createStyles,
	Collapse,
	Avatar,
	Text,
	ActionIcon,
	Box,
	Paper,
	Divider,
	Image,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";

// import { GasStation, Gauge, ManualGearbox, Users } from "tabler-icons-react";
import {
	BsCaretUp,
	BsCaretDown,
	BsCaretUpFill,
	BsCaretDownFill,
	BsChevronCompactUp,
	BsEyeSlash,
	BsFlag,
	BsHeart,
	BsDash,
} from "react-icons/bs";
import { VscReply } from "react-icons/vsc";
import { AiOutlineShareAlt } from "react-icons/ai";
import { RiGameFill } from "react-icons/ri";
import { useState } from "react";
import moment from "moment";
import ReactPlayer from "react-player";
import parse from "html-react-parser";
import axios from "axios";
import { API_URL } from "../../constants/request";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

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
		background: theme.colors.gray[2],
	},
	body: {
		paddingTop: theme.spacing.sm,
	},
}));
const PostInput = { flexGrow: 1 };
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}
function Post({ key, postData }) {
	const [cookies, setCookie] = useCookies(["accessToken"]);
	const { isAuthenticated, setAuthenticated } = useContext(AuthContext);
	const { classes } = useStyles();
	const [opened, setOpen] = useState(false);
	const [hasUpVotedBefore, setHasUpVotedBefore] = useState(postData.votedValue === 1);
	const [hasDownVotedBefore, setHasDownVotedBefore] = useState(
		postData.votedValue === -1
	);
	const [hasUpVoted, setHasUpVoted] = useState(false);
	const [hasDownVoted, setHasDownVoted] = useState(false);

	const collapse = (e) => {
		setOpen(!opened);
	};
	const author = {
		image:
			"https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "loremipsum",
	};
	const body =
		"I use Heroku to host my Node.js application, but MongoDB add-on appears to be too expensive. I consider switching to Digital Ocean VPS to save some cash.";
	const postedAt = "10 minutes ago";

	const handleVote = (id, isUpVote) => (e) => {
		console.log("postData:", postData);
		if (isAuthenticated) {
			const requestData = { vote: isUpVote ? 1 : -1, postId: id };
			const config = {
				headers: {
					Authorization: `Bearer ${getCookie("accessToken")}`,
				},
			};
			axios
				.post(`${API_URL}/api/poll/post/${id}`, requestData, config)
				.then((response) => {
					if (isUpVote === 1) {
						if (hasUpVoted) {
							setHasUpVoted(false);
							setHasDownVoted(false);
							setHasUpVotedBefore(false);
							setHasDownVotedBefore(false);
						} else {
							setHasUpVoted(true);
							setHasDownVoted(false);
							setHasDownVotedBefore(false);
						}
					} else {
						if (hasDownVoted) {
							setHasDownVoted(false);
							setHasUpVoted(false);
							setHasUpVotedBefore(false);
							setHasDownVotedBefore(false);
						} else {
							setHasDownVoted(true);
							setHasUpVoted(false);
							setHasDownVotedBefore(false);
						}
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			showNotification({
				id: "unauth",
				disallowClose: true,
				autoClose: 7000,
				title: "Unauthorized ;-;",
				message: "Please login if you already have an account OR you can create one! 😉",
				color: "green",
				icon: <RiGameFill size={18} />,
				loading: false,
			});
		}
	};
	return (
		<Paper
			key={key}
			// position="apart" p="xs"
			className={classes.button}
			// pr={17} pl={16}
		>
			{/* {JSON.stringify(postData)} */}
			<Group
				direction="column"
				align="center"
				spacing={5}
				className={classes.vote}
				px={10}
				pt={8}>
				<ActionIcon onClick={handleVote(postData.postInfo.id, 1)}>
					{hasUpVotedBefore || hasUpVoted ? (
						<BsCaretUpFill size={22} color="#5D62EA" />
					) : (
						<BsCaretUp size={22} />
					)}
				</ActionIcon>

				<Text weight="bold">
					{hasUpVotedBefore || hasDownVotedBefore
						? postData.totalVotes[0]["total"]
						: hasUpVoted
						? parseInt(postData.totalVotes[0]["total"]) + 1
						: hasDownVoted
						? parseInt(postData.totalVotes[0]["total"]) - 1
						: postData.totalVotes[0]["total"]}
					{/* { postData.totalVotes[0]['total']} */}
				</Text>

				<ActionIcon onClick={handleVote(postData.postInfo.id, 0)}>
					{postData.hasDownVoted || hasDownVoted ? (
						<BsCaretDownFill size={22} color="#FF7033" />
					) : (
						<BsCaretDown size={22} />
					)}
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
				<Group direction="column" sx={{ flexGrow: 1, width: "min-content" }}>
					<Group direction="column" spacing={2} sx={{ width: "100%" }}>
						<Text weight="lighter" size="sm">
							Posted by <b>{postData.postInfo.user.username} </b>
							{moment(postData.postInfo.createdAt).fromNow()}
						</Text>
						<Group direction="column" spacing={0} sx={{ width: "100%" }}>
							<Text mt={16} size="xl" weight={600}>
								{postData.postInfo.title}
							</Text>
							{postData.postInfo.isText ? (
								<Text mt={15} color="gray" weight={500}>
									{parse(postData.postInfo.textContent)}
								</Text>
							) : postData.postInfo.contentUrl.slice(-3) === "mp4" ? (
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										width: "95%",
										paddingRight: 10,
										paddingLeft: 10,
										paddingTop: 15,
										paddingBottom: 15,
									}}>
									{" "}
									<ReactPlayer
										style={{
											backgroundColor: "black",
											borderRadius: 4,
											paddingBottom: 3,
										}}
										light
										pip
										height={250}
										width="100%"
										controls
										url={postData.postInfo.contentUrl}
									/>
								</div>
							) : (
								<Image
									fit="contain"
									mt={15}
									radius="sm"
									src={postData.postInfo.contentUrl}
									alt={postData.postInfo.contentUrl}
								/>
							)}
						</Group>
					</Group>
					<Group spacing={0} position="apart" sx={{ width: "100%" }}>
						<Group>
							{/* <Button
								px={11}
								leftIcon={<BsChatSquare style={{ marginTop: 1 }} />}
								variant="subtle"
								onClick={collapse}>
								{postData.comments.length} Comments
							</Button> */}
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
					<Collapse in={opened} sx={{ maxWidth: "95%" }}>
						<div>
							<Group>
								<Avatar src={author.image} alt={author.name} radius="sm" size={25} />
								<Text size="md" pb="xs" weight={500}>
									{author.name}
								</Text>
								<Text size="xs" color="dimmed" pb="xs">
									{postedAt}
								</Text>
								<ActionIcon sx={{ marginLeft: "auto" }}>
									<BsDash />
								</ActionIcon>
							</Group>

							<Text className={classes.body} size="xs">
								{body}
							</Text>
							<Group className={classes.body} spacing={3} sx={{ marginLeft: "auto" }}>
								<Text weight="lighter">{postData.totalVotes[0]["total"]}</Text>
								<ActionIcon>
									<BsHeart />
								</ActionIcon>
								<Button compact rightIcon={<VscReply />} variant="subtle" color="dark">
									Reply
								</Button>
							</Group>
						</div>
					</Collapse>
					{opened && (
						<>
							<Divider size="xs" color="dark" />
							<Box>
								<ActionIcon variant="default">
									<BsChevronCompactUp size={16} />
								</ActionIcon>
							</Box>
						</>
					)}
				</Group>
			</Group>
		</Paper>
	);
}

export default Post;
