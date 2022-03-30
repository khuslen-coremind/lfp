import {
  TextInput,
  Group,
  Button,
  createStyles,
  Input,
  Avatar,
  Text,
  ActionIcon,
  Box,
  SelectChevronIcon,
} from "@mantine/core";
// import { GasStation, Gauge, ManualGearbox, Users } from "tabler-icons-react";
import {
  BsCaretUpFill,
  BsCaretDownFill,
  BsCaretUp,
  BsCaretDown,
  BsChatLeftText,
  BsChatSquare,
  BsEyeSlash,
  BsFlag,
} from "react-icons/bs";
import { AiOutlineShareAlt } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
const useStyles = createStyles((theme) => ({
  button: {
    border: "1px solid #e9ecef",
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "stretch",
    marginTop: 10,
  },
  vote: {
    background: "#00000010",
  },
}));
const PostInput = { flexGrow: 1 };
function PostForm(props) {
  const { postData } = props;
  const { classes } = useStyles();
  return (
    <Box>
      <Group direction="column">
        <Group>
          <Text>Share anything related to the commmunity</Text>
          <SelectChevronIcon></SelectChevronIcon>
        </Group>
      </Group>
    </Box>
  );
}

export default PostForm;
