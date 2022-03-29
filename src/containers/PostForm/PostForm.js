// import logo from "./logo.svg";
import {
	createStyles,
	Text,
	Box,
	Group,
	Select,
	TextInput,
	Tabs,
	Textarea,
	Button,
} from "@mantine/core";
import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";
// import DefaultHeader from "./components/headers/DefaultHeader";
import { BsCardText, BsImage } from "react-icons/bs";
import Uploader from "../../components/uploader/Uploader";
import { useNavigate } from "react-router-dom";
const useStyles = createStyles((theme) => ({
	container: {
		display: "flex",
		justifyContent: "space-around",
		maxWidth: 1320,
	},
}));

function PostForm(props) {
	const handlePrevious = (e) => {
		e.preventDefault();
		navigate("../");
	};
	let navigate = useNavigate();
	const initialValue = "<p>any <a >link</a>, plain text</p>";
	const [value, onChange] = useState(initialValue);
	const { classes } = useStyles();

	return (
		<Group
			direction="column"
			style={{ width: "100%", justifyContent: "center" }}
			position="apart">
			<Group>
				<Text>
					Share <b>anything</b> related to the community
				</Text>
				<Select
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
				size="lg"
				label="Title"
				style={{ flexGrow: 1 }}
			/>
			<Tabs>
				<Tabs.Tab label="Text" icon={<BsCardText size={14} />}>
					<RichTextEditor value={value} onChange={onChange} />
				</Tabs.Tab>
				<Tabs.Tab label="Images & videos" icon={<BsImage size={14} />}>
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
	);
}

export default PostForm;
