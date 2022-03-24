import {
  Text,
  Group,
  Button,
  createStyles,
  Input,
  Avatar,
} from "@mantine/core";
// import { GasStation, Gauge, ManualGearbox, Users } from "tabler-icons-react";
import { BsPen } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
const useStyles = createStyles((theme) => ({
  button: {
    border: "1px solid #e9ecef",
    background: "#fff",
    borderRadius: 4,
  },
}));

function CreateFeed(props) {
  const { classes } = useStyles();
  return (
    <Group position="apart" p="xs" className={classes.button} pr={17} pl={16}>
      <Avatar
        size={35}
        src="https://i.pinimg.com/736x/ab/75/46/ab754671e4b62d109fcf4d76aec8b4df--anime-manga-saitama.jpg"
      />
      <Input placeholder="Create post"></Input>
      <Button
        px={15}
        pr={14}
        rightIcon={
          <IconContext.Provider
            value={{
              style: { marginLeft: -2, fontSize: 13 },
            }}
          >
            <BsPen />
          </IconContext.Provider>
        }
      >
        WRITE
      </Button>
    </Group>
  );
}

export default CreateFeed;
