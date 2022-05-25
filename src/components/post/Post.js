import {
  Group,
  Button,
  createStyles,
  Collapse,
  Avatar,
  Text,
  ActionIcon,
  Box,
  Paper,
  Divider,
  Image,
  Menu,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";

// import { GasStation, Gauge, ManualGearbox, Users } from "tabler-icons-react";
import {
  BsCaretUp,
  BsCaretDown,
  BsCaretUpFill,
  BsCaretDownFill,
  BsChevronCompactUp,
  BsEyeSlash,
  BsFlag,
  BsHeart,
  BsDash,
} from "react-icons/bs";
import { VscReply } from "react-icons/vsc";
import { AiOutlineShareAlt } from "react-icons/ai";
import { RiGameFill } from "react-icons/ri";
import { useState } from "react";
import moment from "moment";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { IoChatbox } from "react-icons/io5";
import { AiOutlineLink } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import ReactPlayer from "react-player";
import parse from "html-react-parser";
import axios from "axios";
import { API_URL } from "../../constants/request";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

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
    background: theme.colors.gray[2],
  },
  body: {
    paddingTop: theme.spacing.sm,
  },
}));
const PostInput = { flexGrow: 1 };
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function Post({ key, postData, onDelete }) {
  const { isAuthenticated, userId } = useContext(AuthContext);
  const { classes } = useStyles();
  const [opened, setOpen] = useState(false);
  const [hasUpVotedBefore, setHasUpVotedBefore] = useState(
    postData.hasUpVoted ? true : false
  );
  const [hasDownVotedBefore, setHasDownVotedBefore] = useState(
    postData.hasDownVoted ? true : false
  );
  const [hasUpVoted, setHasUpVoted] = useState(false);
  const [hasDownVoted, setHasDownVoted] = useState(false);
  const [totalVote, setTotalVote] = useState(
    parseInt(postData.totalVotes[0]["total"])
  );
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
  const handlePostDeletion = (id) => (e) => {
    onDelete(id);
  };
  const handleVote = (id, isUpVote) => (e) => {
    console.log("vote", postData.hasUpVoted, postData.hasDownVoted, isUpVote);
    if (isAuthenticated) {
      const requestData = { vote: isUpVote ? 1 : -1, postId: id };
      const config = {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      };
      axios
        .post(`http://${API_URL}/api/poll/post/${id}`, requestData, config)
        .then((response) => {
          if (response.status === 200) {
            setTotalVote(response.data.totalVotes[0]["total"]);
            if (isUpVote) {
              if (hasUpVotedBefore === true || hasUpVoted) {
                setHasUpVotedBefore(false);
                setHasUpVoted(false);
              } else {
                if (hasDownVotedBefore === true || hasDownVoted) {
                  setHasUpVoted(true);
                  setHasDownVotedBefore(false);
                  setHasDownVoted(false);
                } else {
                  setHasUpVoted(true);
                }
              }
            } else {
              if (hasDownVotedBefore === true || hasDownVoted) {
                setHasDownVotedBefore(false);
                setHasDownVoted(false);
              } else {
                if (hasUpVotedBefore === true || hasUpVoted) {
                  setHasDownVoted(true);
                  setHasUpVotedBefore(false);
                  setHasUpVoted(false);
                } else {
                  setHasDownVoted(true);
                }
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      showNotification({
        id: "unauth",
        disallowClose: true,
        autoClose: 7000,
        title: "Unauthorized ;-;",
        message:
          "Please login if you already have an account OR you can create one! 😉",
        color: "green",
        icon: <RiGameFill size={18} />,
        loading: false,
      });
    }
  };
  return (
    <Paper
      key={key}
      // position="apart" p="xs"
      className={classes.button}
      // pr={17} pl={16}
    >
      {/* {JSON.stringify(postData)} */}
      <Group
        direction="column"
        align="center"
        spacing={5}
        className={classes.vote}
        px={10}
        pt={8}
      >
        <ActionIcon onClick={handleVote(postData.postInfo.id, true)}>
          {hasUpVotedBefore || hasUpVoted ? (
            <BsCaretUpFill size={22} color="#5D62EA" />
          ) : (
            <BsCaretUp size={22} />
          )}
        </ActionIcon>

        <Text weight="bold">{totalVote}</Text>

        <ActionIcon onClick={handleVote(postData.postInfo.id, false)}>
          {hasDownVotedBefore || hasDownVoted ? (
            <BsCaretDownFill size={22} color="#FF7033" />
          ) : (
            <BsCaretDown size={22} />
          )}
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
          <Group direction="column" spacing={2} sx={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "inherit",
                justifyContent: "space-between",
              }}
            >
              <Text weight="lighter" size="sm">
                Posted by <b>{postData.postInfo.user.username} </b>
                {moment(postData.postInfo.updatedAt).fromNow()}
              </Text>
              {postData.postInfo.userId.toString() === getCookie("userId") ? (
                <Menu
                  withArrow
                  placement="center"
                  control={
                    <ActionIcon variant="hover" mr={-4}>
                      <BsThreeDotsVertical size={16} />
                    </ActionIcon>
                  }
                  styles={{
                    body: { width: "fit-content" },
                    label: { color: "red" },
                    itemHovered: { backgroundColor: "#ececec " },
                  }}
                >
                  <Menu.Item
                    color="red"
                    icon={
                      <MdDelete
                        size={16}
                        // component={Link} to="/hello"
                      />
                    }
                    onClick={handlePostDeletion(postData.postInfo.id)}
                  >
                    Delete post
                  </Menu.Item>
                </Menu>
              ) : null}
            </div>

            <Group direction="column" spacing={0} sx={{ width: "100%" }}>
              <Text mt={16} size="xl" weight={600}>
                {postData.postInfo.title}
              </Text>
              {postData.postInfo.isText ? (
                <Text mt={15} color="gray" weight={500}>
                  {parse(postData.postInfo.textContent)}
                </Text>
              ) : postData.postInfo.contentUrl.slice(-3) === "mp4" ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "95%",
                    paddingRight: 10,
                    paddingLeft: 10,
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  {" "}
                  <ReactPlayer
                    style={{
                      backgroundColor: "black",
                      borderRadius: 4,
                      paddingBottom: 3,
                    }}
                    light
                    pip
                    height={250}
                    width="100%"
                    controls
                    url={postData.postInfo.contentUrl}
                  />
                </div>
              ) : (
                <Image
                  fit="contain"
                  mt={15}
                  radius="sm"
                  src={postData.postInfo.contentUrl}
                  alt={postData.postInfo.contentUrl}
                />
              )}
            </Group>
          </Group>
          <Group spacing={0} position="apart" sx={{ width: "100%" }}>
            <Group>
              {/* <Button
								px={11}
								leftIcon={<BsChatSquare style={{ marginTop: 1 }} />}
								variant="subtle"
								onClick={collapse}>
								{postData.comments.length} Comments
							</Button> */}
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
                <Text weight="lighter">{postData.totalVotes[0]["total"]}</Text>
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
    </Paper>
  );
}

export default Post;
