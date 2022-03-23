import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./fonts/Manrope/Manrope-Bold.ttf";
import "./fonts/Manrope/Manrope-Light.ttf";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
	<BrowserRouter>
		<App
			styles={
				[
					// {
					// 	"@font-face": {
					// 		fontFamily: "Manrope",
					// 		src: `url("./fonts/Manrope/Manrope-Bold.ttf") format("ttf")`,
					// 		fontWeight: 700,
					// 		fontStyle: "normal",
					// 	},
					// },
					// {
					// 	"@font-face": {
					// 		fontFamily: "Manrope",
					// 		src: `url("./fonts/Manrope/Manrope-Light.ttf") format("ttf")`,
					// 		fontWeight: 300,
					// 		fontStyle: "normal",
					// 	},
					// },
				]
			}
		/>
	</BrowserRouter>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
