import { TextInput, Group, Button, createStyles, Avatar } from "@mantine/core";
// import { GasStation, Gauge, ManualGearbox, Users } from "tabler-icons-react";
import { BsPen } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
const useStyles = createStyles((theme) => ({
  button: {
    border: "1px solid #e9ecef",
    background: "#fff",
    borderRadius: 4,
  },
}));
const PostInput = { flexGrow: 1 };
function CreatePost(props) {
  const { classes } = useStyles();
  let navigate = useNavigate();
  return (
    <div>
      <Group position="apart" p="xs" className={classes.button} pr={17} pl={16}>
        <Avatar
          size={35}
          src="https://i.pinimg.com/736x/ab/75/46/ab754671e4b62d109fcf4d76aec8b4df--anime-manga-saitama.jpg"
        />
        <TextInput
          onClick={() => navigate("/create/post")}
          placeholder="Create post"
          variant="filled"
          aria-label="Create post input"
          sx={PostInput}
        />
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
          onClick={(e) => navigate("/create/post")}
        >
          WRITE
        </Button>
      </Group>
    </div>
  );
}

export default CreatePost;
