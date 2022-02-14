import React from "react";
import AuthForm from "./AuthForm";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    props.handleLoginSubmit(password, email);
  }
  return (
    <AuthForm
      title="Вход"
      buttonText="Войти"
      email={email}
      password={password}
      handleChangeEmail={handleChangeEmail}
      handleChangePassword={handleChangePassword}
      handleSubmit={handleSubmit}
    />
  );
}

export default Login;
