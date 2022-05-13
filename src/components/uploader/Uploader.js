import {
  Dropzone,
  DropzoneStatus,
  IMAGE_MIME_TYPE,
  MIME_TYPES,
} from "@mantine/dropzone";
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
function Uploader({ onDrop, onReject }) {
  const handleDrop = (files) => {
    onDrop(files);
  };
  const handleReject = (files) => {
    onReject(files);
  };
  return (
    <Dropzone
      accept={(IMAGE_MIME_TYPE, MIME_TYPES.mp4)}
      onDrop={handleDrop}
      onReject={handleReject}
      maxSize={5 * 1024 * 1024}
      sx={{ height: 250, display: "flex", justifyContent: "center" }}
    >
      {(status) => dropzoneChildren(status)}
    </Dropzone>
  );
}

export default Uploader;
