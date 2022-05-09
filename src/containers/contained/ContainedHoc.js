// import logo from "./logo.svg";
import {
  AppShell,
  Container,
  createStyles,
  Text,
  Box,
  useMantineTheme,
} from "@mantine/core";
// import DefaultHeader from "./components/headers/DefaultHeader";
import UserHeader from "../../components/headers/UserHeader";
function ContainedHoc(props) {
  return (
    <AppShell
      header={<UserHeader />}
      styles={(theme) => ({
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {/* Your application here */}
      <Container
        size="lg"
        sx={{
          display: "flex",
          justifyContent: "space-around",
          height: "100%",
        }}
      >
        {props.children}
      </Container>
    </AppShell>
  );
}

export default ContainedHoc;
