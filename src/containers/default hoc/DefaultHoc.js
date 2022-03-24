// import logo from "./logo.svg";
import { AppShell, Container, createStyles, Text, Box } from "@mantine/core";
// import DefaultHeader from "./components/headers/DefaultHeader";
import UserHeader from "../../components/headers/UserHeader";
const useStyles = createStyles((theme) => ({
	container: {
		display: "flex",
		justifyContent: "space-around",
		maxWidth: 1320,
	},
}));
function DefaultHoc(props) {
	const { classes } = useStyles();
	return (
		<AppShell
			padding="md"
			header={<UserHeader />}
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			})}>
			{/* Your application here */}
			<Container className={classes.container}>{props.children}</Container>
		</AppShell>
	);
}

export default DefaultHoc;
