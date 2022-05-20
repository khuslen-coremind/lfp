import { Group, createStyles } from "@mantine/core";
import { BsClock } from "react-icons/bs";
import { Text } from "@mantine/core";
import moment from "moment";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  now: {
    padding: "2px 6px",
    borderRadius: 30,
    backgroundColor: "#1CC300",
  },
  time: {
    padding: "2px 6px",
    borderRadius: 30,
    backgroundColor: "#63009F",
  },
}));

function LfpTimer({ roomDetail }) {
  const [now, setNow] = useState(false);
  const [time, setTime] = useState(moment().format());
  console.log(
    moment(moment(moment().format()).format("YYYY-MM-D hh:mm:ss"))
      .add(5, "m")
      .diff(
        moment(roomDetail.targetTime).format("YYYY-MM-D hh:mm:ss"),
        "m",
        true
      )
  );
  useEffect(() => {
    const dateNow = moment(moment().format()).format("YYYY-MM-D hh:mm:ss");
    const targetTime = moment(roomDetail.targetTime).format(
      "YYYY-MM-D hh:mm:ss"
    );
    if (
      moment(dateNow).add(5, "m").diff(targetTime, "m") > 5 ||
      moment(dateNow).subtract(5, "m").diff(targetTime, "m") > 5
    ) {
      setNow(false);
    } else {
      setNow(true);
      setInterval(() => {
        setNow(false);
      }, 300000);
    }
    // console.log(moment(dateNow).add(5, "m").isBefore(targetTime));
    // "asdsd " +
  }, [time]);
  const { classes } = useStyles();
  return (
    <Group
      position="center"
      mt="sx"
      spacing={5}
      className={now ? classes.now : classes.time}
    >
      <Text color="white" pl={7} pb={1} weight={600}>
        {now ? "NOW" : moment(roomDetail.targetTime).format("hh:mm")}
      </Text>
      <BsClock size={16} fill="#FFF" style={{ marginRight: 5 }} />
    </Group>
  );
}

export default LfpTimer;
