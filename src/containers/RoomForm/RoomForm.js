// import logo from "./logo.svg";
import {
  Text,
  Group,
  Select,
  TextInput,
  Tabs,
  Button,
  Container,
  Box,
  Textarea,
  NumberInput,
} from "@mantine/core";
import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";
// import DefaultHeader from "./components/headers/DefaultHeader";
import { BsCardText, BsImage } from "react-icons/bs";
import Uploader from "../../components/uploader/Uploader";
import { useNavigate } from "react-router-dom";
import Room from "../../components/room/Room";
function RoomForm(props) {
  const handlePrevious = (e) => {
    e.preventDefault();
    navigate("../");
  };
  let navigate = useNavigate();
  const initialValue = "<p>any <a >link</a>, plain text</p>";
  const [value, onChange] = useState(initialValue);
  const tahh = [
    {
      userName: "dummbygod",
      gameName: "dota",
      title: "Childe ascention material farming",
      description: "oin, I will be waiting",
      rank: "https://raw.githubusercontent.com/Soneliem/WAIUA/master/Demo/images/ranksimg/20.png",
      tools: {
        mic: true,
        earphone: true,
        discord: true,
      },
      targetTime: "NOW",
      partyMembersCount: 4,
      badge: "try harder",
    },
    {
      userName: "jesus",
      gameName: "dota",
      title: "christ",
      description: "do not join, i dont like to wait ",
      rank: "https://raw.githubusercontent.com/Soneliem/WAIUA/master/Demo/images/ranksimg/15.png",
      tools: {
        mic: true,
        earphone: true,
        discord: true,
      },
      targetTime: "15 : 30",
      partyMembersCount: 2,
      badge: "newbie",
    },
    {
      userName: "XDDDD",
      gameName: "dota",
      title: "awww, lets try out the new patch lads",
      description: "title says it all ",
      rank: "https://raw.githubusercontent.com/Soneliem/WAIUA/master/Demo/images/ranksimg/23.png",
      tools: {
        mic: true,
      },
      targetTime: "NOW",
      partyMembersCount: 3,
      badge: "pro",
    },
    {
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
    },
  ];
  return (
    <Container style={{ display: "flex", flexDirection: "row" }}>
      <Group
        direction="column"
        style={{ width: "100%", maxWidth: 399 }}
        position="apart"
      >
        <Text>
          Fill in the form to make a <b>waiting room</b>
        </Text>

        <Group>
          <Text>I wish to play</Text>
          <Select
            style={{ flexGrow: 0.8 }}
            variant="filled"
            data={[
              { value: 1, label: "Valorant" },
              { value: 2, label: "CS:GO" },
              { value: 3, label: "Dota 2" },
              { value: 4, label: "Genshin Impact" },
            ]}
          />
        </Group>
        <Group>
          <Text>My rank is</Text>
          <Select
            style={{ flexGrow: 0.8 }}
            variant="filled"
            data={[
              { value: 1, label: "Valorant" },
              { value: 2, label: "CS:GO" },
              { value: 3, label: "Dota 2" },
              { value: 4, label: "Genshin Impact" },
            ]}
          />
        </Group>
        <Group>
          <Text>I need</Text>
          <NumberInput
            defaultValue={1}
            variant="filled"
            radius="md"
            hideControls
          />
          <Text>player(s)</Text>
        </Group>
        <TextInput label="Waiting room title" placeholder="" />
        <Textarea
          label="Waiting room description"
          placeholder=""
          autosize
          maxLength={90}
          minRows={2}
          maxRows={4}
        />

        <Group sx={{ justifySelf: "end", alignSelf: "end" }}>
          <Button variant="outline" onClick={handlePrevious}>
            CANCEL
          </Button>
          <Button variant="filled">POST</Button>
        </Group>
      </Group>
      <Room roomDetail={tahh[0]} />
      {/* <Group direction="column">
        <Text mb={16}>Recent Activities</Text>
        <Room roomDetail={tahh[1]} />
        <Room roomDetail={tahh[2]} />
        <Room roomDetail={tahh[3]} />
        <Room roomDetail={tahh[2]} />
        <Room roomDetail={tahh[3]} />
      </Group> */}
    </Container>
  );
}
export default RoomForm;
