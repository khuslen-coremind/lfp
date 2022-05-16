import { Paper, Text, Divider, Group, Button } from "@mantine/core";
import { useQuery, useQueryClient } from "react-query";
import { API_URL } from "../../constants/request";
import { pair } from "../../constants/gameIdNamePair";
export const MyDrafts = ({ userId }) => {
  const queryClient = useQueryClient();
  const getMyDrafts = async () => {
    console.log("userId: " + userId);
    const response = await fetch(`${API_URL}/api/post/${userId}/drafts`);
    return response.json();
  };
  const { data, status } = useQuery("myDrafts", getMyDrafts);
  console.log(data);
  return (
    <Paper style={{ width: 245 }} shadow="xs" px="sm" py={20}>
      <Text weight={700} pl={6}>
        My drafts
      </Text>
      <Divider size="xs" my={13} />
      {data.drafts.length === 0 && (
        <Text size="xs" sx={{ textAlign: "center" }}>
          Your drafts will be here
        </Text>
      )}

      {status === "success" &&
        data.drafts.length > 0 &&
        data.drafts.map((e) => {
          <Group direction="column">
            <Text size="xs"> {pair[e.gameId]}</Text>
            <div>
              <Text>{e.title}</Text>
              <Button radius="lg">Use</Button>
            </div>
          </Group>;
        })}
    </Paper>
  );
};
