// import logo from "./logo.svg";
import "./App.css";
import { createStyles, Text, Box } from "@mantine/core";
// import DefaultHeader from "./components/headers/DefaultHeader";
// import UserHeader from "./components/headers/UserHeader";
import List from "./components/followList/List";
// import Hub from "../src/containers/Hub/Hub";
import { Routes, Route } from "react-router-dom";
import DefaultHoc from "./containers/default hoc/DefaultHoc";
import PostForm from "./containers/PostForm/PostForm";
import RoomFormModal from "./containers/RoomFormModal/RoomFormModal";
import Room from "./containers/room/Room";
import { useMemo, useState, useEffect } from "react";
import { ModalsContext } from "./ModalsContext";
import { AuthContext } from "./AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import SideScreenPost from "./containers/SideScreenPost";
import SideScreenRoom from "./containers/SideScreenRoom";
import RoomActivity from "./containers/RoomActivity";
import { useCookies } from "react-cookie";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
    maxWidth: 1320,
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
function App() {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const { classes } = useStyles();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const authValue = useMemo(
    () => ({
      isAuthenticated,
      setAuthenticated,
      userId,
      setUserId,
    }),
    [isAuthenticated, setAuthenticated, userId, setUserId]
  );
  useEffect(() => {
    console.log(getCookie("accessToken"));
    if (getCookie("accessToken") !== null) {
      console.log("auth context value" + isAuthenticated);
      setAuthenticated(true);
      setUserId(getCookie("userId"));
    }
  }, [authValue]);
  const queryClient = new QueryClient();

  return (
    <AuthContext.Provider value={authValue}>
      <QueryClientProvider client={queryClient}>
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
                  <Box mt={45} sx={{ width: 475 }}>
                    <Text mb={16}>Recent Activities</Text>
                    <RoomActivity />
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
                  <SideScreenPost />
                  <SideScreenRoom />
                  {/* <div>
							<Divider mt={85} orientation="vertical" />
						</div> */}
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
                <DefaultHoc>
                  <Box mt={20}>
                    <Room />
                  </Box>
                </DefaultHoc>
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
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
