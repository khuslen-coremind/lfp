import React, { useEffect, useState } from "react";
import { Box, Text, Loader, Anchor, Modal } from "@mantine/core";
import { Link } from "react-router-dom";
import RoomCard from "../roomCard/RoomCard";
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
function FollowListRooms({ gameId }) {
  const { isAuthenticated, setAuthenticated } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRooms = async () => {
      const res = await fetch(
        `http://${API_URL}/api/room/${gameId}/rooms?page=1&limit=3`
      );
      const data = await res.json();
      setItems(data.results);
      setLoading(false);
    };
    getRooms();
  }, [gameId]);

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
            console.log(items);
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
          return (
            <React.Fragment key={e.id}>
              <RoomCard roomDetail={e} onDeletion={handleRoomDeletion} />
            </React.Fragment>
          );
        })}
        {items.length > 2 ? (
          <Anchor component={Link} to={gameId} mt={15}>
            See more ...
          </Anchor>
        ) : (
          <Text mb="md" mt="xl">
            Thats it for today 😊
          </Text>
        )}
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
        <div style={{ display: "flex", flexDirection: "column", width: "75%" }}>
          <Text Text size="xl" mr="xs" align="center">
            No waiting rooms for today 🙁
          </Text>
          <Text mt="xs" Text size="xl" mr="xs" align="center">
            You can create one tho
          </Text>
        </div>
      </Box>
    );
  }
}

export default FollowListRooms;
