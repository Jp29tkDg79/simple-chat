import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, RootDispatch } from "../../../store";
import { userActions } from "../../../store/slices/user-slice";
import { useRequest } from "../../../hooks/useRequest";
import { useSocketIo } from "../../../hooks/useSocketIo";

import Modal from "../../UI/Modal/Modal";

import { HOME } from "../../../constants/routes";
import { API_LOGOUT } from "../../../constants/api";

import classes from "./Header.module.css";

const Header = () => {
  const user = useSelector((state) => state.curUser.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<RootDispatch>();

  const [showModal, setShowModal] = useState(false);

  const toggleShowModal = () => setShowModal(!showModal);

  const { doRequest } = useRequest<void>({
    url: API_LOGOUT,
    method: "post",
    onSuccess: () => {
      doSocket<{name: string}>("logout", {name: user.name});
      dispatch(userActions.clearUserState());
      navigate(HOME);
    },
  });

  const { doSocket } = useSocketIo<null>("logout", null);

  const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await doRequest<null>({});
  };

  useEffect(() => {
    return () => setShowModal(false);
  }, []);

  return (
    <>
      <header className={classes.header}>
        <Link to={HOME}>
          <h1>Simple Chat</h1>
        </Link>
        <FaUserCircle width={20} size={40} onClick={toggleShowModal} />
      </header>
      {showModal && (
        <Modal onClose={toggleShowModal}>
          <div className={classes.ModalContainer}>
            <h1>ユーザ情報</h1>
            <p>名前：{user.name}</p>
            <p>メールアドレス：{user.email}</p>
            <button onClick={onClickHandler}>logout</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
