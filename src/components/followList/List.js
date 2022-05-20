import {
  Group,
  createStyles,
  Accordion,
  Button,
  Avatar,
  Box,
  Text,
  Paper,
  Badge,
} from "@mantine/core";
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

import RoomActivity from "../../containers/RoomActivity";
import FollowListRooms from "../FollowListRooms";
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
function List(props) {
  //   const roomDetail = props.roomDetail;
  const followList = [
    {
      image: <Dota2Svg height={30} width={30} />,
      label: "Dota 2",
      value: "dota2",
    },

    {
      image: <LolSvg height={30} width={30} />,
      label: "League of Legends",
      value: "leagueoflegends",
    },
    {
      image: <CsgoDarkSvg height={30} width={30} />,
      label: "Counter-Strike: Global Offensive",
      value: "csgo",
    },
    {
      image: <ValorantSvg height={30} width={30} />,
      label: "Valorant",
      value: "valorant",
    },
    {
      image: <GenshinImpactDarkSvg height={30} width={30} />,
      label: "Genshin Impact",
      value: "genshinimpact",
    },
    {
      image: <MobileLegendsSvg height={30} width={30} />,
      label: "Mobile Legends: Bang Bang",
      value: "mobilelegends",
    },
    {
      image: <PubgmSvg height={30} width={30} />,
      label: "PUBG Mobile",
      value: "pubgm",
    },
  ];
  const [recentGame, setRecentGame] = useState("");

  // const handleItemClick = (value) => (e) => {
  //   setRecentGame(value);
  // };
  // const das = tahh.map((item) => (
  //   <RoomCard key={item.userName} roomDetail={item} />
  // ));
  const items = followList.map((item) => (
    <Accordion.Item
      label={<AccordionLabel {...item} />}
      key={item.label}
      // onClick={handleItemClick(item.value)}
    >
      {/* {recentGame ? (
        <FollowListRooms gameId={recentGame} />
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
    <Box mt={24}>
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
          color="gray"
          leftIcon={
            <Box
              sx={(theme) => ({
                borderRadius: theme.radius.xl,
                padding: 5,
                paddingLeft: 6,
                paddingRight: 6,
                backgroundColor: "grey",
              })}
            >
              <FiPlus
                size={20}
                color="white
              "
              />
            </Box>
            // <Box radius="xl" size={35} color="gray">
            // </Box>
          }
        >
          Add a game to the list
        </Button>
      </Group>
    </Box>
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
