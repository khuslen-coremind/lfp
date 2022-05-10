// import logo from "./logo.svg";
import {
  AppShell,
  Container,
  createStyles,
  Text,
  PasswordInput,
  Anchor,
  Modal,
  Group,
  PasswordInputProps,
  Paper,
  TextInput,
  Button,
} from "@mantine/core";

import DefaultHeader from "../../components/headers/DefaultHeader";
import UserHeader from "../../components/headers/UserHeader";
import { useNavigate } from "react-router-dom";
import "./a.css";
import { useState } from "react";
import Login from "../../components/LoginModal";
const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
    maxWidth: 1320,
  },
}));
function DefaultHoc(props) {
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
    <AppShell
      header={
        <DefaultHeader
          navLogoHandler={handleGameLogoClick}
          handleToHome={handleHome}
        />
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
      <Login />
    </AppShell>
  );
}

export default DefaultHoc;
