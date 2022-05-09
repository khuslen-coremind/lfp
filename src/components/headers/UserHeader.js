import { forwardRef, useState } from "react";
import {
  Container,
  Header,
  createStyles,
  ActionIcon,
  Select,
  Group,
  Menu,
  Avatar,
  Text,
  Button,
} from "@mantine/core";
import { BsHouse, BsBell, BsPen, BsPeople } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
// import pfp from "./621.png";
import GamesNavigator from "../GamesNavigator";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  header: {
    height: "100%",
    maxWidth: "100%",
    backgroundColor: "#e0e0e0",
  },

  links: {
    display: "flex",
    justifyContent: "space-between",
    // justifyContent: "stretch",
    alignItems: "center",
    maxWidth: 1200,
    margin: "auto",
    paddingTop: 28,
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
}));
function UserHeader() {
  const { classes } = useStyles();
  let navigate = useNavigate();
  const gamePages = [
    { id: 0, page: "dota2" },
    { id: 1, page: "leagueoflegends" },
    { id: 2, page: "csgo" },
    { id: 3, page: "valorant" },
    { id: 4, page: "genshinimpact" },
    { id: 5, page: "mobilelegends" },
    { id: 6, page: "pubgmobile" },
  ];
  const handleGameLogoClick = (gameId) => {
    navigate(`/${gamePages.filter((e) => e.id === gameId)[0]["page"]}`);
  };
  const handleHome = (e) => {
    navigate("/");
  };

  return (
    <Header height={98}>
      <Container className={classes.header}>
        <Group className={classes.links}>
          <Group spacing={46} ml={55}>
            <ActionIcon
              variant="transparent"
              color="black"
              onClick={handleHome}
            >
              <BsHouse size={35} />
            </ActionIcon>
            <Menu
              control={
                <ActionIcon variant="transparent" color="black">
                  <FiPlus size={35} />
                </ActionIcon>
              }
            >
              <Menu.Item
                icon={
                  <BsPen
                    size={14}
                    // component={Link} to="/hello"
                  />
                }
                component="a"
                href="http://localhost:3000/create/post"
                target="_blank"
              >
                Create a post
              </Menu.Item>
              <Menu.Item
                icon={<BsPeople size={14} />}
                component="a"
                href="http://localhost:3000/create/room"
                target="_blank"
              >
                Create a waiting room
              </Menu.Item>
            </Menu>
          </Group>
          <GamesNavigator click={handleGameLogoClick} />
          {/* <ActionIcon variant="transparent">
							<BsBell />
						</ActionIcon> */}
          <Group spacing="xl">
            <ActionIcon>
              <BsBell size={23} />
            </ActionIcon>
            <Avatar
              component="a"
              href="#"
              src={
                "https://i.pinimg.com/736x/ab/75/46/ab754671e4b62d109fcf4d76aec8b4df--anime-manga-saitama.jpg"
              }
              alt="pfp"
              radius="xl"
              // style={{ marginLeft: 80 }}
            />
          </Group>
        </Group>
      </Container>
    </Header>
  );
}

export default UserHeader;
