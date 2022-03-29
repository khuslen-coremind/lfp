import { Text, Group, Button, createStyles } from "@mantine/core";
// import { GasStation, Gauge, ManualGearbox, Users } from "tabler-icons-react";
import { BsPeople } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
const useStyles = createStyles((theme) => ({
	button: {
		border: "1px solid #e9ecef",
		background: "#fff",

		borderRadius: 4,
	},
}));

function CreateRoom(props) {
	const { classes } = useStyles();
	return (
		<Group position="apart" p="xs" className={classes.button} pr={14} pl={29}>
			<Text size={15} mb={2}>
				Create a waiting room for your party
			</Text>

			<Button
				px={13}
				pr={14}
				rightIcon={
					<IconContext.Provider
						value={{ style: { marginLeft: 0, fontSize: 15, marginBottom: -1 } }}>
						<BsPeople />
					</IconContext.Provider>
				}>
				MAKE A ROOM
			</Button>
		</Group>
	);
}

export default CreateRoom;