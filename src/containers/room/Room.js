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
} from "@mantine/core";
import { useState, useEffect } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { RiGameLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import UserBadge from "../../components/userBadge/UserBadge";
import Tools from "../../components/tools/Tools";
import { io } from "socket.io-client";
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
  const sendMessage = () => {
    if (currentMsgText !== "") {
      const messageData = {
        room: "1",
        author: "author1",
        authorId: "me",
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
      socket.emit("send_message", messageData);
      setRoomMessages((messages) => [...messages, messageData]);
      setCurrentMsgText("");
    }
  };
  let navigate = useNavigate();
  const handleMessageText = (e) => {
    setCurrentMsgText(e.target.value);
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
    root: { padding: "0 15px", height: 580 },
    viewport:
      roomMessages.length === 0
        ? { display: "flex ", alignItems: "center" }
        : { boxAlign: "end", boxOrient: "vertical", boxPack: "end" },
  };
  return (
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
                  root: { padding: "0 15px", height: 580 },
                  viewport:
                    roomMessages.length === 0
                      ? { display: "flex ", alignItems: "center" }
                      : "",
                }}
              >
                {roomMessages.length === 0 ? (
                  <Group position="center" direction="column" spacing="sm">
                    <Group spacing={4}>
                      <RiGameLine size={28} color="gray" />
                      <Text size="sm" color="gray">
                        Nobody sent message here.
                      </Text>
                    </Group>
                    <Text size="sm" color="gray">
                      Be the first one to start conversation about this room!
                    </Text>
                  </Group>
                ) : (
                  roomMessages.map((e) => {
                    return <RoomMessage key={e.sentAt} message={e.message} />;
                  })
                )}
              </ScrollArea>
            </Paper>
            <Group style={{ width: "100%" }} mt="xs">
              <TextInput
                sx={{ flexGrow: 1 }}
                value={currentMsgText}
                onChange={handleMessageText}
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

const RoomMessage = ({ user, message }) => {
  return (
    <Group noWrap mt="xs" style={{ width: "100%" }}>
      <Avatar
        radius="xl"
        // src={user.pfp}
        src=""
        color="dark"
        alt="no image here"
        size={45}
      />
      <Text
        style={{
          backgroundColor: "#CECECE",
          padding: "7px 15px",
          borderRadius: 8,
          borderBottomLeftRadius: 0,
          width: "fit-content",
        }}
      >
        {message}
      </Text>
    </Group>
  );
};
export default Room;
