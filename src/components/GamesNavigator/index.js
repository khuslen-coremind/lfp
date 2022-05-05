import { forwardRef, useState } from "react";

import {
	Container,
	Header,
	createStyles,
	ActionIcon,
	Select,
	Group,
	Menu,
	Avatar,
	Text,
	Button,
} from "@mantine/core";
import { SiEpicgames } from "react-icons/si";
import { BsFillCaretDownFill } from "react-icons/bs";
const useStyles = createStyles((theme) => ({
	select: {
		border: "none",
		maxWidth: 110,
		fontSize: 20,
	},

	selected: {
		border: "none",
	},
	// wrapper: {
	// 	width: "min-content",
	// },
	input: {
		width: "fit-content",
		border: "none",
		// color: "darkblue",
	},
	dropdown: {
		width: "fit-content",
		display: "flex",
		// paddingTop: 10,
		// paddingBottom: 10,
		// paddingLeft: 7,
		// paddingRight: 10,
	},
	root: {},
}));
const GamesNavigator = ({ click }) => {
	const handleLogoClick = () => {
		click();
	};
	const { classes } = useStyles();
	const GamesItem = forwardRef(
		({ image, label, last, ...others }, ref) => (
			// last ? (
			<div ref={ref} {...others}>
				<Group noWrap position="left" spacing="sm">
					<Avatar src={image} style={{ height: 40, width: 40 }} />
					<Text weight={500} size="sm">
						{label}
					</Text>
				</Group>
			</div>
		)
		// ) : (
		// 	<div ref={ref} {...others}>
		// 		<Group noWrap position="left" spacing="sm" mb={15}>
		// 			<Avatar src={image} style={{ height: 40, width: 40 }} />
		// 			<Text weight={500} size="sm">
		// 				{label}
		// 			</Text>
		// 		</Group>
		// 	</div>
		// )
	);
	const data = [
		{
			last: false,
			label: "DOTA 2",
			image:
				"https://i.pinimg.com/736x/ab/75/46/ab754671e4b62d109fcf4d76aec8b4df--anime-manga-saitama.jpg",
		},
		{
			last: false,
			label: "VALORANT",
			image:
				"https://i.pinimg.com/736x/ab/75/46/ab754671e4b62d109fcf4d76aec8b4df--anime-manga-saitama.jpg",
		},
		{
			last: true,
			label: "OSU!",
			image:
				"https://i.pinimg.com/736x/ab/75/46/ab754671e4b62d109fcf4d76aec8b4df--anime-manga-saitama.jpg",
		},
	];

	return (
		<Group spacing={29}>
			{new Array(6).fill(undefined).map((e, i) => {
				return (
					<ActionIcon key={i.toString()} variant="transparent" onClick={handleLogoClick}>
						<SiEpicgames size={35} />
					</ActionIcon>
				);
			})}{" "}
			<Select
				placeholder="OTHER"
				size="lg"
				dropdownComponent="button"
				rightSection={<BsFillCaretDownFill size={14} />}
				rightSectionWidth={30}
				itemComponent={GamesItem}
				styles={{ rightSection: { pointerEvents: "none" } }}
				className={classes.select}
				classNames={classes}
				data={data}
			/>
		</Group>
	);
};

export default GamesNavigator;
