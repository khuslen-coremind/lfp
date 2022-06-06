import {
  Card,
  Text,
  Group,
  Menu,
  createStyles,
  ActionIcon,
  Button,
  Avatar,
  Box,
  Image,
  AvatarsGroup,
} from "@mantine/core";
// import { GasStation, Gauge, ManualGearbox, Users } from "tabler-icons-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { IoChatbox, IoCopyOutline } from "react-icons/io5";
import { AiOutlineLink } from "react-icons/ai";
import { MdReportProblem, MdDelete } from "react-icons/md";
import Tools from "../tools/Tools";
import LfpTimer from "../lfpTimer/LfpTimer";
import { useNavigate } from "react-router-dom";
import UserBadge from "../userBadge/UserBadge";
import "./roomCard.css";
import dotaPng from "../../../src/images/gamesPictures/dota2.png";
import lolPng from "../../../src/images/gamesPictures/lol.png";
import csgoPng from "../../../src/images/gamesPictures/csgo32.png";
import valorantPng from "../../../src/images/gamesPictures/valorant.png";
import genshintPng from "../../../src/images/gamesPictures/genshin200.jpeg";
import mlPng from "../../../src/images/gamesPictures/ml.png";
import pubgmPng from "../../../src/images/gamesPictures/pubgm.png";
import { gameRanks } from "../../constants/gameRanks";
import _ from "lodash";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: 475,
    maxWidth: 475,
    marginTop: 10,
    // minHeight: 156,
    // padding: "10px 8px 7px 10px !important",
  },

  imageSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: 5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
  img: {
    width: 43,
    height: 43,
  },

  txtContainer: {
    maxWidth: 380,
    flexGrow: 1,
  },
  name: {
    maxWidth: 150,
    width: 150,
  },
  sparound: {
    justifyContent: "space-around",
  },
}));

function RoomCard({ roomDetail, onDeletion }) {
  const { userId, username } = useContext(AuthContext);
  const { classes } = useStyles();
  const gameIdPicPair = {
    1: dotaPng,
    2: lolPng,
    3: csgoPng,
    4: valorantPng,
    5: genshintPng,
    6: mlPng,
    7: pubgmPng,
  };
  let navigate = useNavigate();
  const handleJoin = () => {
    navigate(`/room/${roomDetail.id}`);
  };
  const handleRoomDeletion = (id) => (e) => {
    onDeletion(id);
  };

  return !_.isEmpty(roomDetail) ? (
    <Card
      pt={10}
      pr={8}
      pb={7}
      pl={10}
      withBorder
      radius="sm"
      className={classes.card}
    >
      <Group className={classes.imageSection} p={0} m={0}>
        <Group position="apart" spacing={10}>
          <Avatar
            src="https://i1.sndcdn.com/artworks-sAsRV00EqUmWoXUQ-OMw9yQ-t500x500.jpg"
            alt="Tesla Model S"
            radius="xl"
            size={43}
          />
          <div>
            <Group spacing={5} className={classes.name}>
              <Text lineClamp={7} weight={700} size="md">
                {roomDetail.userName}
              </Text>
              <Text size="xs" weight="lighter">
                <i>LFP</i>
              </Text>
              <Image
                style={{ userSelect: "none" }}
                fit="contain"
                height={15}
                width={25}
                radius="md"
                src={gameIdPicPair[roomDetail.gameId]}
                alt="game logo"
              />
            </Group>
            <UserBadge badge={parseInt(roomDetail.preferenceInfo)} />
          </div>
        </Group>
        <Tools roomDetail={roomDetail} />
        <Box sx={{ display: "flex" }}>
          <LfpTimer roomDetail={roomDetail} />
          <Menu
            withArrow
            placement="center"
            // position="right"
            control={
              <ActionIcon variant="hover" mr={-4}>
                <BsThreeDotsVertical
                  size={16} // fill="#FFF"
                />
              </ActionIcon>
            }
          >
            <Menu.Item
              icon={
                <AiOutlineLink
                  size={14}
                  onClick={() => {
                    navigator.clipboard
                      .writeText("http://localhost:3000/room/" + roomDetail.id)
                      .then(() => {
                        showNotification({
                          id: "copied",
                          disallowClose: true,
                          autoClose: 5000,
                          title: "Copied room link!",
                          message: "Share the link with your friends <3",
                          color: "green",
                          icon: <IoCopyOutline size={18} />,
                          loading: false,
                        });
                      })
                      .catch(() => {
                        showNotification({
                          id: "copied",
                          disallowClose: true,
                          autoClose: 5000,
                          title: "Copied room link!",
                          message: "Share the link with your friends <3",
                          color: "green",
                          icon: <IoCopyOutline size={18} />,
                          loading: false,
                        });
                      });
                  }}
                />
              }
            >
              Room link
            </Menu.Item>

            {userId && roomDetail.userId.toString() === userId.toString() ? (
              <Menu.Item
                color="red"
                icon={<MdDelete size={16} />}
                onClick={handleRoomDeletion(roomDetail.id)}
              >
                Delete room
              </Menu.Item>
            ) : (
              <Menu.Item
                color="red"
                icon={
                  <MdReportProblem
                    size={14}
                    // component={Link} to="/hello"
                  />
                }
              >
                Report room
              </Menu.Item>
            )}
          </Menu>
        </Box>

        {/* <Divider size="xs" /> */}
      </Group>
      <Group pt="sm" pl={2} position="apart">
        {roomDetail.hasCustomRank ? (
          <div className="genshin-ar">
            <Text weight={500} size="xs" mb={-5}>
              AR
            </Text>
            <Text weight={800} size="xl">
              {roomDetail.customRank}
            </Text>
          </div>
        ) : (
          <Image
            fit="cover"
            width={37}
            src={
              gameRanks[roomDetail.gameId].filter(
                (e) => e.value == roomDetail.gameRankId
              )[0]["image"]
            }
            alt="user rank"
            style={{ userSelect: "none" }}
          />
        )}
        <Group
          direction="column"
          position="center"
          spacing={1}
          align="start"
          className={classes.txtContainer}
        >
          <Text weight="bold">{roomDetail.title.toUpperCase()}</Text>
          <Text>{roomDetail.description}</Text>
        </Group>
      </Group>
      <Group position="apart" pt="md" pl={10}>
        {userId && roomDetail.userId.toString() === userId.toString() ? null : (
          <ActionIcon pt={2} radius="xl" size={30} variant="filled">
            <IoChatbox size={16} />
          </ActionIcon>
        )}

        <Group position="right" spacing={5} ml="auto">
          <AvatarsGroup limit={4}>
            {/* <Avatar src="avatar.png" component="a" href="https://github.com/rtivital" /> */}
            {[...Array(roomDetail.roomSize)].map((e, i) => {
              return (
                <Avatar key={i.toString()} color="blue" radius="xl">
                  <FiPlus size={22} />
                </Avatar>
              );
            })}
          </AvatarsGroup>

          <Button
            ml={1}
            mr="md"
            radius="xl"
            variant="filled"
            px={22}
            style={{ fontSize: 18 }}
            onClick={handleJoin}
          >
            JOIN
          </Button>
        </Group>
      </Group>
    </Card>
  ) : (
    <div> </div>
  );
}

export default RoomCard;
