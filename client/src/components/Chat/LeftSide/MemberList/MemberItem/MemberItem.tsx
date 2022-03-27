import React from "react";

import classes from "./MemberItem.module.css";

type MemberProps = {
  name: string;
};

const MemberItem = React.memo((props: MemberProps) => {
  return <li className={classes.block}>{props.name}</li>;
});

export default MemberItem;
