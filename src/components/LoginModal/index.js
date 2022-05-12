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
import { showNotification } from "@mantine/notifications";
import { GiHand } from "react-icons/gi";
import { ModalsContext } from "../../ModalsContext";
import axios from "axios";
import { userUrl } from "../../constants/request";
import { useCookies } from "react-cookie";

function LoginModal() {
	const { loginModal, registerModal } = useContext(ModalsContext);
	const [loginModalOpen, setLoginModalOpen] = loginModal;
	const [loading, setLoading] = useState(false);
	const [cookies, setCookie] = useCookies(["accessToken"]);

	const handleLoginClose = () => {
		setLoginModalOpen(false);
	};
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState({
		email: false,
		password: false,
	});
	const handleFormInfo = (e) => {
		const { value, name } = e.target;
		console.log(form);
		setForm({ ...form, [name]: value });
	};
	const handleSubmit = () => {
		setLoading(true);
		const { email, password } = form;
		if (!(email && password)) {
		}
		const requestData = {
			email: email,
			password: password,
		};
		axios
			.post(`${userUrl}/login`, requestData)
			.then((res) => {
				if (res.status === 200) {
					setLoading(false);
					setCookie("accessToken", res.data.token, { path: "/" });
					showNotification({
						id: "login-success",
						disallowClose: true,
						autoClose: 5000,
						title: `Hi, ${res.data.username}! It's nice to see you today.`,
						color: "green",
						icon: <GiHand size={18} />,
						loading: false,
					});
					setLoginModalOpen(false);
				}
			})
			.catch((error) => {
				setLoading(false);
				showNotification({
					id: "login-failure",
					disallowClose: true,
					autoClose: 5000,
					title: "Login error",
					message: "Error message:" + error,
					color: "red",
					loading: false,
				});
				setLoginModalOpen(false);
			});
	};
	return (
		<Modal
			key="login-modal"
			centered
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
					type="email"
					name="email"
					value={form.email}
					onChange={handleFormInfo}
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
					<PasswordInput
						placeholder="Your password"
						id="password"
						name="password"
						value={form.password}
						onChange={handleFormInfo}
					/>
				</div>
				<Button
					classNames={{
						root: "modal-login-btn",
					}}
					type="submit"
					onClick={handleSubmit}
					loading={loading}>
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

export default LoginModal;
