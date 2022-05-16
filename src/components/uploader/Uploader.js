import { Dropzone, DropzoneStatus, MIME_TYPES } from "@mantine/dropzone";

import { IoCloseOutline } from "react-icons/io5";
import { BsImage, BsUpload } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";
import {
  Group,
  Text,
  useMantineTheme,
  MantineTheme,
  Paper,
  Image,
  ActionIcon,
} from "@mantine/core";
function getIconColor(status, theme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({ status, ...props }) {
  console.log(status);
  if (status.accepted) {
    return <BsUpload {...props} />;
  }
  if (status.rejected) {
    return <IoCloseOutline {...props} />;
  }
  return <BsImage {...props} />;
}

export const dropzoneChildren = (status, theme) => (
  <>
    <Group
      position="center"
      spacing={35}
      style={{
        pointerEvents: "none",
      }}
    >
      <ImageUploadIcon
        status={status}
        style={{ color: getIconColor(status, theme) }}
        size={65}
      />
      <div style={{ textAlign: "start" }}>
        <Text size="xl" inline>
          Drag images and videos here or{" "}
          <b style={{ color: "#7280FA" }}>Browse</b>
        </Text>
        <Text size="sm" color="dimmed" inline mt="sm">
          File should not exceed 5MB.
        </Text>
      </div>
    </Group>
  </>
);
const Previews = ({ files, onRemove }) => {
  const prevSrc = URL.createObjectURL(files);
  const handleRemoveFile = () => {
    console.log("YES WORKI");
    onRemove();
    URL.revokeObjectURL(prevSrc);
  };
  return (
    <div style={{ position: "relative" }}>
      {/* {files.map((e) => { */}
      {/* const prevSrc = URL.createObjectURL(e); console.log(prevSrc); return ( */}
      <ActionIcon
        size="lg"
        radius="xl"
        styles={{
          root: {
            position: "absolute",
            right: -10,
            top: -10,
            zIndex: 1,
            backgroundColor: "#d0d0d0",
          },
        }}
        onClick={handleRemoveFile}
      >
        <IoCloseOutline size={25} color="red" />
      </ActionIcon>
      <Image
        width={100}
        height={100}
        src={prevSrc}
        radius="xs"
        styles={{ image: { objectFit: "cover" } }}
        alt="Image to upload"
        withPlaceholder
      />
      {/* ); */}
      {/* })} */}
    </div>
  );
};
function Uploader({ onDrop, onReject, files, onRemove }) {
  const theme = useMantineTheme();
  const handleDrop = (files) => {
    onDrop(files);
  };
  const handleReject = (files) => {
    onReject(files);
  };
  const handleRemove = () => {
    onRemove();
  };

  // const preview =
  return (
    <Group direction="column" p="xs">
      <Dropzone
        accept={[
          MIME_TYPES.png,
          MIME_TYPES.jpeg,
          MIME_TYPES.gif,
          MIME_TYPES.mp4,
        ]}
        onDrop={handleDrop}
        onReject={handleReject}
        maxSize={5 * 1024 * 1024}
        sx={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
      {files.length !== 0 && <Previews files={files} onRemove={handleRemove} />}
    </Group>
  );
}

export default Uploader;
