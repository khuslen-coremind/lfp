import {
	Group,
	// createStyles,
	Text,
	Box,
} from "@mantine/core";
import { BsMic, BsHeadset, BsHeadphones } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
// const useStyles = createStyles((theme) => ({}));

function Hub(props) {
	// const { classes } = useStyles();

	const tools = [
		<BsHeadphones size={10} fill="#FFFFFF" style={{ marginTop: 3 }} />,
		<BsHeadset size={10} fill="#FFFFFF" style={{ marginTop: 3 }} />,
		<BsMic size={10} fill="#FFFFFF" style={{ marginTop: 3 }} />,
		// <FaDiscord size={10} fill="#FFFFFF" />,
	];
	return (
		<>
			<Box mt={45}>
				<Text mb={16}>Recent Activities</Text>
			</Box>

			<Box mt={45}>
				<Text mb={16}>Games that you follow</Text>
			</Box>
		</>
	);
}

export default Hub;
