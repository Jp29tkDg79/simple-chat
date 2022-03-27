import React from "react";

import { useSelector } from "../../../../../store";

import classes from "./ChatItem.module.css";

type ChatItemProps = {
  name: string;
  message: string;
};

const ChatItem = React.memo((props: ChatItemProps) => {
  const user = useSelector((state) => state.curUser.user);

  return (
    <li className={classes.message + " " + (props.name === user.name ? classes.my_message : classes.other_message)}>
      <p>
        {props.message
          .split(/(\n)/g)
          .map((t, idx) => (t === "\n" ? <br key={idx} /> : t))}
      </p>
    </li>
  );
});

export default ChatItem;
