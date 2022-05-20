import { Box, Loader, Text } from "@mantine/core";
import CreateRoom from "../../components/roomCard/CreateRoom";
import RoomCard from "../../components/roomCard/RoomCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsCheck2 } from "react-icons/bs";
import RoomActivity from "../RoomActivity";
function SideScreenRoom() {
  const { gameId } = useParams();
  const [pageNumber, setPageNumber] = useState(2);
  const [limit, setLimit] = useState(15);
  const [items, setItems] = useState([]);
  const [hasMore, sethasMore] = useState(true);

  useEffect(() => {
    const getRooms = async () => {
      const res = await fetch(
        `http://localhost:8000/api/room/${gameId}/rooms?page=1&limit=${limit}`
        // For json server use url below
        // `http://localhost:3004/comments?_page=1&_limit=20`
      );
      const data = await res.json();
      console.log(data);
      setItems(data.results);
      if (data.results.length === 0) {
        sethasMore(false);
      }
    };
    getRooms();
  }, [gameId]);

  const fetchRooms = async () => {
    const res = await fetch(
      `http://localhost:8000/api/room/${gameId}/rooms?page=${pageNumber}&limit=${limit}`
      // For json server use url below
      // `http://localhost:3004/comments?_page=${page}&_limit=20`
    );
    const data = await res.json();
    return data.results;
  };

  const fetchData = async () => {
    const commentsFormServer = await fetchRooms();

    setItems([...items, ...commentsFormServer]);
    if (commentsFormServer.length === 0 || commentsFormServer.length < limit) {
      sethasMore(false);
    }
    setPageNumber(pageNumber + 1);
  };
  return (
    <Box mt={45} sx={{ width: 475 }}>
      <Text mb={16}>LFP activities</Text>
      <CreateRoom />
      <RoomActivity gameId={gameId} />
    </Box>
  );
}

export default SideScreenRoom;
