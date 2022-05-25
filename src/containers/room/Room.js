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
  Image,
  Loader,
} from "@mantine/core";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { IoReturnUpBack } from "react-icons/io5";
import { RiGameLine } from "react-icons/ri";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import UserBadge from "../../components/userBadge/UserBadge";
import Tools from "../../components/tools/Tools";
import { io } from "socket.io-client";
import axios from "axios";
import { API_URL } from "../../constants/request";
import dotaPng from "../../../src/images/gamesPictures/dota2.png";
import lolPng from "../../../src/images/gamesPictures/lol.png";
import csgoPng from "../../../src/images/gamesPictures/csgo32.png";
import valorantPng from "../../../src/images/gamesPictures/valorant.png";
import genshintPng from "../../../src/images/gamesPictures/genshin200.jpeg";
import mlPng from "../../../src/images/gamesPictures/ml.png";
import pubgmPng from "../../../src/images/gamesPictures/pubgm.png";
import moment from "moment";
import LfpTimer from "../../components/lfpTimer/LfpTimer";
import { useQueries, useQuery, useQueryClient } from "react-query";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

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

let socket;

function Room(props) {
  const { userId, username } = useContext(AuthContext);
  const { roomId } = useParams();
  const roomLink = window.location.href;
  const date = new Date(Date.now());
  const [roomMessages, setRoomMessages] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(false);
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);

  let navigate = useNavigate();
  const gameIdPicPair = {
    1: dotaPng,
    2: lolPng,
    3: csgoPng,
    4: valorantPng,
    5: genshintPng,
    6: mlPng,
    7: pubgmPng,
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const getMessageHistory = async () => {
    const response = await fetch(`http://${API_URL}/api/chat/${roomId}`);
    const message = await response.json();
    return message.messages;
  };

  const getRoomDetail = async () => {
    const res = await fetch(`http://${API_URL}/api/room/${roomId}`);
    const room = await res.json();
    return room.room;
  };
  const { isLoading, isError, data, error } = useQuery(
    "roomInfo",
    getRoomDetail
  );

  useEffect(() => {
    getMessageHistory()
      .then((results) => {
        // if ((results = [])) {
        //   setRoomMessages([]);
        // } else {
        setRoomMessages(results);
        // }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    socket = io(`http://${API_URL}`);

    if (username && username) {
      socket.emit("join_room", { userId, roomId, username }, () => {});

      return () => {
        socket.emit("disconnect");
      };
    }
  }, [userId, socket]);

  useEffect(() => {
    socket.current.on("message", (data) => {
      console.log(data);
      setRoomMessages((messages) => [...messages, data]);
    });
  }, [roomMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [roomMessages]);

  const handlePrevious = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const onMessageSend = (e, roomId) => {
    e.preventDefault();
    if (messageText !== "") {
      const config = {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      };
      const messageData = {
        room: roomId,
        text: messageText,
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

      axios
        .post(`http://${API_URL}/api/chat/${roomId}`, messageData, config)
        .then((res) => {
          socket.current.emit("send_message", messageText, () => {
            setMessageText("");
          });
          console.log(res);
        })
        .catch((error) => console.log(error));
    }
  };
  const handleEnterKeyOnMessage = (e, roomId) => {
    if (e.key === "Enter") {
      onMessageSend(e, roomId);
    }
  };
  const scrollStyle = {
    root: { padding: "0 15px", height: "100vh-800px" },
    viewport:
      roomMessages.length === 0
        ? { display: "flex ", alignItems: "center" }
        : { boxAlign: "end", boxOrient: "vertical", boxPack: "end" },
  };
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error </div>;
  }
  return (
    <div style={{ position: "relative" }}>
      <ActionIcon
        onClick={handlePrevious}
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
              <Group noWrap>
                <Avatar src="https://i.pinimg.com/736x/ab/75/46/ab754671e4b62d109fcf4d76aec8b4df--anime-manga-saitama.jpg" />
                <Group direction="column" spacing={0} grow={1}>
                  <Group spacing={5}>
                    <Text
                      size="lg"
                      weight={500}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {data["user"]["username"].toUpperCase()}
                    </Text>
                    <Text
                      size="xs"
                      weight="lighter"
                      style={{ fontStyle: "italic" }}
                      mt={4}
                    >
                      LFP
                    </Text>
                    <Image
                      mt={2}
                      style={{ userSelect: "none" }}
                      fit="contain"
                      height={15}
                      width={25}
                      radius="md"
                      withPlaceholder
                      src={gameIdPicPair[data.room.gameId]}
                    />
                  </Group>
                  {/* <UserBadge badge={roomData.badge} /> */}
                </Group>
              </Group>
              <Group
                direction="column"
                spacing={0}
                // style={{ maxWidth: 370 }}
                style={{ maxWidth: "65%" }}
                align="center"
              >
                <Text
                  weight={500}
                  style={{
                    maxWidth: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {data.room.title}
                </Text>
                <Spoiler maxHeight={55} showLabel="Show more" hideLabel="Hide">
                  <Text size="xs" lineClamp={3}>
                    {data.room.description}
                  </Text>
                </Spoiler>
              </Group>
              <Group spacing="md" position="center" pr="xs">
                <Tools roomDetail={data.room} />
                <LfpTimer roomDetail={data.room} />
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
                        <RiGameLine size={28} color="#868e96" />
                        <Text size="sm" color="dimmed" weight={500}>
                          Nobody sent message here.
                        </Text>
                      </Group>
                      <Text size="sm" color="dimmed" weight={500}>
                        Be the first one to start conversation about this room!
                      </Text>
                    </Group>
                  ) : (
                    roomMessages.map((e) => {
                      return (
                        <React.Fragment key={e.author + e.createdAt}>
                          <RoomMessage
                            authorId={e.author}
                            message={e.text}
                            userId={userId}
                          />
                          <div ref={messagesEndRef} />
                        </React.Fragment>
                      );
                    })
                  )}
                </ScrollArea>
              </Paper>
              <Group style={{ width: "100%" }} mt="xs">
                <TextInput
                  sx={{ flexGrow: 1 }}
                  value={messageText}
                  onChange={(e) => setMessageText(e.currentTarget.value)}
                  onKeyDown={(e) => handleEnterKeyOnMessage(e, data.room.id)}
                />
                <Button
                  rightIcon={<FiSend size={18} />}
                  onClick={(e) => onMessageSend(e, data.room.id)}
                >
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
      </div>
    </div>
  );
}
const RoomMembers = ({ roomLink }) => {
  return (
    <Group direction="column" position="center">
      <Text size="md" weight={600}>
        {" "}
        Who is here?
      </Text>
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

const RoomMessage = ({ authorId, message, userId }) => {
  return authorId === userId ? (
    <Group
      noWrap
      mt="xs"
      style={{ width: "100%" }}
      position="right"
      spacing="xs"
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
    <Group noWrap mt="xs" style={{ width: "100%" }}>
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
