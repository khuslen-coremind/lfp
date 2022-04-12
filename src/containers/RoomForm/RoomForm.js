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
  Chips,
  Chip,
  Textarea,
  NumberInput,
  Paper,
  Avatar,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";
// import DefaultHeader from "./components/headers/DefaultHeader";
import { BsAlarm, BsCardText, BsImage, BsChevronDown } from "react-icons/bs";
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
  const data = [
    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
      label: "Valorant",
      value: "Bender Bending Rodríguez",
    },

    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
      label: "Dota 2",
      value: "Carol Miller",
    },
    {
      image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
      label: "Mobile Legends: Bang Bang",
      value: "Homer Simpson",
    },
    {
      image:
        "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
      label: "PUBG Mobile",
      value: "PUBG Mobile",
    },
  ];
  const [roomTime, setRoomTime] = useState(new Date());

  const SelectItem = ({ image, label, ...others }) => (
    <div {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  );
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
        <Text size="xl">GAME </Text>
        <Paper p="xl">
          <Group>
            <Group>
              <Text>I wish to play</Text>
              <Select
                defaultValue="PUBG Mobile"
                itemComponent={SelectItem}
                data={data}
                rightSection={<BsChevronDown size={14} />}
                rightSectionWidth={30}
                styles={{
                  rightSection: {
                    pointerEvents: "none",
                  },
                }}
                maxDropdownHeight={400}
                nothingFound="Nobody here"
                filter={(value, item) =>
                  item.label
                    .toLowerCase()
                    .includes(value.toLowerCase().trim()) ||
                  item.description
                    .toLowerCase()
                    .includes(value.toLowerCase().trim())
                }
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
          </Group>
        </Paper>
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
        <TimeInput
          hoursLabel="Hours"
          minutesLabel="Minutes"
          value={roomTime}
          onChange={setRoomTime}
        />

        <TextInput label="Waiting room title" placeholder="" />
        <Textarea
          label="Waiting room description"
          placeholder=""
          autosize
          maxLength={90}
          minRows={2}
          maxRows={4}
        />
        <Group>
          <Chips multiple>
            <Chip value="react">Mic</Chip>
            <Chip value="h">Headset</Chip>
            <Chip value="eact">earphone</Chip>
            <Chip value="discord">Discord</Chip>
          </Chips>
        </Group>
        <Group sx={{ justifySelf: "end", alignSelf: "end" }}>
          <Button variant="outline" onClick={handlePrevious}>
            CANCEL
          </Button>
          <Button variant="filled">POST</Button>
        </Group>
      </Group>
      {/* <Room roomDetail={tahh[0]} /> */}
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
