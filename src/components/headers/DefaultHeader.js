import {
  Button,
  Container,
  Header,
  createStyles,
  ActionIcon,
  Menu,
  Group,
  Box,
} from "@mantine/core";
import { SiEpicgames } from "react-icons/si";
import { BiChevronDown } from "react-icons/bi";
import "./header.css";
import {
  BsHouse,
  BsBell,
  BsPen,
  BsPeople,
  BsPersonCircle,
} from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { CgLogIn } from "react-icons/cg";
import GamesNavigator from "../GamesNavigator";
import { useContext } from "react";
import { ModalsContext } from "../../ModalsContext";
const useStyles = createStyles((theme) => ({
  header: {
    height: "100%",
    maxWidth: "100%",
    backgroundColor: "#090F1A",
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
  select: {
    maxWidth: "min-content",
  },
}));

function DefaultHeader({ navLogoHandler, handleToHome, onLogin, onRegister }) {
  const { classes } = useStyles();
  const { loginModal, registerModal, roomModal } = useContext(ModalsContext);
  const [loginModalOpen, setLoginModalOpen] = loginModal;
  const [registerModalOpen, setRegisterModalOpen] = registerModal;
  const [roomModalOpen, setRoomModalOpen] = roomModal;
  const handleGameLogoClick = (gameId) => {
    navLogoHandler(gameId);
  };
  const handleHome = (e) => {
    handleToHome(e);
  };
  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };
  const handleRegisterClick = () => {
    console.log(registerModal);
    setRegisterModalOpen(true);
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
              <BsHouse size={35} color="#dedede" />
            </ActionIcon>
            <Menu
              control={
                <ActionIcon variant="transparent" color="black">
                  <FiPlus size={35} color="#dedede" />
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
                onClick={() => setRoomModalOpen(true)}
              >
                Create a waiting room
              </Menu.Item>
            </Menu>
          </Group>
          <GamesNavigator click={handleGameLogoClick} />
          {/* <ActionIcon variant="transparent">
							<BsBell />
						</ActionIcon> */}
          <Group spacing="sm">
            <Button
              className="signInBtn"
              variant="white"
              onClick={handleLoginClick}
            >
              Log In
            </Button>
            <Button variant="filled" onClick={handleRegisterClick}>
              Sign Up
            </Button>
          </Group>
        </Group>
      </Container>
    </Header>
  );
}

export default DefaultHeader;
