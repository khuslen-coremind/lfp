import { Box, Loader, Text } from "@mantine/core";
import CreateRoom from "../../components/roomCard/CreateRoom";
import RoomCard from "../../components/roomCard/RoomCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsCheck2 } from "react-icons/bs";
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
					return <RoomCard roomDetail={e} key={e.id} />;
				})}
			</InfiniteScroll>
		</Box>
	);
}

export default SideScreenRoom;
