import { forwardRef, useState } from "react";
import { ActionIcon, Group } from "@mantine/core";
import "./gamesNavigator.css";
import { ReactComponent as CsgoSvg } from "../../images/gamesLogo/csgo.svg";
import { ReactComponent as Dota2Svg } from "../../images/gamesLogo/dota2.svg";
import { ReactComponent as GenshinImpactSvg } from "../../images/gamesLogo/genshin-impact.svg";
import { ReactComponent as LolSvg } from "../../images/gamesLogo/lol.svg";
import { ReactComponent as MobileLegendsSvg } from "../../images/gamesLogo/mobile-legends.svg";
import { ReactComponent as PubgmSvg } from "../../images/gamesLogo/pubgm.svg";
import { ReactComponent as ValorantSvg } from "../../images/gamesLogo/valorant.svg";

const GamesNavigator = ({ click }) => {
  const handleLogoClick = (gameId) => (e) => {
    click(gameId);
  };

  const svgs = [
    { id: 0, content: <Dota2Svg key="dota2" /> },
    { id: 1, content: <LolSvg key="lol" /> },
    { id: 2, content: <CsgoSvg key="csgo" /> },
    { id: 3, content: <ValorantSvg key="valorant" /> },
    { id: 4, content: <GenshinImpactSvg key="genshinImpact" /> },
    { id: 5, content: <MobileLegendsSvg key="mobileLegends" /> },
    { id: 6, content: <PubgmSvg key="pubgMobile" /> },
  ];
  const games = [
    {
      id: 0,
      name: "Dota2",
      clickCount: 0,
      popularity: 0,
    },
    {
      id: 1,
      name: "League of Legends",
      clickCount: 0,
      popularity: 0,
    },
    {
      id: 2,
      name: "CS:GO",
      clickCount: 0,
      popularity: 0,
    },
    {
      id: 3,
      name: "Valorant",
      clickCount: 0,
      popularity: 0,
    },
    {
      id: 4,
      name: "Genshin Impact",
      clickCount: 0,
      popularity: 0,
    },

    {
      id: 5,
      name: "Mobile Legends: Bang Bang",
      clickCount: 0,
      popularity: 0,
    },
    {
      id: 6,
      name: "Pubg Mobile",
      clickCount: 0,
      popularity: 0,
    },
  ];

  return (
    <Group spacing={29} align="center">
      {games.map((e) => {
        return (
          <ActionIcon
            key={e.id}
            className="gameIcons"
            variant="transparent"
            onClick={handleLogoClick(e.id)}
          >
            {svgs.filter((el) => el.id === e.id).map((e) => e.content)}
          </ActionIcon>
        );
      })}{" "}
      {/* <Select options={options} /> */}
    </Group>
  );
};

export default GamesNavigator;
