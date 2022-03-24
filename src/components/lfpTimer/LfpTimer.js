import { Group, createStyles} from "@mantine/core";
import { BsClock } from "react-icons/bs";
import { Text } from "@mantine/core";
const useStyles = createStyles((theme) => ({
  now: {
    padding: "2px 6px",
    borderRadius: 30,
    backgroundColor: "#1CC300",
  },
  time: {
    padding: "2px 6px",
    borderRadius: 30,
    backgroundColor: "#63009F",
  },
}));

function LfpTimer({ roomDetail }) {
  const { classes } = useStyles();
  return (
    <Group
      position="center"
      mt="sx"
      spacing={5}
      className={
        roomDetail.targetTime.toUpperCase() === "NOW"
          ? classes.now
          : classes.time
      }
    >
      <Text color="white" pl={7} pb={1} weight={600}>
        {roomDetail.targetTime}
      </Text>
      <BsClock size={16} fill="#FFF" style={{ marginRight: 5 }} />
    </Group>
  );
}

export default LfpTimer;
