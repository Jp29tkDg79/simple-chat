import { useEffect } from "react";

import { useSocketIo } from "../../../../hooks/useSocketIo";

import { ResponseMemberListTypes } from "../../../../types/chat";
import MemberItem from "./MemberItem/MemberItem";

import classes from "./MemberList.module.css";

const MemberList = () => {
  const { doSocket, socketRes, socketError } =
    useSocketIo<ResponseMemberListTypes>("response_member_list", { list: [] });

  useEffect(() => {
    doSocket<null>("request_member_list", null);
  }, []);

  return (
    <>
      <h4 className={classes.title}>Members List</h4>
      {!socketError && (
        <ul className={classes.memberList}>
          {socketRes.list &&
            socketRes.list.map(({ name }, idx) => (
              <MemberItem key={idx} name={name} />
            ))}
        </ul>
      )}
      {socketError && (
        <div className={classes.errorContainer}>
          <p className={classes.errorMessage}>Not User</p>
        </div>
      )}
    </>
  );
};

export default MemberList;
