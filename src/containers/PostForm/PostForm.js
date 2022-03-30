// import logo from "./logo.svg";
import {
<<<<<<< HEAD
	createStyles,
	Text,
	Paper,
	Group,
	Select,
	TextInput,
	Tabs,
	Accordion,
	Button,
	Container,
	Divider,
} from "@mantine/core";
import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";
// import DefaultHeader from "./components/headers/DefaultHeader";
import { BsCardText, BsImage } from "react-icons/bs";
import Uploader from "../../components/uploader/Uploader";
import { useNavigate } from "react-router-dom";

function PostForm(props) {
	const handlePrevious = (e) => {
		e.preventDefault();
		navigate("../");
	};
	let navigate = useNavigate();
	const initialValue = "<p>any <a >link</a>, plain text</p>";
	const [value, onChange] = useState(initialValue);

	return (
		<div>
			<Container>
				<Group direction="column" style={{ width: "100%" }} position="apart">
					<Group style={{ width: "100%" }} position="apart">
						<Text>
							Share <b>anything</b> related to the community
						</Text>
						<Select
							style={{ flexGrow: 0.8 }}
							variant="filled"
							data={[
								{ value: 1, label: "Valorant" },
								{ value: 2, label: "CS:GO" },
								{ value: 3, label: "Dota 2" },
								{ value: 4, label: "Genshin Impact" },
							]}
						/>
					</Group>
					{/* <label htmlFor="title">
				{" "}
				<Text weight="bold">Title</Text>
			</label> */}
					<TextInput
						// id="title"
						mt={40}
						size="lg"
						label="Title"
						sx={{ width: "100%" }}
						placeholder=""
					/>
					<Tabs mt={35}>
						<Tabs.Tab
							style={{ fontSize: 16, fontWeight: "bold" }}
							label="Text"
							icon={<BsCardText size={16} />}>
							<RichTextEditor value={value} onChange={onChange} />
						</Tabs.Tab>
						<Tabs.Tab
							style={{ fontSize: 16, fontWeight: "bold" }}
							label="Images & videos"
							icon={<BsImage size={16} />}>
							<Uploader />
						</Tabs.Tab>
					</Tabs>
					<Group sx={{ justifySelf: "end", alignSelf: "end" }}>
						<Button variant="outline" onClick={handlePrevious}>
							CANCEL
						</Button>
						<Button variant="outline">SAVE DRAFT</Button>
						<Button variant="filled">POST</Button>
					</Group>
				</Group>
			</Container>

			<MyDrafts />
			<br />
			<Rules />
		</div>
	);
=======
  createStyles,
  Text,
  Box,
  Group,
  Select,
  TextInput,
  Tabs,
} from "@mantine/core";
// import DefaultHeader from "./components/headers/DefaultHeader";
import { BsCardText, BsImage } from "react-icons/bs";
const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
    maxWidth: 1320,
  },
}));
function PostForm(props) {
  const { classes } = useStyles();
  return (
    <Group direction="column">
      <Group>
        <Text>
          Share <b>anything</b> related to the community
        </Text>
      </Group>
      {/* <label htmlFor="title">
				{" "}
				<Text weight="bold">Title</Text>
			</label> */}
      <TextInput
        // id="title"
        width="100%"
      ></TextInput>
      <Tabs>
        <Tabs.Tab label="Text" icon={<BsCardText size={14} />}></Tabs.Tab>
        <Tabs.Tab
          label="Images & videos"
          icon={<BsImage size={14} />}
        ></Tabs.Tab>
      </Tabs>
    </Group>
  );
>>>>>>> 85a5591c2976b2543d0edcd3e391fc4cf0511eaf
}
const MyDrafts = () => {
	return (
		<Paper style={{ width: 245 }} shadow="xs" p="lg" pt={20}>
			<Text weight={700}>My drafts</Text>
			<Divider size="xs" my={13} />
			<Text size="xs" sx={{ textAlign: "center" }}>
				Your drafts will be here
			</Text>
		</Paper>
	);
};
const rules = [
	{ title: "No illegal content", content: "No ilslds" },
	{ title: "No harrasments", content: "No ilslds" },
	{ title: "No sexual content", content: "No ilslds" },
	{ title: "Self promo is accaptable, within reason", content: "No ilslds" },
];
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
		padding: "12px 17.8px 12px 12px",
	},

	item: {
		borderBottom: 0,
		overflow: "hidden",
		transition: `box-shadow 150ms ${theme.transitionTimingFunction}`,
		borderBottom: "1px solid transparent",
		borderRadius: theme.radius.sm,
		borderColor:
			theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[3],
		marginBottom: 8,
		fontSize: 12,
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
function StyledAccordion(props) {
	const { classes } = useStyles();
	return (
		<Accordion
			mt={35}
			iconSize={12}
			multiple
			iconPosition="right"
			classNames={classes}
			{...props}
		/>
	);
}
function AccordionLabel({ title, i }) {
	return (
		<Group noWrap>
			<Text>
				{i}.{title}
			</Text>
		</Group>
	);
}
const items = rules.map((item, i) => (
	<Accordion.Item label={<AccordionLabel {...item} />} key={item.title}>
		{item.content}
	</Accordion.Item>
));
const Rules = () => {
	return (
		<Paper style={{ width: 245 }} shadow="xs" p="lg" pt={20}>
			<Text weight={700}>Community post rules</Text>
			<StyledAccordion iconSize={12}>{items}</StyledAccordion>
		</Paper>
	);
};
export default PostForm;
