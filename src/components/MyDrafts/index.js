import {
  Paper,
  Text,
  Divider,
  Group,
  Button,
  Loader,
  Box,
} from "@mantine/core";
import { useQuery, useQueryClient } from "react-query";
import { API_URL } from "../../constants/request";
import { pair } from "../../constants/gameIdNamePair";
import "./myDrafts.css";
export const MyDrafts = ({ userId, handleDraftPick }) => {
  // const queryClient = useQueryClient();
  const getMyDrafts = async () => {
    // console.log("userId: " + userId);
    const response = await fetch(`http://${API_URL}/api/post/${userId}/drafts`);
    return response.json();
  };
  const { data, status } = useQuery("myDrafts", getMyDrafts);
  console.log(data);

  const handleDraft = (draftData) => (e) => {
    handleDraftPick(draftData);
  };
  return (
    <Paper style={{ width: 245 }} shadow="xs" px="sm" py={20}>
      <Text weight={700} pl={6}>
        My drafts
      </Text>
      <Divider size="xs" my={13} />
      {status === "loading" && (
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Loader size="sm" variant="dots" color="dark" />
        </Box>
      )}
      {status === "success" && data.drafts.length > 0 ? (
        data.drafts.map((element, i) => {
          const size = data.drafts.length;
          return (
            <Paper
              key={element.id}
              shadow="xl"
              color="dark"
              withBorder
              className={i === size - 1 ? "" : "draft-item"}
            >
              <Group direction="column" spacing={5} p="xs">
                <Text color="gray" weight={500} size="xs" lineClamp={1}>
                  {" "}
                  {pair[element.gameId]}
                </Text>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text lineClamp={2}>{element.title}</Text>
                  <Button size="xs" radius="xl" onClick={handleDraft(element)}>
                    Use
                  </Button>
                </div>
              </Group>
            </Paper>
          );
        })
      ) : (
        <Text size="xs" sx={{ textAlign: "center" }}>
          Your drafts will be here
        </Text>
      )}
      {status === "error" && <div>Error</div>}
    </Paper>
  );
};
