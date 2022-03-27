import { ReactNode, FormEvent } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useRequest } from "../../../hooks/useRequest";
import { useInputState } from "../../../hooks/useInputState";

import { userActions } from "../../../store/slices/user-slice";
import { RootDispatch } from "../../../store";

import FormControl from "../../UI/FormControl/FormControl";
import Notification from "../../UI/Notification/Notification";

import { API_SIGNIN } from "../../../constants/api";
import { CHAT } from "../../../constants/routes";

import { SigninTypes, RequestSuccessTypes } from "../../../types/auth";

import { isEmpty, isEmail, checkPassword } from "../../../utils/validation";

type SigninProps = {
  children: ReactNode;
};

type SigninInputTypes = SigninTypes & {
  confirmEmail: string;
  confirmPassword: string;
};

const Signin = ({ children }: SigninProps) => {
  const { doChangeHandler, controls } = useInputState<SigninInputTypes>({
    name: "",
    email: "",
    password: "",
    confirmEmail: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch<RootDispatch>();
  const navigate = useNavigate();

  const { doRequest, error } = useRequest<RequestSuccessTypes>({
    url: API_SIGNIN,
    method: "post",
    onSuccess: ({name, email, token}) => {
      dispatch(userActions.setUserState({name, email, token}));
      navigate(CHAT);
    },
  });

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, name, password, confirmPassword, confirmEmail } = controls;
    if (isEmpty(name)) {
      alert("名前が未入力です");
      return;
    }
    if (!isEmail(email) || !isEmail(confirmEmail)) {
      alert("メールアドレスが未入力または不適切です");
      return;
    }
    if (!checkPassword(password) || !checkPassword(confirmPassword)) {
      alert("パスワードは6文字以上入力してください");
      return;
    }
    if (email !== confirmEmail) {
      alert("入力したメールアドレスが再確認用アドレスと相違してます");
      return;
    }
    if (password !== confirmPassword) {
      alert("入力したパスワードが再確認用のパスワードと相違してます");
      return;
    }

    await doRequest<SigninTypes>({
      body: { name, email, password },
    });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <FormControl
        id="name"
        inputElement={{
          type: "text",
          name: "name",
          required: true,
          value: controls.name,
          onChange: (e) => doChangeHandler(e),
        }}
        text="名前"
      />
      <FormControl
        id="email"
        inputElement={{
          type: "email",
          name: "email",
          required: true,
          value: controls.email,
          onChange: (e) => doChangeHandler(e),
        }}
        text="メールアドレス"
      />
      <FormControl
        id="confirmEmail"
        inputElement={{
          type: "email",
          name: "confirmEmail",
          required: true,
          value: controls.confirmEmail,
          onChange: (e) => doChangeHandler(e),
        }}
        text="メールアドレス再確認"
      />
      <FormControl
        id="password"
        inputElement={{
          type: "password",
          name: "password",
          required: true,
          value: controls.password,
          onChange: (e) => doChangeHandler(e),
        }}
        text="パスワード"
      />
      <FormControl
        id="confirmPassword"
        inputElement={{
          type: "password",
          name: "confirmPassword",
          required: true,
          value: controls.confirmPassword,
          onChange: (e) => doChangeHandler(e),
        }}
        text="パスワード再確認"
      />
      {error && (
        <Notification
          status="error"
          title="Request Error"
          message={error.message}
        />
      )}
      {children}
    </form>
  );
};

export default Signin;
