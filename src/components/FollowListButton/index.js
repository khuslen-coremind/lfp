import { ActionIcon, Tooltip } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { ReactComponent as CsgoSvg } from "../../images/gamesLogo/csgo.svg";
import { ReactComponent as CsgoDarkSvg } from "../../images/gamesLogo/csgoDark.svg";
import { ReactComponent as Dota2Svg } from "../../images/gamesLogo/dota2.svg";
import { ReactComponent as GenshinImpactSvg } from "../../images/gamesLogo/genshin-impact.svg";
import { ReactComponent as GenshinImpactDarkSvg } from "../../images/gamesLogo/genshin-impact-dark.svg";
import { ReactComponent as LolSvg } from "../../images/gamesLogo/lol.svg";
import { ReactComponent as MobileLegendsSvg } from "../../images/gamesLogo/mobile-legends.svg";
import { ReactComponent as PubgmSvg } from "../../images/gamesLogo/pubgm.svg";
import { ReactComponent as ValorantSvg } from "../../images/gamesLogo/valorant.svg";
import { IoAddOutline } from "react-icons/io5";
import { IoIosRemove } from "react-icons/io";
function FollowListButton({
  key,
  gameId,
  follow = false,
  unfollow = false,
  loading = false,
  handleList,
}) {
  const svgs = [
    { id: 1, content: <Dota2Svg key="dota2" /> },
    { id: 2, content: <LolSvg key="lol" /> },
    { id: 3, content: <CsgoDarkSvg key="csgo" /> },
    { id: 4, content: <ValorantSvg key="valorant" /> },
    { id: 5, content: <GenshinImpactDarkSvg key="genshinImpact" /> },
    { id: 6, content: <MobileLegendsSvg key="mobileLegends" /> },
    { id: 7, content: <PubgmSvg key="pubgMobile" /> },
  ];
  const { hovered, ref } = useHover();
  const handleClick = (gameId, action) => (e) => {
    handleList(gameId, action);
  };
  return (
    <Tooltip
      label={follow ? "Remove from list" : "Add to list"}
      withArrow
      gutter={2}
    >
      <ActionIcon
        loading={loading ? true : false}
        key={key}
        ref={ref}
        className="gameIcons"
        radius="md"
        variant={hovered ? "transparent" : "transparent"}
        color={follow ? "red" : unfollow ? "cyan" : ""}
        onClick={
          follow ? handleClick(gameId, "remove") : handleClick(gameId, "add")
        }
      >
        {hovered ? (
          follow ? (
            <IoIosRemove size={35} />
          ) : unfollow ? (
            <IoAddOutline size={35} />
          ) : null
        ) : (
          svgs.filter((el) => el.id === gameId).map((elm) => elm.content)
        )}
      </ActionIcon>
    </Tooltip>
  );
}

export default FollowListButton;
