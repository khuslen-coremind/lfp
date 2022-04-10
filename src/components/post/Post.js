import {
  TextInput,
  Group,
  Button,
  createStyles,
  Collapse,
  Avatar,
  Text,
  ActionIcon,
  Box,
  Divider,
} from "@mantine/core";
// import { GasStation, Gauge, ManualGearbox, Users } from "tabler-icons-react";
import {
  BsCaretUpFill,
  BsCaretDownFill,
  BsCaretUp,
  BsCaretDown,
  BsChatLeftText,
  BsChevronCompactUp,
  BsChatSquare,
  BsEyeSlash,
  BsFlag,
  BsHeart,
  BsDash,
} from "react-icons/bs";
import { VscReply } from "react-icons/vsc";
import { AiOutlineShareAlt } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { useState } from "react";
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
  body: {
    paddingTop: theme.spacing.sm,
  },
}));
const PostInput = { flexGrow: 1 };

function Post(props) {
  const { postData } = props;
  const { classes } = useStyles();
  const [opened, setOpen] = useState(false);
  const collapse = (e) => {
    setOpen(!opened);
  };
  const author = {
    image:
      "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "loremipsum",
  };
  const body =
    "I use Heroku to host my Node.js application, but MongoDB add-on appears to be too expensive. I consider switching to Digital Ocean VPS to save some cash.";
  const postedAt = "10 minutes ago";
  return (
    <Group
      // position="apart" p="xs"
      className={classes.button}
      // pr={17} pl={16}
    >
      <Group
        direction="column"
        align="center"
        spacing={5}
        className={classes.vote}
        px={10}
        pt={8}
      >
        <ActionIcon>
          <BsCaretUp size={22} />
        </ActionIcon>
        <Text weight="bold">{postData.voteCount}</Text>
        <ActionIcon>
          <BsCaretDown size={22} />
        </ActionIcon>
      </Group>
      <Group
        pl={19}
        pt={9}
        pr={15}
        pb={10}
        sx={{ flexGrow: 1 }}
        // sx={{ maxHeight: 153 }}
      >
        <Group direction="column" sx={{ flexGrow: 1, width: "min-content" }}>
          <Group direction="column" spacing={2}>
            <Text weight="lighter" size="sm">
              Posted by {postData.userName} <b>{postData.postedOn}</b> ago
            </Text>
            <Group direction="column" spacing={0}>
              <Text mt={16} size="xl">
                {postData.title}
              </Text>
              <Text mt={16} underline variant="link">
                {postData.content}
              </Text>
            </Group>
          </Group>
          <Group spacing={0} position="apart" sx={{ width: "100%" }}>
            <Group>
              <Button
                px={11}
                leftIcon={<BsChatSquare style={{ marginTop: 1 }} />}
                variant="subtle"
                onClick={collapse}
              >
                {postData.comments.length} Comments
              </Button>
              <Button px={11} leftIcon={<AiOutlineShareAlt />} variant="subtle">
                Share{" "}
              </Button>
              <Button px={11} leftIcon={<BsEyeSlash />} variant="subtle">
                Hide
              </Button>
            </Group>
            <Button pr={11} leftIcon={<BsFlag />} variant="light">
              Report
            </Button>
          </Group>
          <Collapse in={opened} sx={{ maxWidth: "95%" }}>
            <div>
              <Group>
                <Avatar
                  src={author.image}
                  alt={author.name}
                  radius="sm"
                  size={25}
                />
                <Text size="md" pb="xs" weight={500}>
                  {author.name}
                </Text>
                <Text size="xs" color="dimmed" pb="xs">
                  {postedAt}
                </Text>
                <ActionIcon sx={{ marginLeft: "auto" }}>
                  <BsDash />
                </ActionIcon>
              </Group>

              <Text className={classes.body} size="xs">
                {body}
              </Text>
              <Group
                className={classes.body}
                spacing={3}
                sx={{ marginLeft: "auto" }}
              >
                <Text weight="lighter">{postData.voteCount}</Text>
                <ActionIcon>
                  <BsHeart />
                </ActionIcon>
                <Button
                  compact
                  rightIcon={<VscReply />}
                  variant="subtle"
                  color="dark"
                >
                  Reply
                </Button>
              </Group>
            </div>
          </Collapse>
          {opened && (
            <>
              <Divider size="xs" color="dark" />
              <Box>
                <ActionIcon variant="default">
                  <BsChevronCompactUp size={16} />
                </ActionIcon>
              </Box>
            </>
          )}
        </Group>
      </Group>
    </Group>
  );
}

export default Post;
