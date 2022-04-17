// import logo from "./logo.svg";
import {
  createStyles,
  Text,
  Paper,
  Group,
  Select,
  TextInput,
  Tabs,
  Box,
  Accordion,
  Button,
  Container,
  Divider,
  Avatar,
} from "@mantine/core";
import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";
// import DefaultHeader from "./components/headers/DefaultHeader";
import { BsCardText, BsImage, BsChevronDown } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import Uploader from "../../components/uploader/Uploader";
import { useNavigate } from "react-router-dom";
import UserBadge from "../../components/userBadge/UserBadge";

function Room(props) {
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
    <Container style={{ display: "flex", flexDirection: "row" }}>
      <Group direction="column" style={{ width: 600 }} position="apart" mr="xl">
        <Group
          style={{
            width: "100%",
            //   backgroundColor: "gray"
          }}
          position="apart"
        >
          <Group style={{ width: "100%" }}>
            <Paper shadow="lg" p="md">
              <Group>
                <Avatar
                  size="lg"
                  src="https://i.pinimg.com/736x/ab/75/46/ab754671e4b62d109fcf4d76aec8b4df--anime-manga-saitama.jpg"
                />
                <Group direction="column" spacing={0}>
                  <Text size="xl" weight={500}>
                    {roomData.userName}
                  </Text>
                  <UserBadge badge={roomData.badge} big />
                </Group>
              </Group>
            </Paper>
          </Group>
          <Group style={{ width: "100%" }}>
            <TextInput sx={{ flexGrow: 1 }} />
            <Button rightIcon={<FiSend size={18} />}>SEND</Button>
          </Group>
        </Group>
        {/* <label htmlFor="title">
                  {" "}
                  <Text weight="bold">Title</Text>
              </label> */}
      </Group>
      {/* <Container>
        <Rules />
      </Container> */}
    </Container>
  );
}

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
// const Rules = () => {
//   return (
//     <Paper style={{ width: 245 }} shadow="xs" px="sm" pt={20}>
//       <Text weight={700} pl={6}>
//         Community post rules
//       </Text>
//       <StyledAccordion iconSize={12}>{items}</StyledAccordion>
//     </Paper>
//   );
// }
export default Room;
