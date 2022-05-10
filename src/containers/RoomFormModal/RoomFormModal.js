// import logo from "./logo.svg";
import {
  Text,
  Group,
  Select,
  TextInput,
  Button,
  Box,
  Chips,
  Chip,
  Textarea,
  NumberInput,
  Avatar,
  Modal,
  createStyles,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useState } from "react";
import {
  BsClock,
  BsController,
  BsPeople,
  BsInfoCircle,
  BsHeadset,
  BsHeadphones,
  BsGear,
  BsChevronDown,
  BsMic,
} from "react-icons/bs";
import { RiUserHeartLine } from "react-icons/ri";
import { FaDiscord } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function RoomFormModal({ opened, ...props }) {
  const handlePrevious = (e) => {
    e.preventDefault();
    navigate("../");
  };
  let navigate = useNavigate();
  const initialValue = "<p>any <a >link</a>, plain text</p>";
  const GameData = [
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
  const RankData = [
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
  const RankSelectItem = ({ image, label, ...others }) => (
    <div {...others}>
      <Group noWrap>
        <Avatar src={image} />
        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  );
  const setModal = () => {
    props.setOpened();
  };
  const useStyles = createStyles((theme, _params, getRef) => ({
    label: {
      display: "flex",
      justifyContent: "space-between",
      gap: 5,
      alignItems: "center",
      color: theme.black,
      borderRadius: 4,
      padding: "5px 15px",
      width: "fit-content",
      height: "fit-content",
      color: "gray",
    },
    filled: {
      padding: "5px 10px",
    },
    input: { display: "none" },
    iconWrapper: {
      display: "none",
      ref: getRef("iconWrapper"),
    },
    checked: {
      backgroundColor: `${theme.colors.blue[4]} !important`,
      color: theme.white,
    },
  }));
  const { classes } = useStyles();
  const [preferences, setPreferences] = useState("");
  const [utils, setUtils] = useState([]);
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setModal(false)}
        title=""
        size="lg"
        styles={{ header: { marginBottom: -20 } }}
        // sx={{ width: "" }}
      >
        <Group direction="column" position="center">
          <Group spacing="xs" mt={2} direction="column" sx={{ width: "100%" }}>
            <Group ml="lg">
              <BsController size={20} />
              <Text size="lg">GAME INFO</Text>
            </Group>

            <Group
              pt="xs"
              px="lg"
              style={{ width: "95%", alignSelf: "center" }}
              spacing="xl"
              position="apart"
              grow={1}
            >
              <Select
                label="I wish to play"
                id="game_select"
                defaultValue="PUBG Mobile"
                itemComponent={GameSelectItem}
                data={GameData}
                rightSection={<BsChevronDown size={14} />}
                rightSectionWidth={30}
                styles={{
                  rightSection: {
                    pointerEvents: "none",
                  },
                  label: { paddingBottom: 10 },
                }}
                maxDropdownHeight={400}
              />
              <Select
                id="rank_select"
                required
                label="My rank is "
                itemComponent={RankSelectItem}
                data={RankData}
                rightSection={<BsChevronDown size={14} />}
                rightSectionWidth={30}
                styles={{
                  rightSection: {
                    pointerEvents: "none",
                  },
                  label: { paddingBottom: 10 },
                }}
              />
            </Group>
          </Group>
          <Group spacing="xs" mt={2} direction="column" sx={{ width: "100%" }}>
            <Group ml="lg">
              <BsPeople size={20} />
              <Text size="lg">PARTY INFO</Text>
            </Group>

            <Group
              pt="xs"
              p="lg"
              style={{ width: "95%", alignSelf: "center" }}
              position="apart"
            >
              <Group spacing="xs">
                <Text size="sm" weight={500}>
                  I need
                </Text>
                <NumberInput
                  required
                  type="number"
                  hideControls
                  defaultValue={1}
                  min={1}
                  max={9}
                  maxLength={1}
                  styles={{ input: { width: 45, textAlign: "center" } }}
                />
                <Text size="sm">player(s)</Text>
              </Group>
              <Group spacing="xs">
                <Chip
                  // value={}
                  variant="filled"
                  styles={{
                    label: {
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 5,
                      alignItems: "center",
                      color: "black",
                      borderRadius: 4,
                      padding: "5px 15px",
                      width: "fit-content",
                      height: "fit-content",
                      color: "gray",
                    },
                    filled: {
                      padding: "5px 15px",
                    },
                    iconWrapper: {
                      display: "none",
                    },
                    input: { display: "none" },
                    checked: {
                      backgroundColor: `black !important`,
                      color: "white",
                    },
                  }}
                >
                  <BsClock />
                  NOW
                </Chip>
                <Text size="sm">or</Text>
                <Text size="sm" weight={500}>
                  at
                </Text>
                <TimeInput
                  hoursLabel="Hours"
                  minutesLabel="Minutes"
                  value={roomTime}
                  onChange={setRoomTime}
                />
              </Group>
            </Group>
          </Group>
          {/* <Divider size="xs" /> */}

          <Group spacing="xs" mt={2} direction="column" sx={{ width: "100%" }}>
            <Group ml="lg">
              <BsInfoCircle size={20} />
              <Text size="lg">ROOM INFO</Text>
            </Group>
            <Group
              pt="xs"
              p="lg"
              style={{ width: "95%", alignSelf: "center" }}
              direction="column"
            >
              <TextInput
                label="Title"
                placeholder=""
                required
                style={{ width: "100%" }}
              />
              <Textarea
                required
                mt="xs"
                label="Description"
                placeholder=""
                autosize
                maxLength={90}
                minRows={2}
                maxRows={4}
                style={{ width: "100%" }}
              />
              <Group mt="xs">
                <RiUserHeartLine />
                <Text size="sm">
                  A little more info would be helpful :)
                  {/* (optional) */}
                </Text>
              </Group>
              <Group position="apart" sx={{ width: "100%" }}>
                {/* <Box shadow="lg" p={0} pb="xs">
                  <label htmlFor="exp">
                    <Text size="sm" weight={500}>
                      Experience{" "}
                    </Text>
                  </label>
                  <Chips multiple id="exp" mt="sm" size="xs">
                    <Chip value="react">Newbie</Chip>
                    <Chip value="h">Pro xd</Chip>
                    <Chip value="h">Pro xd</Chip>
                  </Chips>
                </Box> */}
                <Box shadow="lg" p={0} pb="xs">
                  <label htmlFor="preference">
                    <Text size="sm" weight={500}>
                      Preference{" "}
                    </Text>
                  </label>
                  <Chips
                    value={preferences}
                    onChange={setPreferences}
                    id="exp"
                    variant="filled"
                    mt="sm"
                    size="xs"
                    styles={{
                      label: {
                        borderRadius: 4,
                      },
                    }}
                  >
                    <Chip value="1">Chill</Chip>
                    <Chip value="2">Try hard</Chip>
                    <Chip value="3">For fun</Chip>
                  </Chips>
                </Box>
              </Group>
            </Group>
          </Group>
          <Group spacing="xs" mt={2} direction="column" sx={{ width: "100%" }}>
            <Group ml="lg">
              <BsGear size={20} />
              <Text size="lg">UTILS INFO </Text>
              <Text size="md" color="gray">
                ( Optional ){" "}
              </Text>
            </Group>
            <Group pt="xs" p="lg" style={{ width: "95%", alignSelf: "center" }}>
              <label htmlFor="utils">
                <Text size="sm" weight={500}>
                  I'm willing to use
                </Text>
              </label>
              <Chips
                variant="filled"
                multiple
                value={utils}
                onChange={setUtils}
                id="utils"
                mt={0}
                classNames={classes}
                style={{
                  width: "100%",
                  height: "min-content",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Chip value="1">
                  <BsMic size={15} style={{ marginBottom: 2 }} />
                  Only mic
                </Chip>

                <Chip value="2">
                  {" "}
                  <BsHeadphones size={15} style={{ marginBottom: 2 }} />
                  Only headphone
                </Chip>
                <Chip value="3">
                  {" "}
                  <BsHeadset size={15} />
                  Headset
                </Chip>
                <Chip value="4">
                  <FaDiscord size={15} style={{ marginBottom: 2 }} />
                  Discord
                </Chip>
              </Chips>
            </Group>
          </Group>
          <Group sx={{ width: "95%" }} mt="xs">
            <Button size="sm" variant="filled" sx={{ width: "100%" }}>
              CREATE A ROOM
            </Button>
          </Group>
        </Group>
      </Modal>
    </>
  );
}
export default RoomFormModal;
