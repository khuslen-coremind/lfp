import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Group, Text, useMantineTheme, MantineTheme } from "@mantine/core";

export const dropzoneChildren = (status, theme) => (
  <Group
    position="center"
    spacing="xl"
    style={{
      pointerEvents: "none",
    }}
  >
    <div style={{ textAlign: "center" }}>
      <Text size="xl" inline>
        Drag images and videos here or{" "}
        <b style={{ color: "#7280FA" }}>Browse</b>
      </Text>
      <Text size="sm" color="dimmed" inline mt="md">
        File should not exceed 5MB
      </Text>
    </div>
  </Group>
);

function Uploader(props) {
  return (
    <Dropzone
      onDrop={(files) => console.log("accepted files", files)}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      sx={{ height: 250, display: "flex", justifyContent: "center" }}
    >
      {(status) => dropzoneChildren(status)}
    </Dropzone>
  );
}

export default Uploader;
