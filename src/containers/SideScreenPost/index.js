import { Box, Loader, Text } from "@mantine/core";
import InfiniteScroll from "react-infinite-scroll-component";
import CreatePost from "../../components/post/CreatePost";
import Post from "../../components/post/Post";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BsCheck2 } from "react-icons/bs";
import { AuthContext } from "../../AuthContext";
import { useCookies } from "react-cookie";
import { API_URL } from "../../constants/request";
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
function SideScreenPost() {
  const { gameId } = useParams();
  const [pageNumber, setPageNumber] = useState(2);
  const [limit, setLimit] = useState(15);
  const [items, setItems] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const { isAuthenticated, setAuthenticated } = useContext(AuthContext);
  const [cookies, setCookie] = useCookies(["accessToken"]);

  useEffect(() => {
    const getPosts = async () => {
      console.log(isAuthenticated, cookies.accessToken);

      const res = await fetch(
        `http://${API_URL}/api/post/${gameId}/posts?page=1&limit=${limit}`,
        {
          method: "GET",
          ...(isAuthenticated && {
            headers: new Headers({
              Authorization: `Bearer ${getCookie("accessToken")}`,
            }),
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.results.length === 0) {
        sethasMore(false);
      }
      return data.results;
    };
    getPosts()
      .then((results) => setItems(results))
      .catch((error) => console.log(error));
  }, [gameId, isAuthenticated]);

  const fetchPosts = async () => {
    const res = await fetch(
      `http://${API_URL}/api/post/${gameId}/posts?page=${pageNumber}&limit=${
        limit + 3
      }`,
      {
        ...(isAuthenticated && {
          headers: new Headers({
            Authorization: `Bearer ${getCookie("accessToken")}`,
          }),
        }),
      }
    );

    const data = await res.json();

    return data.results;
  };

  const fetchData = async () => {
    const commentsFormServer = await fetchPosts();

    setItems([...items, ...commentsFormServer]);

    if (commentsFormServer.length === 0 || commentsFormServer.length < limit) {
      sethasMore(false);
    }
    setPageNumber(pageNumber + 1);
  };
  return (
    <Box mt={45} style={{ flexGrow: 0.7 }}>
      <Text mb={16}>Community posts</Text>
      <CreatePost />
      <InfiniteScroll
        //This is important field to render the next data
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <Box mt={50} sx={{ textAlign: "center" }}>
            <Loader
              color="gray"
              size="lg"
              variant="dots"
              sx={{ margin: "auto" }}
            />
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
              You are up to date!
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
          console.log(e);
          return <Post postData={e} key={e.postInfo.id} />;
        })}
      </InfiniteScroll>
    </Box>
  );
}

export default SideScreenPost;
