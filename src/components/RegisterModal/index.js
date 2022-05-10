import { useState } from "react";
import {
  Text,
  PasswordInput,
  Anchor,
  Modal,
  Group,
  TextInput,
  Button,
} from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import "../Modal/Sign.css";
import { ModalsContext } from "../../ModalsContext";
function RegisterModal() {
  const { loginModal, registerModal } = useContext(ModalsContext);
  const [registerModalOpen, setRegisterModalOpen] = registerModal;
  const handleRegisterClose = () => {
    setRegisterModalOpen(false);
  };
  return (
    <Modal
      centered
      opened={registerModalOpen}
      onClose={handleRegisterClose}
      size="calc(33vw - 100px)"
      classNames={{ modal: "modal-container", header: "lgn-modal-header" }}
      closeButtonLabel="Close login modal"
    >
      <Group direction="column" className="loginModalContainer" align="center">
        <TextInput
          label="Email"
          placeholder="someone@somewhere.com"
          id="email"
          styles={{ label: { marginBottom: 10 } }}
        />
        <TextInput
          label="Username"
          placeholder="User"
          id="username"
          styles={{ label: { marginBottom: 10 } }}
        />
        <Tooltip
          label={
            valid ? "All good!" : "Password must include at least 6 characters"
          }
          position="bottom"
          placement="start"
          withArrow
          opened={opened}
          sx={{ display: "block", width: "100%" }}
          color={valid ? "teal" : "gray"}
        >
          <PasswordInput
            label="Password"
            placeholder="Password"
            id="password"
            onFocus={() => setOpened(true)}
            onBlur={() => setOpened(false)}
            styles={{ label: { marginBottom: 10 } }}
          />
        </Tooltip>
        <Button
          classNames={{
            root: "modal-login-btn",
          }}
        >
          Log In
        </Button>

        <Text classNames={{ root: "modal-txt-or" }}> OR</Text>
        <Button
          classNames={{ root: "modal-contw-google-btn" }}
          leftIcon={<FcGoogle />}
          size="lg"
        >
          Continue with Google
        </Button>
        <Group ml={5} className="no-account-helper">
          <Text>Already have an account? </Text>
          <Anchor
            href="#"
            onClick={(event) => event.preventDefault()}
            sx={() => ({
              fontWeight: 500,
            })}
          >
            Log in
          </Anchor>
        </Group>
      </Group>
    </Modal>
  );
}

export default RegisterModal;
