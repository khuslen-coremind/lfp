// import logo from "./logo.svg";
import {
  createStyles,
  Text,
  Paper,
  Group,
  Select,
  TextInput,
  Tabs,
  Box,
  Accordion,
  Button,
  Container,
  Divider,
  Avatar,
} from "@mantine/core";
import "./postForm.css";
import { useContext, useState, useEffect } from "react";
import { RichTextEditor } from "@mantine/rte";
import { BsCardText, BsImage, BsChevronDown, BsUpload } from "react-icons/bs";
import Uploader from "../../components/uploader/Uploader";
import { useNavigate } from "react-router-dom";
import dota2Svg from "../../images/gamesLogo/dota2.svg";
import lolSvg from "../../images/gamesLogo/lol.svg";
import csgoSvg from "../../images/gamesLogo/csgo.svg";
import valorantSvg from "../../images/gamesLogo/valorant.svg";
import genshinSvg from "../../images/gamesLogo/genshin-impact.svg";
import mlSvg from "../../images/gamesLogo/mobile-legends.svg";
import pubgmSvg from "../../images/gamesLogo/pubgm.svg";
import axios from "axios";
import { API_URL } from "../../constants/request";
import { AiOutlineCheck } from "react-icons/ai";
import { showNotification } from "@mantine/notifications";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../AuthContext";
import { ModalsContext } from "../../ModalsContext";
import { MyDrafts } from "../../components/MyDrafts/MyDrafts";

function PostForm(props) {
  const { isAuthenticated, userId } = useContext(AuthContext);
  const { loginModal } = useContext(ModalsContext);
  const [loginModalOpen, setLoginModalOpen] = loginModal;
  let navigate = useNavigate();
  const [cookie] = useCookies("accessToken");
  const handlePrevious = (e) => {
    e.preventDefault();
    navigate("../");
  };
  const initialValue = "<p>any <a >link</a>, plain text</p>";

  const GameSelectItem = ({ image, label, ...others }) => (
    <div {...others}>
      <Group noWrap>
        <Avatar
          src={image}
          size="sm"
          styles={{ image: { objectFit: "contain" } }}
        />
        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  );

  const gameData = [
    { value: "1", label: "Dota 2", image: dota2Svg },
    { value: "2", label: "League of Legends", image: lolSvg },
    { value: "3", label: "Counter-Strike: Global Offensive", image: csgoSvg },
    { value: "4", label: "Valorant", image: valorantSvg },
    { value: "5", label: "Genshin Impact", image: genshinSvg },
    { value: "6", label: "Mobile Legends: Bang Bang", image: mlSvg },
    { value: "7", label: "PUBG Mobile", image: pubgmSvg },
  ];

  const [gameId, setGameId] = useState("");
  const [title, setTitle] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [textContent, onTextContentChange] = useState("");
  const [fileContent, setFileContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (isDraft) => {
    if (isAuthenticated) {
      setLoading(true);
      let formData = new FormData();
      formData.append("title", title);
      formData.append("gameId", gameId);
      formData.append("userId", userId);
      if (activeTab === 0) {
        formData.append("isTextContent", true);
        formData.append("textContent", textContent);
        if (isDraft) {
          formData.append("isDraft", true);
        }
      } else {
        formData.append("isTextContent", false);
        formData.append("file_content", fileContent);
      }
      const config = {
        headers: {
          Authorization: `Bearer ${cookie.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(`${API_URL}/api/post/create`, formData, config)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            navigate("/");
            showNotification({
              id: "post-success",
              disallowClose: true,
              autoClose: 5000,
              title: isDraft ? `Draft saved.` : `Posted successfully.`,
              color: "green",
              icon: <AiOutlineCheck size={18} />,
              loading: false,
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          showNotification({
            id: "post-failure",
            disallowClose: true,
            autoClose: 5000,
            title: "Error occurred.",
            message: "Error message:" + err,
            color: "red",
            loading: false,
          });
        });
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleDrop = (files) => {
    setFileContent(files[0]);
  };
  const handleReject = () => {
    showNotification({
      id: "file-rejection",
      disallowClose: true,
      autoClose: 5000,
      title:
        "Sorry, only images (.png, .jpg, .jpeg, .gif) and videos (.mp4) accepted.",
      color: "red",
      loading: false,
    });
  };
  const handleRemove = () => {
    setFileContent([]);
  };
  return (
    <Container style={{ display: "flex", flexDirection: "row" }}>
      <Group direction="column" style={{ width: 600 }} position="apart" mr="xl">
        <Group style={{ width: "100%" }} position="apart">
          <Text>
            Share <b>anything</b> related to the community
          </Text>
          <Select
            itemComponent={GameSelectItem}
            data={gameData}
            rightSection={<BsChevronDown size={14} />}
            rightSectionWidth={30}
            styles={{
              rightSection: {
                pointerEvents: "none",
              },
              label: { paddingBottom: 10 },
            }}
            value={gameId}
            onChange={setGameId}
            maxDropdownHeight={400}
          />
        </Group>
        <TextInput
          // id="title"
          mt={35}
          size="lg"
          label="Title"
          sx={{ width: "100%" }}
          placeholder=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Tabs
          active={activeTab}
          onTabChange={setActiveTab}
          mt={10}
          sx={{ width: "100%" }}
        >
          <Tabs.Tab
            style={{ fontSize: 16, fontWeight: "bold" }}
            label="Text"
            icon={<BsCardText size={16} />}
          >
            <Box sx={{ width: "100%", minHeight: 300 }}>
              <RichTextEditor
                value={textContent}
                onChange={onTextContentChange}
                controls={[
                  ["bold", "italic", "underline", "strike", "clean "],
                  ["h1", "h2", "h3", "h4"],
                  ["unorderedList", "orderedList", "blockquote"],
                  ["link", "image ", "video", "embed"],
                  ["alignLeft", "alignCenter", "alignRight"],
                ]}
                className="quil-modified"
              />
            </Box>
          </Tabs.Tab>
          <Tabs.Tab
            style={{ fontSize: 16, fontWeight: "bold" }}
            label="Images & videos"
            icon={<BsImage size={16} />}
          >
            <Box sx={{ width: "100%", minHeight: 300 }}>
              <Uploader
                onDrop={handleDrop}
                onReject={handleReject}
                files={fileContent}
                onRemove={handleRemove}
              />
            </Box>
          </Tabs.Tab>
        </Tabs>
        <Group sx={{ justifySelf: "end", alignSelf: "end" }}>
          <Button variant="outline" onClick={handlePrevious} disabled={loading}>
            CANCEL
          </Button>
          {activeTab === 0 && (
            <Button
              variant="outline"
              disabled={loading}
              onClick={() => handleSubmit("draft")}
            >
              SAVE DRAFT
            </Button>
          )}

          <Button
            variant="filled"
            type="submit"
            onClick={handleSubmit}
            loading={loading}
          >
            POST
          </Button>
        </Group>
      </Group>
      <Container>
        <MyDrafts />
        <br />
        <Rules />
      </Container>
    </Container>
  );
}

const rules = [
  { title: "No illegal content", content: "No ilslds" },
  { title: "No harrasments", content: "No ilslds" },
  { title: "No sexual content", content: "No ilslds" },
  { title: "Self promo is accaptable, within reason", content: "No ilslds" },
];
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
    padding: "12px 17.8px 11px 10px",
  },

  item: {
    borderBottom: 0,
    overflow: "hidden",
    transition: `box-shadow 150ms ${theme.transitionTimingFunction}`,
    borderBottom: "1px solid transparent",
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[3],
    marginBottom: 8,
    // backgroundColor: "#2C384B",
  },

  itemOpened: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[3],

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
function StyledAccordion(props) {
  const { classes } = useStyles();
  return (
    <Accordion
      mt={35}
      iconSize={12}
      multiple
      iconPosition="right"
      classNames={classes}
      {...props}
    />
  );
}
function AccordionLabel({ title, i }) {
  return (
    <Group noWrap spacing="xs" pr={0}>
      <Text
        size="xs"
        //mb="auto"
        mb="auto"
      >
        {i}.
      </Text>
      <Text size="xs">{title}</Text>
    </Group>
  );
}
const items = rules.map((item, i) => (
  <Accordion.Item
    label={<AccordionLabel {...item} i={i + 1} />}
    key={item.title}
  >
    <Text size="sm">{item.content}</Text>
  </Accordion.Item>
));
const Rules = () => {
  return (
    <Paper style={{ width: 245 }} shadow="xs" px="sm" pt={20}>
      <Text weight={700} pl={6}>
        Community post rules
      </Text>
      <StyledAccordion iconSize={12}>{items}</StyledAccordion>
    </Paper>
  );
};
export default PostForm;
