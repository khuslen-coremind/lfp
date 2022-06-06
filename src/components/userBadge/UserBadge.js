import { Badge } from "@mantine/core";

const UserBadge = ({ badge, big }) => {
  const value = { 1: "Chill", 2: "Try Hard", 3: "For Fun" };
  console.log(value[badge], typeof badge);
  return big ? (
    <Badge radius="md" color="#515151">
      {value[badge]}
    </Badge>
  ) : (
    <Badge size="xs" radius="md" color="#515151">
      {value[badge]}
    </Badge>
  );
};
export default UserBadge;
