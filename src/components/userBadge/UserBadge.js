import { Badge } from "@mantine/core";

const UserBadge = ({ badge, big }) => {
  return big ? (
    <Badge radius="md" color="#515151">
      {badge}
    </Badge>
  ) : (
    <Badge size="xs" radius="md" color="#515151">
      {badge}
    </Badge>
  );
};
export default UserBadge;
