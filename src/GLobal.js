import { Global } from "@mantine/core";
import "./fonts/Manrope/Manrope-Bold.ttf";
import "./fonts/Manrope/Manrope-Light.ttf";

export function Demo() {
	return (
		<Global
			styles={[
				{
					"@font-face": {
						fontFamily: "Manrope",
						src: `url("./fonts/Manrope/Manrope-Bold.ttf") format("ttf")`,
						fontWeight: 700,
						fontStyle: "normal",
					},
				},
				{
					"@font-face": {
						fontFamily: "Manrope",
						src: `url("./fonts/Manrope/Manrope-Light.ttf") format("ttf")`,
						fontWeight: 300,
						fontStyle: "normal",
					},
				},
			]}
		/>
	);
}
