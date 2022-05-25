import { Box, Loader, Text } from "@mantine/core";
import RoomCard from "../../components/roomCard/RoomCard";
import InfiniteScroll from "react-infinite-scroll-component";
import React, { useEffect, useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { API_URL } from "../../constants/request";

import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { showNotification } from "@mantine/notifications";

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function RoomActivity({ gameId }) {
  const [pageNumber, setPageNumber] = useState(2);
  const [limit, setLimit] = useState(15);
  const [items, setItems] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const { isAuthenticated, setAuthenticated } = useContext(AuthContext);
  const handleRoomDeletion = (id) => {
    if (isAuthenticated) {
      const requestData = { roomId: id };
      const config = {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      };
      axios
        .post(`http://${API_URL}/api/room/delete`, requestData, config)
        .then((response) => {
          if (response.status === 200) {
            let rooms = items;
            rooms = rooms.filter((e) => e.id !== id);
            setItems(rooms);
            showNotification({
              id: "deletion-complete",
              disallowClose: true,
              autoClose: 7000,
              title: "Deleted the post",
              color: "yellow",
              loading: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      showNotification({
        id: "deletion-error",
        disallowClose: true,
        autoClose: 7000,
        title: "Can't delete rn ;-;",
        color: "red",
        loading: false,
      });
    }
  };
  useEffect(() => {
    const getRooms = async () => {
      const res = await fetch(
        gameId
          ? `http://${API_URL}/api/room/${gameId}/rooms?page=1&limit=${limit}`
          : `http://${API_URL}/api/room/latest/rooms?page=1&limit=${limit}`
      );
      const data = await res.json();
      console.log(data);
      setItems(data.results);
      if (data.results.length === 0) {
        sethasMore(false);
      }
    };
    getRooms();
  }, [gameId]); //bhq bol hooson bh ystoi

  const fetchRooms = async () => {
    const res = await fetch(
      gameId
        ? `http://${API_URL}/api/room/${gameId}/rooms?page=${pageNumber}&limit=${limit}`
        : `http://${API_URL}/api/room/latest/rooms?page=${pageNumber}&limit=${limit}`
    );
    const data = await res.json();
    return data.results;
  };

  const fetchData = async () => {
    const rooms = await fetchRooms();
    setItems((prev) => _.unionBy(prev, rooms, "id"));
    if (rooms.length === 0 || rooms.length < limit) {
      sethasMore(false);
    }

    setPageNumber(pageNumber + 1);
  };
  return (
    <InfiniteScroll
      //This is important field to render the next data
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={
        <Box mt={50} sx={{ textAlign: "center" }}>
          <Loader color="gray" size="lg" variant="dots" />
        </Box>
      }
      endMessage={
        <Box
          my={50}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BsCheck2 size={30} color="green" />
          <Text Text size="xl" ml="xs" weight={500}>
            No more waiting rooms for today T-T
          </Text>
        </Box>
      }
      // below props only if you need pull down functionality
      // refreshFunction={this.refresh}
      // pullDownToRefresh
      // pullDownToRefreshThreshold={50}
      // pullDownToRefreshContent={ */}
      // 	<h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
      // }
      // releaseToRefreshContent={
      // 	<h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
      // }
    >
      {items.map((e) => {
        return (
          <React.Fragment key={e.id}>
            <RoomCard roomDetail={e} onDeletion={handleRoomDeletion} />
          </React.Fragment>
        );
      })}
    </InfiniteScroll>
  );
}

export default RoomActivity;
