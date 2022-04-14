// import logo from "./logo.svg";
import {
	Text,
	Group,
	Select,
	TextInput,
	Tabs,
	Button,
	Container,
	Box,
	Chips,
	Chip,
	Textarea,
	NumberInput,
	Paper,
	Avatar,
	Divider,
	Modal,
	CheckboxIcon,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";
// import DefaultHeader from "./components/headers/DefaultHeader";
import {
	BsClock,
	BsController,
	BsPeople,
	BsInfoSquare,
	BsTags,
	BsGear,
	BsChevronDown,
} from "react-icons/bs";
import Uploader from "../../components/uploader/Uploader";
import { useNavigate } from "react-router-dom";
import Room from "../../components/room/Room";
import { ThemeContext } from "@emotion/react";
function RoomFormModal({ opened, ...props }) {
	const handlePrevious = (e) => {
		e.preventDefault();
		navigate("../");
	};
	let navigate = useNavigate();
	const initialValue = "<p>any <a >link</a>, plain text</p>";
	const [value, onChange] = useState(initialValue);
	const GameData = [
		{
			image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
			label: "Valorant",
			value: "Bender Bending Rodríguez",
		},

		{
			image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
			label: "Dota 2",
			value: "Carol Miller",
		},
		{
			image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
			label: "Mobile Legends: Bang Bang",
			value: "Homer Simpson",
		},
		{
			image: "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
			label: "PUBG Mobile",
			value: "PUBG Mobile",
		},
	];
	const RankData = [
		{
			image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
			label: "Valorant",
			value: "Bender Bending Rodríguez",
		},

		{
			image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
			label: "Dota 2",
			value: "Carol Miller",
		},
		{
			image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
			label: "Mobile Legends: Bang Bang",
			value: "Homer Simpson",
		},
		{
			image: "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
			label: "PUBG Mobile",
			value: "PUBG Mobile",
		},
	];
	const [roomTime, setRoomTime] = useState(new Date());

	const GameSelectItem = ({ image, label, ...others }) => (
		<div {...others}>
			<Group noWrap>
				<Avatar src={image} />

				<div>
					<Text size="sm">{label}</Text>
				</div>
			</Group>
		</div>
	);
	const RankSelectItem = ({ image, label, ...others }) => (
		<div {...others}>
			<Group noWrap>
				<Avatar src={image} />
				<div>
					<Text size="sm">{label}</Text>
				</div>
			</Group>
		</div>
	);
	const setModal = () => {
		props.setOpened();
	};
	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setModal(false)}
				title=""
				size="lg"
				styles={{ header: { marginBottom: 0 } }}
				// sx={{ width: "" }}
			>
				<Group direction="column" position="center">
					<Group spacing="xs" mt={2} direction="column">
						<Group ml="lg">
							<BsController />
							<Text>GAME INFO</Text>
						</Group>

						<Group
							pt="xs"
							p="lg"
							style={{ width: "560px" }}
							spacing="xl"
							position="apart"
							grow={1}>
							<Select
								label="I wish to play"
								id="game_select"
								defaultValue="PUBG Mobile"
								itemComponent={GameSelectItem}
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
							<Select
								id="rank_select"
								required
								label="My rank is "
								itemComponent={RankSelectItem}
								data={RankData}
								rightSection={<BsChevronDown size={14} />}
								rightSectionWidth={30}
								styles={{
									rightSection: {
										pointerEvents: "none",
									},
									label: { paddingBottom: 10 },
								}}
							/>
						</Group>
					</Group>
					<Group spacing="xs" mt={2} direction="column">
						<Group ml="lg">
							<BsPeople />
							<Text>PARTY INFO</Text>
						</Group>

						<Group pt="xs" p="lg" style={{ width: "560px" }} position="apart">
							<Group spacing="xs">
								<Text size="sm" weight={500}>
									I need
								</Text>
								<NumberInput
									required
									type="number"
									hideControls
									defaultValue={1}
									min={1}
									max={9}
									maxLength={1}
									styles={{ input: { width: 45, textAlign: "center" } }}
								/>
								<Text size="sm">player(s)</Text>
							</Group>
							<Group spacing="xs">
								<Button leftIcon={<BsClock />} variant="outline" onClick={() => {}}>
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

					<Group spacing="xs" mt={2} direction="column">
						<Group ml="lg">
							<BsInfoSquare />
							<Text>ROOM INFO</Text>
						</Group>
						<Group pt="xs" p="lg" style={{ width: "560px" }} direction="column">
							<TextInput
								label="Waiting room title"
								placeholder=""
								required
								style={{ width: "100%" }}
							/>
							<Textarea
								required
								mt="md"
								label="Waiting room description"
								placeholder=""
								autosize
								maxLength={90}
								minRows={2}
								maxRows={4}
								style={{ width: "100%" }}
							/>

							<Group sx={{ justifyContent: "space-around" }}>
								{/* <Box ml="lg">
									<BsTags />
								</Box> */}
								<Box shadow="lg" p="xs">
									<label htmlFor="exp">
										<Text size="sm" weight={500}>
											Experience{" "}
										</Text>
									</label>
									<Chips multiple id="exp" mt="sm" size="xs">
										<Chip value="react">Newbie</Chip>
										<Chip value="h">Pro</Chip>
									</Chips>
								</Box>
								<Box shadow="lg" p="xs">
									<label htmlFor="preference">
										<Text size="sm" weight={500}>
											Preference{" "}
										</Text>
									</label>
									<Chips multiple id="exp" mt="sm" size="xs">
										<Chip value="react">Chill</Chip>
										<Chip value="h">Try hard</Chip>
										<Chip value="h">For fun</Chip>
									</Chips>
								</Box>
							</Group>
						</Group>
					</Group>
					<Group spacing="xs" mt={2} direction="column">
						<Group ml="lg">
							<BsGear />
							<Text>UTILS INFO</Text>
						</Group>
						<Group pt="xs" p="lg" style={{ width: "560px" }}>
							<label htmlFor="utils">
								<Text size="sm" weight={500}>
									I'm willing to use{" "}
								</Text>
							</label>
							<Chips multiple id="utils" mt="xs">
								<Chip value="react">Only mic</Chip>
								<Chip value="h">Only headphone</Chip>
								<Chip value="eact">Headset</Chip>
								<Chip value="discord">Discord</Chip>
							</Chips>
						</Group>
					</Group>
					<Group sx={{ width: "95%" }} mt="xs">
						<Button size="sm" variant="filled" sx={{ width: "100%" }}>
							CREATE A ROOM
						</Button>
					</Group>
				</Group>
			</Modal>
		</>
	);
}
export default RoomFormModal;
