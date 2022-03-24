import { Text, Group, Button, createStyles } from "@mantine/core";
// import { GasStation, Gauge, ManualGearbox, Users } from "tabler-icons-react";
import { BsPeople } from "react-icons/bs";
const useStyles = createStyles((theme) => ({
	button: {
		background: "#A001",
		borderRadius: 4,
	},
}));

function CreateRoom(props) {
	const { classes } = useStyles();
	return (
		<Group position="apart" p="xs" className={classes.button}>
			<Text>Create a waiting room for your party</Text>
			<Button rightIcon={<BsPeople />}>MAKE A ROOM</Button>
		</Group>
	);
}

export default CreateRoom;
