import {
  Group,
  // createStyles,
  Tooltip,
  Box,
} from "@mantine/core";
import { BsMic, BsHeadset, BsHeadphones } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
// const useStyles = createStyles((theme) => ({}));
function Tools({ roomDetail }) {
  // const { classes } = useStyles();
  const userTools = roomDetail["technicalInfo"].split(",");
  const tools = [
    {
      name: "Headphones",
      label: "I'm willing to use headphones!",
      content:
        ((
          <BsHeadphones
            size={10}
            fill="#FFFFFF"
            style={{ marginTop: 3 }}
            key="headphones"
          />
        ),
        (
          <BsMic size={10} fill="#FFFFFF" style={{ marginTop: 3 }} key="mic" />
        )),
    },
    {
      name: "Microphone",
      label: "I'm willing to use microphone!",
      content: (
        <BsMic size={10} fill="#FFFFFF" style={{ marginTop: 3 }} key="mic" />
      ),
    },
    {
      name: "Headset",
      label: "I'm willing to use both my microphone and headphones :)",
      content: (
        <BsHeadset
          size={10}
          fill="#FFFFFF"
          style={{ marginTop: 3 }}
          key="headset"
        />
      ),
    },
    {
      name: "Discord",
      label: "I'm willing to use discord for comms",
      content: (
        <FaDiscord
          style={{ marginTop: 3 }}
          size={10}
          fill="#FFFFFF"
          key="discord"
        />
      ),
    },
    // <FaDiscord size={10} fill="#FFFFFF" />,
  ];
  return (
    <Group
      position="center"
      mt="sx"
      spacing={5}
      style={{ height: "min-content" }}
    >
      {userTools.map((e) => {
        return (
          <Tooltip
            radius="lg"
            label={tools[parseInt(e) - 1]["label"]}
            withArrow
            key={roomDetail.id + e}
          >
            {parseInt(e) - 1 === 3 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "0px 6px",
                  borderRadius: 11,
                  backgroundColor: "#5865F2",
                  fontFamily: "monospace",
                }}
              >
                {tools[parseInt(e) - 1]["content"]}
              </div>
            ) : (
              <Box
                sx={(theme) => ({
                  // backgroundColor:
                  // theme.colorScheme === "dark"
                  // theme.colors.dark[6],
                  //       : theme.colors.gray[0],
                  backgroundColor:
                    theme.colorScheme === "dark" ? "#615F5F" : "#615F5F",
                  textAlign: "center",
                  padding: "0px 6px",
                  borderRadius: 11,
                  fontFamily: "monospace",
                })}
              >
                {tools[parseInt(e) - 1]["content"]}
              </Box>
            )}
          </Tooltip>
        );
      })}
    </Group>
  );
}
export default Tools;
