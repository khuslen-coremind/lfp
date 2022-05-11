// import logo from "./logo.svg";
import "./App.css";
import { createStyles, Text, Box } from "@mantine/core";
// import DefaultHeader from "./components/headers/DefaultHeader";
// import UserHeader from "./components/headers/UserHeader";
import RoomCard from "./components/roomCard/RoomCard";
import List from "./components/followList/List";
// import Hub from "../src/containers/Hub/Hub";
import { Routes, Route, Link } from "react-router-dom";
import DefaultHoc from "./containers/default hoc/DefaultHoc";
import CreateRoom from "./components/roomCard/CreateRoom";
import CreatePost from "./components/post/CreatePost";
import Post from "./components/post/Post";
import PostForm from "./containers/PostForm/PostForm";
import RoomFormModal from "./containers/RoomFormModal/RoomFormModal";
import Room from "./containers/room/Room";
import ContainedHoc from "./containers/contained/ContainedHoc";
import { useState } from "react";
import { ModalsContext } from "./ModalsContext";
const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
    maxWidth: 1320,
  },
}));
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
    createdOn: "",
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
    createdOn: "",
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
    createdOn: "",
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
    createdOn: "",
  },
];
const posts = [
  {
    userName: "ruizaki",
    createdOn: "2h",
    voteCount: 15,
    title: "I believe so yah. If an effect is causing a loopm",
    content: "https://tkdodo.eu/blog/react-query-data-transformations",
    comments: [{}, {}, {}, {}],
  },
  {
    userName: "imTheEdgyKid",
    createdOn: "4h",
    voteCount: "2",
    title: "Childe ascention material farming",
    content: "oin, I will be waiting",
    comments: [{}, {}, {}],
  },
  {
    userName: "okayChamp",
    createdOn: "30m",
    voteCount: "544",
    title: "Childe ascention material farming",
    content: "oin, I will be waiting",
    comments: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  },
];
function App() {
  const { classes } = useStyles();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  return (
    <ModalsContext.Provider
      value={{
        loginModal: [loginModalOpen, setLoginModalOpen],
        registerModal: [registerModalOpen, setRegisterModalOpen],
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <DefaultHoc>
              <Box mt={45}>
                <Text mb={16}>Recent Activities</Text>
                <RoomCard roomDetail={tahh[0]} />
                <RoomCard roomDetail={tahh[1]} />
                <RoomCard roomDetail={tahh[2]} />
                <RoomCard roomDetail={tahh[3]} />
                <RoomCard roomDetail={tahh[2]} />
                <RoomCard roomDetail={tahh[3]} />
              </Box>

              <Box mt={45}>
                <Text mb={16}>Games that you follow</Text>
                <List />
              </Box>
            </DefaultHoc>
          }
        ></Route>
        <Route
          path=":gameId"
          element={
            <DefaultHoc>
              <Box mt={45} style={{ flexGrow: 0.7 }}>
                <Text mb={16}>Community posts</Text>
                <CreatePost />
                {posts.map((e, i) => {
                  return <Post postData={e} key={e.createdOn} />;
                })}
              </Box>
              {/* <div>
							<Divider mt={85} orientation="vertical" />
						</div> */}
              <Box mt={45}>
                <Text mb={16}>LFP activities</Text>
                <CreateRoom />
                {tahh.map((e, i) => {
                  return <RoomCard roomDetail={e} key={e.createdOn} />;
                })}
              </Box>
            </DefaultHoc>
          }
        ></Route>
        <Route
          path="create/post"
          element={
            <DefaultHoc>
              <Box mt={45}>
                <PostForm />
              </Box>
            </DefaultHoc>
          }
        />
        <Route
          path="create/room"
          element={
            <DefaultHoc>
              <Box mt={45}>
                <RoomFormModal />
              </Box>
            </DefaultHoc>
          }
        />

        <Route
          path="room/12"
          element={
            <ContainedHoc>
              <Box mt={20}>
                <Room />
              </Box>
            </ContainedHoc>
          }
        />
        {/* <Route
				path="valorant/create/room"
				element={
					<DefaultHoc>
						<Box mt={45}>
							
						</Box>
					</DefaultHoc>
				}
			/> */}
      </Routes>
    </ModalsContext.Provider>
  );
}

export default App;
