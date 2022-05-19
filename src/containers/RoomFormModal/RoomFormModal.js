// import logo from "./logo.svg";
import {
	Text,
	Group,
	Select,
	TextInput,
	Button,
	Box,
	Chips,
	Chip,
	Textarea,
	NumberInput,
	Avatar,
	Modal,
	createStyles,
	Checkbox,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useState, useContext } from "react";
import {
	BsClock,
	BsController,
	BsPeople,
	BsInfoCircle,
	BsHeadset,
	BsHeadphones,
	BsGear,
	BsChevronDown,
	BsMic,
} from "react-icons/bs";
import { RiUserHeartLine } from "react-icons/ri";
import { FaDiscord } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API_URL } from "../../constants/request";
import { AuthContext } from "../../AuthContext";
import { useCookies } from "react-cookie";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { AiOutlineCheck } from "react-icons/ai";
import { ModalsContext } from "../../ModalsContext";
import { gameRanks } from "../../constants/gameRanks";

const getMyDrafts = async () => {
	// console.log("userId: " + userId);
	const response = await fetch(`${API_URL}/api/gameranks`);
	return response.json();
};

function RoomFormModal({ opened, ...props }) {
	const { data, status } = useQuery("myDrafts", getMyDrafts, { enabled: false });
	// console.log(data);

	const handlePrevious = (e) => {
		e.preventDefault();
		navigate("../");
	};
	let navigate = useNavigate();
	const initialValue = "<p>any <a >link</a>, plain text</p>";
	// const GameData =
	// 	status === "success"
	// 		? data.gamesRanks.map((e) => {
	// 				return { image: e.gameImageUrl, label: e.gameName, value: e.gameId };
	// 		  })
	// 		: [];
	const GameData = [
		{
			image: "http://localhost:8000/static/public/images/dota2.svg",
			label: "Dota 2",
			value: "1",
		},
		{
			image: "http://localhost:8000/static/public/images/lol.svg",
			label: "League of Legends",
			value: "2",
		},
		{
			image: "http://localhost:8000/static/public/images/csgo.svg",
			label: "Counter-Strike: Global Offensive",
			value: "3",
		},
		{
			image: "http://localhost:8000/static/public/images/valorant.svg",
			label: "Valorant",
			value: "4",
		},

		{
			image: "http://localhost:8000/static/public/images/genshin-impact.svg",
			label: "Genshin Impact",
			value: "5",
		},
		{
			image: "http://localhost:8000/static/public/images/mobile-legends.svg",
			label: "Mobile Legends: Bang Bang",
			value: "6",
		},
		{
			image: "http://localhost:8000/static/public/images/pubgm.svg",
			label: "PUBG Mobile",
			value: "7",
		},
	];
	// const RankData = [
	// 	{
	// 		image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
	// 		label: "Valorant",
	// 		value: "Bender Bending Rodríguez",
	// 	},

	// 	{
	// 		image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
	// 		label: "Dota 2",
	// 		value: "Carol Miller",
	// 	},
	// 	{
	// 		image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
	// 		label: "Mobile Legends: Bang Bang",
	// 		value: "Homer Simpson",
	// 	},
	// 	{
	// 		image: "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
	// 		label: "PUBG Mobile",
	// 		value: "PUBG Mobile",
	// 	},
	// ];

	const GameSelectItem = ({ image, label, ...others }) => (
		<div {...others}>
			<Group noWrap>
				<Avatar src={image} styles={{ image: { objectFit: "contain" } }} />

				<div>
					<Text size="sm">{label}</Text>
				</div>
			</Group>
		</div>
	);
	const RankSelectItem = ({ image, label, ...others }) => (
		<div {...others}>
			<Group noWrap>
				<Avatar src={image} size={40} styles={{ image: { objectFit: "contain" } }} />
				<div>
					<Text size="sm">{label}</Text>
				</div>
			</Group>
		</div>
	);
	const setModal = () => {
		props.setOpened();
	};
	const useStyles = createStyles((theme, _params, getRef) => ({
		label: {
			display: "flex",
			justifyContent: "space-between",
			gap: 5,
			alignItems: "center",
			color: theme.black,
			borderRadius: 4,
			padding: "5px 15px",
			width: "fit-content",
			height: "fit-content",
			color: "gray",
		},
		filled: {
			padding: "5px 10px",
		},
		input: { display: "none" },
		iconWrapper: {
			display: "none",
			ref: getRef("iconWrapper"),
		},
		checked: {
			backgroundColor: `${theme.colors.blue[4]} !important`,
			color: theme.white,
		},
	}));
	const { isAuthenticated, userId } = useContext(AuthContext);
	const { loginModal } = useContext(ModalsContext);
	const [loginModalOpen, setLoginModalOpen] = loginModal;
	const [cookies] = useCookies(["accessToken"]);
	const { classes } = useStyles();
	const [loading, setLoading] = useState(false);
	const [gameSelectValue, setGameSelect] = useState("1");
	const [rankSelectValue, setRankSelect] = useState("");
	const [roomSize, setRoomSize] = useState(1);
	const [isNow, setIsNow] = useState(false);
	const [roomTime, setRoomTime] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [preferences, setPreferences] = useState("");
	const [utils, setUtils] = useState([]);
	const [customRank, setCustomRank] = useState();

	const date = new Date();

	const handleSubmit = () => {
		setLoading(true);
		if (isAuthenticated) {
			const config = {
				headers: {
					Authorization: `Bearer ${cookies.accessToken}`,
				},
			};
			const requestData = {
				userId,
				gameId: gameSelectValue,
				...(gameSelectValue === "5" && { hasCustomRank: true, customRank }),
				...(gameSelectValue !== "5" && { gameRankId: rankSelectValue }),
				roomSize,
				targetTime: isNow ? date.toISOString() : roomTime,
				title,
				description,
				preferences,
				technicalInfo: utils,
			};
			axios
				.post(`${API_URL}/api/room/create`, requestData, config)
				.then((res) => {
					if (res.status === 200) {
						setLoading(false);
						navigate("/");
						showNotification({
							id: "post-success",
							disallowClose: true,
							autoClose: 5000,
							title: res.data.message,
							color: "green",
							icon: <AiOutlineCheck size={18} />,
							loading: false,
						});
					}
				})
				.catch((err) => {
					setLoading(false);
					showNotification({
						id: "post-failure",
						disallowClose: true,
						autoClose: 5000,
						title: "Error occurred.",
						message: "Error message:" + err,
						color: "red",
						loading: false,
					});
				});
		} else {
			setLoginModalOpen(true);
		}
	};
	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setModal(false)}
				title=""
				size="lg"
				styles={{ header: { marginBottom: -20 } }}
				// sx={{ width: "" }}
			>
				<Group direction="column" position="center">
					<Group spacing="xs" mt={2} direction="column" sx={{ width: "100%" }}>
						<Group ml="lg">
							<BsController size={20} />
							<Text size="lg">GAME INFO</Text>
						</Group>

						<Group
							pt="xs"
							px="lg"
							style={{ width: "95%", alignSelf: "center" }}
							spacing="xl"
							position="apart"
							grow={1}>
							<Select
								label="I wish to play"
								id="game_select"
								defaultValue="PUBG Mobile"
								itemComponent={GameSelectItem}
								value={gameSelectValue}
								onChange={setGameSelect}
								data={GameData}
								rightSection={<BsChevronDown size={14} />}
								rightSectionWidth={30}
								styles={{
									rightSection: {
										pointerEvents: "none",
									},
									label: { paddingBottom: 10 },
								}}
								maxDropdownHeight={400}
							/>
							{gameSelectValue === "5" ? (
								<NumberInput
									label="Enter your AR"
									placeholder="Lowest value is AR 16"
									max={100}
									min={16}
									value={customRank}
									onChange={(val) => setCustomRank(val)}
									stepHoldDelay={500}
									stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
									styles={{
										label: { paddingBottom: 10 },
										placeholder: {
											fontSize: 9,
										},
									}}
								/>
							) : (
								<Select
									id="rank_select"
									required
									label="My rank is "
									itemComponent={RankSelectItem}
									data={gameRanks[gameSelectValue]}
									rightSection={<BsChevronDown size={14} />}
									rightSectionWidth={30}
									maxDropdownHeight={400}
									value={rankSelectValue}
									onChange={setRankSelect}
									styles={{
										rightSection: {
											pointerEvents: "none",
										},
										label: { paddingBottom: 10 },
									}}
								/>
							)}
						</Group>
					</Group>
					<Group spacing="xs" mt={2} direction="column" sx={{ width: "100%" }}>
						<Group ml="lg">
							<BsPeople size={20} />
							<Text size="lg">PARTY INFO</Text>
						</Group>

						<Group
							pt="xs"
							p="lg"
							style={{ width: "95%", alignSelf: "center" }}
							position="apart">
							<Group spacing="xs">
								<Text size="sm" weight={500}>
									I need
								</Text>
								<NumberInput
									required
									type="number"
									hideControls
									value={roomSize}
									onChange={setRoomSize}
									min={1}
									max={20}
									maxLength={2}
									styles={{ input: { width: 45, textAlign: "center" } }}
								/>
								<Text size="sm">player(s)</Text>
							</Group>
							<Group spacing="xs">
								<Button
									// value={}
									onClick={(e) => {
										isNow ? setIsNow(false) : setIsNow(true);
									}}
									variant={isNow ? "filled" : "outline"}
									styles={{
										outline: {
											color: "black",
											border: "1px solid #00000150",
										},
										label: {
											color: isNow ? "white" : "black",
										},
										leftIcon: {
											marginRight: 5,
										},
										filled: {
											backgroundColor: "black",
											"&:hover": {
												backgroundColor: "black",
											},
										},
									}}
									leftIcon={<BsClock />}>
									NOW
								</Button>
								<Text size="sm">or</Text>
								<Text size="sm" weight={500}>
									at
								</Text>
								<TimeInput
									hoursLabel="Hours"
									minutesLabel="Minutes"
									value={roomTime}
									onChange={setRoomTime}
								/>
							</Group>
						</Group>
					</Group>
					{/* <Divider size="xs" /> */}

					<Group spacing="xs" mt={2} direction="column" sx={{ width: "100%" }}>
						<Group ml="lg">
							<BsInfoCircle size={20} />
							<Text size="lg">ROOM INFO</Text>
						</Group>
						<Group
							pt="xs"
							p="lg"
							style={{ width: "95%", alignSelf: "center" }}
							direction="column">
							<TextInput
								label="Title"
								placeholder=""
								value={title}
								onChange={(e) => {
									setTitle(e.target.value);
								}}
								required
								style={{ width: "100%" }}
							/>
							<Textarea
								required
								mt="xs"
								label="Description"
								placeholder=""
								autosize
								value={description}
								onChange={(e) => {
									setDescription(e.target.value);
								}}
								maxLength={90}
								minRows={2}
								maxRows={4}
								style={{ width: "100%" }}
							/>
							<Group mt="xs">
								<RiUserHeartLine />
								<Text size="sm">
									A little more info would be helpful :)
									{/* (optional) */}
								</Text>
							</Group>
							<Group position="apart" sx={{ width: "100%" }}>
								{/* <Box shadow="lg" p={0} pb="xs">
                  <label htmlFor="exp">
                    <Text size="sm" weight={500}>
                      Experience{" "}
                    </Text>
                  </label>
                  <Chips multiple id="exp" mt="sm" size="xs">
                    <Chip value="react">Newbie</Chip>
                    <Chip value="h">Pro xd</Chip>
                    <Chip value="h">Pro xd</Chip>
                  </Chips>
                </Box> */}
								<Box shadow="lg" p={0} pb="xs">
									<label htmlFor="preference">
										<Text size="sm" weight={500}>
											Preference{" "}
										</Text>
									</label>
									<Chips
										value={preferences}
										onChange={setPreferences}
										id="exp"
										variant="filled"
										mt="sm"
										size="xs"
										styles={{
											label: {
												borderRadius: 4,
											},
										}}>
										<Chip value="1">Chill</Chip>
										<Chip value="2">Try hard</Chip>
										<Chip value="3">For fun</Chip>
									</Chips>
								</Box>
							</Group>
						</Group>
					</Group>
					<Group spacing="xs" mt={2} direction="column" sx={{ width: "100%" }}>
						<Group ml="lg">
							<BsGear size={20} />
							<Text size="lg">UTILS INFO </Text>
							<Text size="md" color="gray">
								( Optional ){" "}
							</Text>
						</Group>
						<Group pt="xs" p="lg" style={{ width: "95%", alignSelf: "center" }}>
							<label htmlFor="utils">
								<Text size="sm" weight={500}>
									I'm willing to use
								</Text>
							</label>
							<Chips
								variant="filled"
								multiple
								value={utils}
								onChange={(value) => {
									console.log(value);
									var array = [...value]; // make a separate copy of the array
									if (value.includes("1") && value.includes("2")) {
										array.splice(array.indexOf("1"), 1);
										array.splice(array.indexOf("2"), 1);
										array.push("3");
										setUtils(array);
									} else if (value.includes("3")) {
										if (value.includes("1") || value.includes("2")) {
											array.splice(array.indexOf("1"), 1);
											array.splice(array.indexOf("2"), 1);
										} else if (array[array.length - 1] === "1") {
											console.log(array.indexOf("3"));
											array.splice(array.indexOf("3"), 1);
											setUtils(array);
										} else if (array[array.length - 1] === "2") {
											array.splice(array.indexOf("3"), 1);
											setUtils(array);
										} else {
											setUtils(value);
										}
									} else {
										setUtils(value);
									}
								}}
								id="utils"
								mt={0}
								classNames={classes}
								style={{
									width: "100%",
									height: "min-content",
									display: "flex",
									justifyContent: "space-between",
								}}>
								<Chip value="1">
									<BsMic size={15} style={{ marginBottom: 2 }} />
									Only mic
								</Chip>

								<Chip value="2">
									{" "}
									<BsHeadphones size={15} style={{ marginBottom: 2 }} />
									Only headphone
								</Chip>
								<Chip value="3">
									{" "}
									<BsHeadset size={15} />
									Headset
								</Chip>
								<Chip value="4">
									<FaDiscord size={15} style={{ marginBottom: 2 }} />
									Discord
								</Chip>
							</Chips>
						</Group>
					</Group>
					<Group sx={{ width: "95%" }} mt="xs">
						<Button
							size="sm"
							variant="filled"
							sx={{ width: "100%" }}
							loading={loading}
							onClick={handleSubmit}>
							CREATE A ROOM
						</Button>
					</Group>
				</Group>
			</Modal>
		</>
	);
}
export default RoomFormModal;
