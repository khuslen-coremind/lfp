import { useContext, useState } from "react";
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

function Login() {
	const { loginModal, registerModal } = useContext(ModalsContext);
	const [loginModalOpen, setLoginModalOpen] = loginModal;
	const handleLoginClose = () => {
		setLoginModalOpen(false);
	};
	return (
		<Modal
			centered
			//   opened={true}
			opened={loginModalOpen}
			onClose={handleLoginClose}
			size="calc(33vw - 100px)"
			classNames={{ modal: "modal-container", header: "lgn-modal-header" }}
			closeButtonLabel="Close login modal">
			<Group direction="column" className="loginModalContainer" align="center">
				<TextInput
					label="Username"
					placeholder="User"
					id="username"
					styles={{ label: { marginBottom: 10 } }}
				/>
				<div>
					<Group position="apart" mb={10}>
						<Text component="label" htmlFor="password" size="sm" weight={500}>
							Password
						</Text>
						<Anchor
							href="#"
							onClick={(event) => event.preventDefault()}
							sx={(theme) => ({
								paddingTop: 2,
								paddingRight: 10,
								color:
									theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
								fontWeight: 500,
								fontSize: theme.fontSizes.xs,
							})}>
							Forgot your password?
						</Anchor>
					</Group>
					<PasswordInput placeholder="Your password" id="password" />
				</div>
				<Button
					classNames={{
						root: "modal-login-btn",
					}}>
					Log In
				</Button>

				<Text classNames={{ root: "modal-txt-or" }}> OR</Text>
				<Button
					classNames={{ root: "modal-contw-google-btn" }}
					leftIcon={<FcGoogle size={25} />}
					size="lg">
					Continue with Google
				</Button>
				<Group ml={5} className="no-account-helper">
					<Text>No account? </Text>
					<Anchor
						href="#"
						onClick={(event) => event.preventDefault()}
						sx={() => ({
							fontWeight: 500,
						})}>
						Create an account.
					</Anchor>
				</Group>
			</Group>
		</Modal>
	);
}

export default Login;
