import { useState, useContext } from "react";
import {
  Text,
  PasswordInput,
  Anchor,
  Modal,
  Group,
  TextInput,
  Button,
  Tooltip,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { FcGoogle } from "react-icons/fc";
import "../Modal/Sign.css";
import { ModalsContext } from "../../ModalsContext";
import AuthService from "../../services/auth.service";
function RegisterModal() {
  const { loginModal, registerModal } = useContext(ModalsContext);
  const [registerModalOpen, setRegisterModalOpen] = registerModal;
  const [loginModalOpen, setLoginModalOpen] = loginModal;

  const [toolTip, setToolTip] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    username: "",
    password: "",
    confirmation: "",
  });

  const [error, setError] = useState({
    email: "",
    confirmation: "",
  });
  const handleSubmit = () => {
    if (registerInfo.password === registerInfo.confirmation) {
      const requestData = {
        email: registerInfo.email,
        username: registerInfo.username,
        password: registerInfo.password,
      };
      AuthService.register(requestData)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            setRegisterModalOpen(false);
            showNotification({
              id: "register-success",
              disallowClose: true,
              onClose: () => console.log("unmounted"),
              onOpen: () => console.log("mounted"),
              autoClose: 5000,
              title: "Registered",
              message: "You can login with your credentials.",
              loading: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          setRegisterModalOpen(false);
        });
    } else {
      setError({ ...error, confirmation: false });
    }
  };
  const valid = registerInfo.password.trim().length >= 6;
  const handleRegisterClose = () => {
    setRegisterModalOpen(false);
  };
  const handleFillInfo = (field) => (e) => {
    console.log(registerInfo);
    setRegisterInfo({ ...registerInfo, [field]: e.target.value });
    // if (field === "confirmation") {
    //   registerInfo.password !== registerInfo.confirmation
    //     ? setError({ ...error, confirmation: true })
    //     : setError({ ...error, confirmation: false });
    // }
  };

  return (
    <Modal
      key="register-modal"
      centered
      opened={registerModalOpen}
      onClose={handleRegisterClose}
      onClick={() =>
        registerInfo.password === registerInfo.confirmation
          ? setError({ ...error, confirmation: false })
          : setError({ ...error, confirmation: true })
      }
      size="calc(33vw - 100px)"
      classNames={{ modal: "modal-container", header: "lgn-modal-header" }}
      closeButtonLabel="Close login modal"
    >
      <Group direction="column" className="loginModalContainer" align="center">
        <TextInput
          label="Email"
          required
          placeholder="someone@somewhere.com"
          id="email"
          type="email"
          onChange={handleFillInfo("email")}
          styles={{ label: { marginBottom: 10 } }}
        />
        <TextInput
          label="Username"
          required
          placeholder="User"
          id="username"
          onChange={handleFillInfo("username")}
          styles={{ label: { marginBottom: 10 } }}
        />
        <Tooltip
          label={
            valid ? "All good!" : "Password must include at least 6 characters"
          }
          position="bottom"
          placement="start"
          withArrow
          opened={toolTip}
          sx={{ display: "block", width: "100%" }}
          color={valid ? "teal" : "gray"}
        >
          <PasswordInput
            label="Password"
            required
            placeholder="Password"
            id="password"
            onChange={handleFillInfo("password")}
            onFocus={() => setToolTip(true)}
            onBlur={() => setToolTip(false)}
            styles={{ label: { marginBottom: 10 } }}
          />
        </Tooltip>
        <PasswordInput
          label="Confirm password"
          required
          placeholder="Write your password again"
          id="confirm-password"
          onChange={handleFillInfo("confirmation")}
          onBlur={() =>
            registerInfo.password === registerInfo.confirmation
              ? setError({ ...error, confirmation: false })
              : setError({ ...error, confirmation: true })
          }
          error={error.confirmation ? "Password didn't match" : false}
          styles={{ label: { marginBottom: 10 } }}
        />
        <Button
          type="submit"
          classNames={{
            root: "modal-login-btn",
          }}
          onClick={handleSubmit}
        >
          Sign up
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
            href=""
            onClick={(e) => {
              e.preventDefault();

              setRegisterModalOpen(false);
              setLoginModalOpen(true);
            }}
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
