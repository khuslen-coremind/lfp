// import logo from "./logo.svg";
import { createStyles, Text, Box, Group, Select, TextInput, Tabs } from "@mantine/core";
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
					Share <Text weight="bold">anything</Text> related to the community
				</Text>
				<Select></Select>
			</Group>
			{/* <label htmlFor="title">
				{" "}
				<Text weight="bold">Title</Text>
			</label> */}
			<TextInput
				// id="title"
				width="100%"></TextInput>
			<Tabs>
				<Tabs.Tab label="Chat" icon={<BsCardText size={14} />}>
					Text
				</Tabs.Tab>
				<Tabs.Tab label="Settings" icon={<BsImage size={14} />}>
					Images & videos
				</Tabs.Tab>
			</Tabs>
		</Group>
	);
}

export default PostForm;
