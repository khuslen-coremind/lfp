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
        <Group style={{ width: "100%" }} position="apart">
          <Text>
            Share <b>anything</b> related to the community
          </Text>
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
        {/* <label htmlFor="title">
                  {" "}
                  <Text weight="bold">Title</Text>
              </label> */}
        <TextInput
          // id="title"
          mt={40}
          size="lg"
          label="Title"
          sx={{ width: "100%" }}
          placeholder=""
        />
        <Tabs mt={35}>
          <Tabs.Tab
            style={{ fontSize: 16, fontWeight: "bold" }}
            label="Text"
            icon={<BsCardText size={16} />}
          >
            <RichTextEditor
              value={value}
              onChange={onChange}
              sx={{ minHeight: 200 }}
            />
          </Tabs.Tab>
          <Tabs.Tab
            style={{ fontSize: 16, fontWeight: "bold" }}
            label="Images & videos"
            icon={<BsImage size={16} />}
          >
            <Uploader />
          </Tabs.Tab>
        </Tabs>
        <Group sx={{ justifySelf: "end", alignSelf: "end" }}>
          <Button variant="outline" onClick={handlePrevious}>
            CANCEL
          </Button>
          <Button variant="outline">SAVE DRAFT</Button>
          <Button variant="filled">POST</Button>
        </Group>
      </Group>
      <Group direction="column">
        <Text mb={16}>Recent Activities</Text>
        <Room roomDetail={tahh[0]} />
        <Room roomDetail={tahh[1]} />
        <Room roomDetail={tahh[2]} />
        <Room roomDetail={tahh[3]} />
        <Room roomDetail={tahh[2]} />
        <Room roomDetail={tahh[3]} />
      </Group>
    </Container>
  );
}
export default RoomForm;
