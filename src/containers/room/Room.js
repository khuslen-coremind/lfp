// import logo from "./logo.svg";
import {
  Text,
  Paper,
  Group,
  TextInput,
  Box,
  Button,
  Avatar,
  Stack,
  ScrollArea,
  Spoiler,
  ActionIcon,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { IoReturnUpBack } from "react-icons/io5";
import { RiGameLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import UserBadge from "../../components/userBadge/UserBadge";
import Tools from "../../components/tools/Tools";
import { io } from "socket.io-client";
import axios from "axios";
import { url } from "../../constants/request";
const socket = io("http://localhost:8000");

function Room(props) {
  const roomLink = window.location.href;
  const date = new Date(Date.now());
  const [currentMsgText, setCurrentMsgText] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setRoomMessages((messages) => [...messages, data]);
    });
  }, [socket]);

  const handlePrevious = (e) => {
    e.preventDefault();
    navigate("../");
  };
  const userId = "me1";

  const sendMessage = () => {
    if (currentMsgText !== "") {
      const messageData = {
        room: "1",
        author: "author1",
        authorId: "me1",
        message: currentMsgText,
        sentAt:
          (date.getHours() < 10 ? "0" : "") +
          date.getHours() +
          ":" +
          (date.getMinutes() < 10 ? "0" : "") +
          date.getMinutes() +
          ":" +
          (date.getSeconds() < 10 ? "0" : "") +
          date.getSeconds(),
      };
      setCurrentMsgText("");
      axios
        .post(`${url}/api/postMessage`)
        .then((res) => {
          socket.emit("send_message", messageData);
          setRoomMessages((messages) => [...messages, messageData]);
        })
        .catch((error) => console.log(error));
    }
  };
  let navigate = useNavigate();
  const handleMessageText = (e) => {
    setCurrentMsgText(e.target.value);
  };
  const handleEnterKeyOnMessage = (e) => {
    if (e.keyCode === 13) sendMessage();
  };
  const roomData = {
    userName: "sadas",
    gameName: "dota",
    title: "ahem nvm",
    description:
      "oin, I will be waitingoin, I will be waitingoin, I will be waiting",
    rank: "https://raw.githubusercontent.com/Soneliem/WAIUA/master/Demo/images/ranksimg/13.png",
    tools: {
      discord: true,
    },
    targetTime: "21 : 00",
    partyMembersCount: 4,
    badge: "try harder",
  };
  const scrollStyle = {
    root: { padding: "0 15px", height: "100vh-800px" },
    viewport:
      roomMessages.length === 0
        ? { display: "flex ", alignItems: "center" }
        : { boxAlign: "end", boxOrient: "vertical", boxPack: "end" },
  };
  return (
    <div style={{ position: "relative" }}>
      <ActionIcon
        onClick={() => navigate(-1)}
        style={{ position: "absolute", left: -65 }}
      >
        <IoReturnUpBack size={55} />
      </ActionIcon>
      <div style={{ maxWidth: 960, width: 960 }}>
        <Group direction="column" spacing="xs" style={{ width: "100%" }}>
          <Paper
            withBorder
            shadow="lg"
            p="xs"
            pl="md"
            style={{ width: "inherit" }}
          >
            <Group spacing="xl" position="apart">
              <Group>
                <Avatar src="https://i.pinimg.com/736x/ab/75/46/ab754671e4b62d109fcf4d76aec8b4df--anime-manga-saitama.jpg" />
                <Group direction="column" spacing={0}>
                  <Group spacing={5}>
                    <Text size="lg" weight={500}>
                      {roomData.userName}
                    </Text>
                    <Text size="xs" weight="lighter">
                      <i>LFP</i>
                    </Text>
                    <img
                      height={15}
                      width={15}
                      src="https://images.cults3d.com/4QqRV9kLYYEuw9ur_X3yjQl1sjk=/516x516/https://files.cults3d.com/uploaders/15024335/illustration-file/a86d53e4-2bd9-4a8f-9550-986686c3131a/gi0mAjIh_400x400.png"
                      alt="game logo"
                    />
                  </Group>
                  <UserBadge badge={roomData.badge} />
                </Group>
              </Group>
              <Group
                direction="column"
                spacing={0}
                // style={{ maxWidth: 370 }}
                style={{ maxWidth: "65%" }}
                align="center"
              >
                <Text weight={500}>{roomData.title}</Text>
                <Spoiler maxHeight={55} showLabel="Show more" hideLabel="Hide">
                  <Text size="xs" lineClamp={3}>
                    {roomData.description}
                  </Text>
                </Spoiler>
              </Group>
              <Group direction="column" spacing="xs" position="center" pr="xs">
                <Box
                  py={5}
                  px={15}
                  // mb={10}
                  style={{
                    // background: "black",
                    borderRadius: 8,
                  }}
                >
                  <Text size="lg" weight={500}>
                    {roomData.targetTime}
                  </Text>
                </Box>
                <Tools />
              </Group>
            </Group>
          </Paper>
          <div style={{ display: "flex", width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "75%",
              }}
            >
              <Paper withBorder style={{ flexGrow: 1 }} pb="xs">
                <ScrollArea
                  styles={{
                    root: {
                      padding: "0 15px",
                      minHeight: 400,
                      height: "calc(100vh - 400px)",
                    },
                    viewport:
                      roomMessages.length === 0
                        ? { display: "flex ", alignItems: "center" }
                        : "",
                  }}
                >
                  {roomMessages.length === 0 ? (
                    <Group position="center" direction="column" spacing="sm">
                      <Group spacing={4}>
                        <RiGameLine size={28} color="#C0C0C0" />
                        <Text size="sm" color="#C0C0C0" weight={500}>
                          Nobody sent message here.
                        </Text>
                      </Group>
                      <Text size="sm" color="#C0C0C0" weight={500}>
                        Be the first one to start conversation about this room!
                      </Text>
                    </Group>
                  ) : (
                    roomMessages.map((e) => {
                      return (
                        <RoomMessage
                          key={e.authorId + e.sentAt}
                          authorId={e.authorId}
                          message={e.message}
                        />
                      );
                    })
                  )}
                </ScrollArea>
              </Paper>
              <Group style={{ width: "100%" }} mt="xs">
                <TextInput
                  sx={{ flexGrow: 1 }}
                  value={currentMsgText}
                  onChange={handleMessageText}
                  onKeyDown={handleEnterKeyOnMessage}
                />
                <Button rightIcon={<FiSend size={18} />} onClick={sendMessage}>
                  SEND
                </Button>
              </Group>
            </div>
            <Paper
              shadow="lg"
              style={{ width: "25%", maxWidth: "25%", height: "max-content" }}
              py="sm"
              px="xs"
              ml="sm"
              withBorder
            >
              <RoomMembers roomLink={roomLink} />
            </Paper>
          </div>
        </Group>
        {/* <Container>
        <Rules />
      </Container> */}
      </div>
    </div>
  );
}
const RoomMembers = ({ roomLink }) => {
  return (
    <Group direction="column" position="center">
      <Text size="lg"> Who is here?</Text>
      <Stack style={{ width: "100%" }} spacing="sm">
        <User
          user={{
            imgSrc:
              "https://practicaltyping.com/wp-content/uploads/2020/08/gon.png",
            name: "hihe",
          }}
        />
        <User
          user={{
            imgSrc:
              "https://i.pinimg.com/originals/21/69/09/2169093223010c16908cdc5e6102b65a.jpg",
            name: "killer killua",
          }}
        />
        <User
          user={{
            imgSrc:
              "https://static.scientificamerican.com/sciam/cache/file/B4520B4E-BCC1-411C-BEC6541928BDB992_source.jpg?w=590&h=800&9DD618C2-44B0-4723-A4E1CF610359A966",
            name: "qtiepie",
          }}
        />
        <Invitation roomLink={roomLink} />
      </Stack>
    </Group>
  );
};

const User = ({ user }) => {
  return (
    <Group noWrap style={{ paddingLeft: 5, paddingRight: 5 }}>
      <Avatar size={30} radius="xl" src={user.imgSrc} />
      <Text pr="xs" lineClamp={1} size="xs" weight={500}>
        {user.name}
      </Text>
    </Group>
  );
};
const Invitation = ({ roomLink }) => {
  return (
    <Button
      size="xs"
      style={{
        marginTop: 10,
        padding: 0,
      }}
      leftIcon={<AiOutlineLink size={18} />}
      variant="white"
      onClick={() => {
        navigator.clipboard.writeText(roomLink);
      }}
    >
      Copy room link
    </Button>
  );
};

const RoomMessage = ({ key, authorId, message }) => {
  const userId = "me1";
  return authorId === userId ? (
    <Group
      noWrap
      mt="xs"
      style={{ width: "100%" }}
      position="right"
      spacing="xs"
      key={key}
    >
      <Text
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[3],
          padding: "7px 15px",
          paddingRight: "13px",
          borderRadius: 16,
          width: "fit-content",
          fontSize: "0.9rem",
          borderBottomRightRadius: 3,
        })}
      >
        {message}
      </Text>
      <Avatar
        radius="xl"
        // src={user.pfp}
        src=""
        alt="no image here"
        size={45}
      />
    </Group>
  ) : (
    <Group noWrap mt="xs" style={{ width: "100%" }} key={key}>
      <Avatar
        radius="xl"
        // src={user.pfp}
        src=""
        alt="no image here"
        size={45}
      />
      <Text
        color="white"
        sx={(theme) => ({
          backgroundColor: theme.colors.yellow[5],
          padding: "7px 15px",
          paddingLeft: "13px",
          borderRadius: 16,
          width: "fit-content",
          fontSize: "0.9rem",
          borderBottomLeftRadius: 3,
        })}
      >
        {message}
      </Text>
    </Group>
  );
};
export default Room;
