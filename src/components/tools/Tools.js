import { Group, createStyles, Box } from "@mantine/core";
import { BsMic, BsHeadset, BsHeadphones } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";

const useStyles = createStyles((theme) => ({}));

function Tools(props) {
	const { classes } = useStyles();

	const tools = [
		<BsHeadphones size={10} fill="#FFFFFF" style={{ marginTop: 3 }} />,
		<BsHeadset size={10} fill="#FFFFFF" style={{ marginTop: 3 }} />,
		<BsMic size={10} fill="#FFFFFF" style={{ marginTop: 3 }} />,
		// <FaDiscord size={10} fill="#FFFFFF" />,
	];
	return (
		<Group position="center" mt="sx" spacing={5} style={{ height: "min-content" }}>
			{tools.map((e) => {
				return (
					<Box
						sx={(theme) => ({
							backgroundColor:
								theme.colorScheme === "dark"
									? theme.colors.dark[6]
									: theme.colors.gray[0],
							textAlign: "center",
							padding: "0px 6px",
							borderRadius: 11,
							backgroundColor: "#615F5F",
							fontFamily: "monospace",
						})}>
						{e}
					</Box>
				);
			})}
			<div
				style={{
					textAlign: "center",
					padding: "0px 6px",
					borderRadius: 11,
					backgroundColor: "#5865F2",
					fontFamily: "monospace",
				}}>
				<FaDiscord style={{ marginTop: 3 }} size={10} fill="#FFFFFF" />
			</div>
		</Group>
	);
}

export default Tools;
