// import logo from "./logo.svg";
import {
  createStyles,
  Text,
  Paper,
  Group,
  Select,
  TextInput,
  Alert,
  Box,
  Accordion,
  Button,
  Container,
  Divider,
  Avatar,
  Stack,
  ScrollArea,
  Spoiler,
} from "@mantine/core";
import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";
// import DefaultHeader from "./components/headers/DefaultHeader";
import { BsCardText, BsImage, BsChevronDown } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import Uploader from "../../components/uploader/Uploader";
import { useNavigate, useLocation } from "react-router-dom";
import UserBadge from "../../components/userBadge/UserBadge";
import Tools from "../../components/tools/Tools";

function Room(props) {
  const roomLink = window.location.href;

  const handlePrevious = (e) => {
    e.preventDefault();
    navigate("../");
  };
  let navigate = useNavigate();
  const initialValue = "<p>any <a >link</a>, plain text</p>";
  const [value, onChange] = useState(initialValue);
  const GameSelectItem = ({ image, label, ...others }) => (
    <div {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  );
  const gameData = [
    { value: 1, label: "Valorant" },
    { value: 2, label: "CS:GO" },
    { value: 3, label: "Dota 2" },
    { value: 4, label: "Genshin Impact" },
  ];
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
  return (
    <Container>
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
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Paper withBorder style={{ width: "100%" }} pb="xs">
              <ScrollArea
                style={{
                  padding: "0 15px",
                  // height: "100%",
                  // width: "100%",
                  height: "55vh",
                }}
              >
                <RoomMessage
                  message={
                    "laslkajldkajsdlkasjdlkasdjasidjoqwidjwlkajasl dalskdlaskd aslk lskadj laskdlaslkajldkajsdlkasjdlkasdjasidjoqwidjwlkajasl dalskdlaskd aslk lskadj laskd"
                  }
                />
                <RoomMessage
                  message={
                    "laslkajldkajsdlkasjdskd aslk llkasjdlkasdjwlkajasl dalskdlaskd aslk lskadj laskd"
                  }
                />
                <RoomMessage message={"laslkajljasl dalskdld"} />
                <RoomMessage message={"laslkajljasl dalskdld"} />
                <RoomMessage message={"laslkajljasl dalskdld"} />
                <RoomMessage message={"laslkajljasl dalskdld"} />
                <RoomMessage message={"laslkajljasl dalskdld"} />
                <RoomMessage message={"laslkajljasl dalskdld"} />
                <RoomMessage message={"laslkajljasl dalskdld"} />
                <RoomMessage message={"laslkajljasl dalskdld"} />
                <RoomMessage message={"laslkajljasl dalskdld"} />
                <RoomMessage message={"laslkajljasl dalskdld"} />
                <RoomMessage message={"laslkajljasl dalskdld"} />
                <RoomMessage message={"laslkajljasl dalskdld"} />
                <RoomMessage message={"laslkajljasl dalskdld"} />
                <RoomMessage message={"laslkajljasl dalskdld"} />
                <RoomMessage message={"laslkajljasl dalskdld"} />
              </ScrollArea>
            </Paper>
            <Group style={{ width: "100%" }} mt="xs">
              <TextInput sx={{ flexGrow: 1 }} />
              <Button rightIcon={<FiSend size={18} />}>SEND</Button>
            </Group>
          </div>
          <Paper
            shadow="lg"
            style={{ width: "30%", maxWidth: "30%", height: "max-content" }}
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
    </Container>
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
const rules = [
  { title: "No illegal content", content: "No ilslds" },
  { title: "No harrasments", content: "No ilslds" },
  { title: "No sexual content", content: "No ilslds" },
  { title: "Self promo is accaptable, within reason", content: "No ilslds" },
];

// const items = rules.map((item, i) => (
//   <Accordion.Item
//     label={<AccordionLabel {...item} i={i + 1} />}
//     key={item.title}
//   >
//     <Text size="sm">{item.content}</Text>
//   </Accordion.Item>
// ));
const RoomMessage = ({ user, message }) => {
  return (
    <Group noWrap mt="xs" style={{ width: "100%" }}>
      <Avatar
        radius="xl"
        // src={user.pfp}
        src=""
        color="dark"
        alt="no image here"
      />
      <Text
        style={{
          backgroundColor: "#CECECE",
          padding: "7px 15px",
          borderRadius: 8,
          borderBottomLeftRadius: 0,
          width: "fit-content",
        }}
        size="sm"
      >
        {message}
      </Text>
    </Group>
  );
};
export default Room;
