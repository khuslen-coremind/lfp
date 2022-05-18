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
function SideScreenPost() {
	const { gameId } = useParams();
	const [pageNumber, setPageNumber] = useState(2);
	const [limit, setLimit] = useState(15);
	const [items, setItems] = useState([]);
	const [hasMore, sethasMore] = useState(true);
	const { isAuthenticated, setAuthenticated } = useContext(AuthContext);
	const [cookie] = useCookies("accessToken");

	useEffect(() => {
		const getPosts = async () => {
			let res;
			if (isAuthenticated === true) {
				res = await fetch(
					`http://localhost:8000/api/post/${gameId}/posts?page=1&limit=${limit}`,
					{
						headers: new Headers({
							Authorization: `Bearer ${cookie.accessToken}`,
						}),
					}
				);
			} else {
				res = await fetch(
					`http://localhost:8000/api/post/${gameId}/posts?page=1&limit=${limit + 3}`
				);
			}

			const data = await res.json();
			console.log(data);
			setItems(data.results);
		};
		getPosts();
	}, [gameId]);

	const fetchPosts = async () => {
		let res;
		if (isAuthenticated === true) {
			res = await fetch(
				`http://localhost:8000/api/post/${gameId}/posts?page=${pageNumber}&limit=${
					limit + 3
				}`,
				{
					headers: {
						Authorization: `Bearer ${cookie.accessToken}`,
					},
				}
			);
		} else {
			res = await fetch(
				`http://localhost:8000/api/post/${gameId}/posts?page=${pageNumber}&limit=${limit}`
			);
		}
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
						<Loader color="gray" size="lg" variant="dots" />
					</Box>
				}
				endMessage={
					<Box
						my={50}
						style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
					console.log(e.postInfo.id);
					return <Post postData={e} key={e.postInfo.id} />;
				})}
			</InfiniteScroll>
		</Box>
	);
}

export default SideScreenPost;
