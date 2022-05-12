import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
	const [cookie, removeCookie] = useCookies(["accessToken"]);
	const [isVerifiedToken, setIsVerifiedToken] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	useEffect(() => {}, []);

	const toggleAuth = () => {
		setIsAuthenticated(!isAuthenticated);
	};
	return (
		<AuthContext.Provider value={{ toggleAuth: toggleAuth }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
