import {
  Button,
  Container,
  Header,
  createStyles,
  ActionIcon,
  Select,
  Group,
  Box,
} from "@mantine/core";
import { BsHouse } from "react-icons/bs";
import { SiEpicgames } from "react-icons/si";
import { BiChevronDown } from "react-icons/bi";
import GamesNavigator from "../GamesNavigator";
const useStyles = createStyles((theme) => ({
  header: {
    height: "100%",
    maxWidth: 1200,
  },

  links: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  select: {
    maxWidth: "min-content",
  },
}));

function DefaultHeader() {
  const { classes } = useStyles();
  return (
    <Header height={98} pt="xs">
      <Container className={classes.header}>
        <Group spacing={5} className={classes.links}>
          <Group spacing={46} ml={55}>
            <ActionIcon variant="transparent" color="black">
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
          <GamesNavigator />
          {/* <ActionIcon variant="transparent">
							<BsBell />
						</ActionIcon> */}
          <Group>
            <Button variant="filled">Sign Up</Button>
            <Button variant="outline">Login</Button>
          </Group>
        </Group>
      </Container>
    </Header>
  );
}

export default DefaultHeader;
