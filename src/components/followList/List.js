import {
  Group,
  createStyles,
  Accordion,
  Button,
  Avatar,
  Box,
  Text,
  Paper,
  Modal,
  Badge,
  ActionIcon,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
// import { GasStation, Gauge, ManualGearbox, Users } from "tabler-icons-react";
import { FiPlus } from "react-icons/fi";
import { BsCheck2 } from "react-icons/bs";
import { HiChevronDoubleUp } from "react-icons/hi";
import { forwardRef, useState } from "react";
import { ReactComponent as CsgoSvg } from "../../images/gamesLogo/csgo.svg";
import { ReactComponent as CsgoDarkSvg } from "../../images/gamesLogo/csgoDark.svg";
import { ReactComponent as Dota2Svg } from "../../images/gamesLogo/dota2.svg";
import { ReactComponent as GenshinImpactSvg } from "../../images/gamesLogo/genshin-impact.svg";
import { ReactComponent as GenshinImpactDarkSvg } from "../../images/gamesLogo/genshin-impact-dark.svg";
import { ReactComponent as LolSvg } from "../../images/gamesLogo/lol.svg";
import { ReactComponent as MobileLegendsSvg } from "../../images/gamesLogo/mobile-legends.svg";
import { ReactComponent as PubgmSvg } from "../../images/gamesLogo/pubgm.svg";
import { ReactComponent as ValorantSvg } from "../../images/gamesLogo/valorant.svg";
import { useQuery } from "react-query";
import { useHover } from "@mantine/hooks";
import RoomActivity from "../../containers/RoomActivity";
import { API_URL, USER_URL } from "../../constants/request";
import FollowListRooms from "../FollowListRooms";
import { useEffect } from "react";
import _ from "lodash";
import FollowListButton from "../FollowListButton";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { ModalsContext } from "../../ModalsContext";

const useStyles = createStyles((theme, _params, getRef) => ({
  icon: { ref: getRef("icon") },

  control: {
    ref: getRef("control"),
    border: 0,
    // opacity: 0.6,
    opacity: 1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    "&:hover": {
      backgroundColor: "transparent",
      //   opacity: 1,
    },
    padding: "13px 17.8px 13px 19px",
  },

  item: {
    backgroundColor: theme.colors.gray[2],
    borderBottom: 0,
    width: 530,
    overflow: "hidden",
    transition: `box-shadow 150ms ${theme.transitionTimingFunction}`,
    border: "1px solid transparent",
    borderRadius: theme.radius.sm,
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[4],
    marginBottom: 8,
    // backgroundColor: "#2C384B",
  },

  itemOpened: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[2],
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[4],

    [`& .${getRef("control")}`]: {
      opacity: 1,
    },

    [`& .${getRef("icon")}`]: {
      transform: "rotate(45deg)",
    },
  },

  content: {
    paddingLeft: 0,
  },
}));
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
function List(props) {
  //   const roomDetail = props.roomDetail;
  const svgs = [
    { id: 1, content: <Dota2Svg key="dota2" /> },
    { id: 2, content: <LolSvg key="lol" /> },
    { id: 3, content: <CsgoDarkSvg key="csgo" /> },
    { id: 4, content: <ValorantSvg key="valorant" /> },
    { id: 5, content: <GenshinImpactDarkSvg key="genshinImpact" /> },
    { id: 6, content: <MobileLegendsSvg key="mobileLegends" /> },
    { id: 7, content: <PubgmSvg key="pubgMobile" /> },
  ];
  const list = [
    {
      image: <Dota2Svg height={30} width={30} />,
      label: "Dota 2",
      gameId: 1,
      value: "dota2",
    },

    {
      image: <LolSvg height={30} width={30} />,
      label: "League of Legends",
      gameId: 2,
      value: "leagueoflegends",
    },
    {
      image: <CsgoDarkSvg height={30} width={30} />,
      label: "Counter-Strike: Global Offensive",
      gameId: 3,
      value: "csgo",
    },
    {
      image: <ValorantSvg height={30} width={30} />,
      label: "Valorant",
      gameId: 4,
      value: "valorant",
    },
    {
      image: <GenshinImpactDarkSvg height={30} width={30} />,
      label: "Genshin Impact",
      gameId: 5,
      value: "genshinimpact",
    },
    {
      image: <MobileLegendsSvg height={30} width={30} />,
      label: "Mobile Legends: Bang Bang",
      gameId: 6,
      value: "mobilelegends",
    },
    {
      image: <PubgmSvg height={30} width={30} />,
      label: "PUBG Mobile",
      gameId: 7,
      value: "pubgm",
    },
  ];
  const [open, setOpen] = useState(false);
  const [followList, setFollowList] = useState([]);
  const [unfollowList, setUnfollowList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const { loginModal } = useContext(ModalsContext);
  const [loginModalOpen, setLoginModalOpen] = loginModal;
  const getMyList = async () => {
    // console.log("userId: " + userId);
    const response = await fetch(`http://${API_URL}/api/user/followlist/get`, {
      method: "GET",
      ...(isAuthenticated && {
        headers: new Headers({
          Authorization: `Bearer ${getCookie("accessToken")}`,
        }),
      }),
    });
    return response.json();
  };
  useEffect(() => {
    if (isAuthenticated) {
      getMyList()
        .then((res) => {
          let followed = [];
          let notFollowed = [];
          res.followList.forEach((e) => {
            followed.push(list.filter((el) => el.gameId === e.gameId)[0]);
          });
          const diff = _.difference(list, followed);
          setUnfollowList(diff);

          setFollowList(followed);
        })
        .catch((er) => {
          console.log(er);
        });
    }
  }, [loading, isAuthenticated]);
  const handleListOpen = () => {
    if (isAuthenticated) {
      setOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };
  const handleList = (gameId, action) => (e) => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    const requestData = {
      gameId,
    };
    axios
      .post(
        action === "add"
          ? `${USER_URL}/followlist/add`
          : `${USER_URL}/followlist/remove`,
        requestData,
        config
      )
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          showNotification({
            id: "game-followed",
            disallowClose: true,
            autoClose: 5000,
            title:
              list.filter((e) => e.gameId === gameId)[0].label + action ===
              "add"
                ? " is added to the list."
                : " is removed from the list.",
            color: "green",
            icon: <BsCheck2 size={18} />,
            loading: false,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        showNotification({
          id: "failure",
          disallowClose: true,
          autoClose: 5000,
          title: "Error occurred.",
          message: "Error message:" + err,
          color: "red",
          loading: false,
        });
      });
  };
  // const handleItemClick = (value) => (e) => {
  //   setRecentGame(value);
  // };

  // const followItems = data
  //   ? data.followList.map((element) => {
  //       return list.filter((e) => e.gameId === element.gameId);
  //     })
  //   : null;

  const items = followList.map((item) => (
    <Accordion.Item
      label={<AccordionLabel {...item} />}
      key={item.label}
      // onClick={handleItemClick(item.value)}
    >
      {/* {recentGame ? (
        <listRooms gameId={recentGame} />
      ) : (
        <Box
          my={50}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BsCheck2 size={30} color="green" />
          <Text Text size="xl" ml="xs" weight={500}>
            No more waiting rooms for today T-T
          </Text>
        </Box>
      )} */}

      <FollowListRooms gameId={item.value} />
    </Accordion.Item>
  ));
  return (
    <>
      <Box mt={24} sx={{ width: 530 }}>
        <StyledAccordion
        // initialItem={2}
        >
          {items}
        </StyledAccordion>
        <Group>
          <Button
            fullWidth
            style={{
              height: 51,
              display: "flex",
              justifyContent: "start",
              border: "1px solid transparent",
            }}
            sx={(theme) => ({
              backgroundColor: theme.colors.gray[6],
              "&:hover": {
                backgroundColor: theme.colors.gray[7],
              },
            })}
            leftIcon={
              <Box
                sx={(theme) => ({
                  borderRadius: theme.radius.xl,
                  padding: 5,
                  paddingLeft: 6,
                  paddingRight: 6,
                  backgroundColor: theme.colors.gray[5],
                })}
              >
                <FiPlus size={20} color="white" />
              </Box>
            }
            onClick={() => {
              handleListOpen();
            }}
          >
            Add a game to the list
          </Button>
        </Group>
      </Box>
      <Modal
        size="calc(40vw - 100px)"
        opened={open}
        onClose={() => setOpen(false)}
        styles={{
          body: { paddingBottom: 50 },
          close: {
            position: "absolute",
            top: 15,
            right: 15,
          },
        }}
        centered
      >
        <Group direction="column" spacing={50} sx={{ alignItems: "center" }}>
          <div
            style={{
              width: "90%",
            }}
          >
            <Text weight={600}>Followed</Text>
            <Group
              style={{ width: "100%" }}
              position="left"
              spacing={45}
              mt={25}
            >
              {followList.length > 0 ? (
                followList.map((e) => {
                  return (
                    <FollowListButton
                      key={e.gameId}
                      loading={loading}
                      follow
                      gameId={e.gameId}
                      handleList={handleList(e.gameId, "remove")}
                    />
                  );
                })
              ) : (
                <Text
                  mx="md"
                  my="md"
                  align="center"
                  sx={{ width: "100%" }}
                  size="lg"
                >
                  LIST IS EMPTY 👾 <b>HOVER</b> THE GAMES BELOW
                </Text>
              )}
            </Group>
          </div>
          <div
            style={{
              width: "90%",
            }}
          >
            <Text weight={600}>Not Followed</Text>
            <Group
              style={{ width: "100%" }}
              position="left"
              spacing={45}
              mt={25}
            >
              {unfollowList.length > 0 ? (
                unfollowList.map((e) => {
                  return (
                    <FollowListButton
                      key={e.gameId}
                      loading={loading}
                      unfollow
                      gameId={e.gameId}
                      handleList={handleList(e.gameId, "add")}
                    />
                  );
                })
              ) : (
                <Text
                  mx="md"
                  my="md"
                  align="center"
                  sx={{ width: "100%" }}
                  size="lg"
                  weight={600}
                >
                  NO MORE GAMES TO ADD 👺{" "}
                </Text>
              )}
            </Group>
          </div>
        </Group>
      </Modal>
    </>
  );
}
function AccordionLabel({ label, image }) {
  return (
    <Group noWrap>
      {image}
      <Text>{label}</Text>
      <Badge
        color="green"
        component="div"
        variant="dot"
        styles={{
          root: {
            marginLeft: "auto",
            "&:hover": {
              cursor: "inherit",
            },
          },
        }}
      >
        3 new
      </Badge>
    </Group>
  );
}

function StyledAccordion(props) {
  const { classes } = useStyles();
  return (
    <Accordion
      iconSize={16}
      iconPosition="right"
      classNames={classes}
      {...props}
    />
  );
}

export default List;
