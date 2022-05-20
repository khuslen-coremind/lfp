import { useEffect, useState } from "react";
import { Box, Text, Loader, Anchor } from "@mantine/core";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import RoomCard from "../roomCard/RoomCard";

function FollowListRooms({ gameId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getRooms = async () => {
      const res = await fetch(
        `http://localhost:8000/api/room/${gameId}/rooms?page=1&limit=3`
      );
      const data = await res.json();
      setItems(data.results);
      setLoading(false);
    };
    getRooms();
  }, [gameId]);

  {
    return loading ? (
      <Box
        my={50}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader size="lg" />
      </Box>
    ) : items.length > 0 ? (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {items.map((e) => {
          return <RoomCard roomDetail={e} key={e.id} />;
        })}
        <Anchor component={Link} to={gameId} mt={15}>
          See more ...
        </Anchor>
      </div>
    ) : (
      <Box
        my={50}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text Text size="xl" weight={600} mr="xs">
          No waiting rooms here
        </Text>
        <BsEmojiSmileUpsideDown size={25} />
      </Box>
    );
  }
}

export default FollowListRooms;
