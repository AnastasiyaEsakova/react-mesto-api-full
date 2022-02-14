import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register(props) {
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
    props.handleRegisterSubmit(password, email);
  }
  return (
    <AuthForm
      title="Регистрация"
      buttonText="Зарегистрироваться"
      email={email}
      password={password}
      handleSubmit={handleSubmit}
      handleChangeEmail={handleChangeEmail}
      handleChangePassword={handleChangePassword}
    >
      <p className="auth__text">
        Уже зарегистрированы?
        <Link className="auth__link" to="/sign-in">
          {" "}
          Войти
        </Link>
      </p>
    </AuthForm>
  );
}

export default Register;
