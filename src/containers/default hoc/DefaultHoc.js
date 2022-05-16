// import logo from "./logo.svg";
import { AppShell, Container, createStyles } from "@mantine/core";

import DefaultHeader from "../../components/headers/DefaultHeader";
import UserHeader from "../../components/headers/UserHeader";
import { useNavigate } from "react-router-dom";
import "./a.css";
import LoginModal from "../../components/LoginModal";
import RegisterModal from "../../components/RegisterModal";
import { useCookies } from "react-cookie";
import { useEffect, useContext } from "react";
import AuthService from "../../services/auth.service";
import { AuthContext } from "../../AuthContext";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
    maxWidth: 1320,
  },
}));
function DefaultHoc(props) {
  const [cookie] = useCookies("accessToken");
  const { isAuthenticated, setAuthenticated, setUserId } =
    useContext(AuthContext);
  useEffect(() => {
    console.log(
      "access token from cookie= " + cookie.accessToken,
      "userid from cookie= " + cookie.userId
    );
    if (cookie.accessToken) {
      setAuthenticated(true);
      setUserId(cookie.userId);
    }
  }, [isAuthenticated, setAuthenticated, setUserId]);

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
  const onLogout = () => {
    AuthService.logout();
    setAuthenticated(false);
    setUserId(null);
  };

  return (
    <AppShell
      header={
        isAuthenticated ? (
          <UserHeader
            navLogoHandler={handleGameLogoClick}
            handleToHome={handleHome}
            onLogout={onLogout}
          />
        ) : (
          <DefaultHeader
            navLogoHandler={handleGameLogoClick}
            handleToHome={handleHome}
          />
        )
      }
      styles={(theme) => ({
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          height: "calc(100vh - 10px)",
        },
      })}
    >
      {/* Your application here */}
      <Container
        size="lg"
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
        //    className={classes.container}
      >
        {props.children}
      </Container>
      <LoginModal />
      <RegisterModal />
    </AppShell>
  );
}

export default DefaultHoc;
