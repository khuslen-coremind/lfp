// import logo from "./logo.svg";
import {
  createStyles,
  Text,
  Box,
  Group,
  Select,
  TextInput,
  Tabs,
} from "@mantine/core";
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
          Share <b>anything</b> related to the community
        </Text>
      </Group>
      {/* <label htmlFor="title">
				{" "}
				<Text weight="bold">Title</Text>
			</label> */}
      <TextInput
        // id="title"
        width="100%"
      ></TextInput>
      <Tabs>
        <Tabs.Tab label="Text" icon={<BsCardText size={14} />}></Tabs.Tab>
        <Tabs.Tab
          label="Images & videos"
          icon={<BsImage size={14} />}
        ></Tabs.Tab>
      </Tabs>
    </Group>
  );
}

export default PostForm;
