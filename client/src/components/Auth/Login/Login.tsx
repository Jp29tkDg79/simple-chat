import { ReactNode, FormEvent } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useRequest } from "../../../hooks/useRequest";
import { useInputState } from "../../../hooks/useInputState";

import { userActions } from "../../../store/slices/user-slice";
import { RootDispatch } from "../../../store";

import FormControl from "../../UI/FormControl/FormControl";
import Notification from "../../UI/Notification/Notification";

import { API_LOGIN } from "../../../constants/api";
import { CHAT } from "../../../constants/routes";

import { LoginTypes, RequestSuccessTypes } from "../../../types/auth";

import { checkPassword, isEmail } from "../../../utils/validation";

type LoginProps = {
  children: ReactNode;
};

const Login = ({ children }: LoginProps) => {
  const { doChangeHandler, controls } = useInputState<LoginTypes>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<RootDispatch>();
  const navigate = useNavigate();

  const { doRequest, error } = useRequest<RequestSuccessTypes>({
    url: API_LOGIN,
    method: "post",
    onSuccess: ({name, email, token}) => {
      dispatch(userActions.setUserState({name, email, token}));
      navigate(CHAT);
    },
  });

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = controls;
    if (!isEmail(email)) {
      alert("入力されたメールアドレスはただしくありません。");
      return;
    }
    if (!checkPassword(password)) {
      alert("パスワードは6文字以上で入力してください。");
    }
    await doRequest<LoginTypes>({ body: { email, password } });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <FormControl
        id="email"
        inputElement={{
          type: "email",
          name: "email",
          value: controls.email,
          onChange: (e) => doChangeHandler(e),
          required: true,
        }}
        text="メールアドレス"
      />
      <FormControl
        id="password"
        inputElement={{
          type: "password",
          name: "password",
          value: controls.password,
          onChange: (e) => doChangeHandler(e),
        }}
        text="パスワード"
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

export default Login;
