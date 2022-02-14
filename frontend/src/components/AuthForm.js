import React from "react";

function AuthForm(props) {
  return (
    <div className="auth">
      <form
        className="auth__form"
        onSubmit={props.handleSubmit}
        name={props.name}
      >
        <h2 className="auth__title">{props.title}</h2>
        <input
          className="auth__input"
          name="email"
          type="email"
          placeholder="Email"
          onChange={props.handleChangeEmail}
          value={props.email || ""}
          minLength="2"
          required
        />
        <input
          className="auth__input"
          name="password"
          type="password"
          placeholder="Пароль"
          onChange={props.handleChangePassword}
          value={props.password || ""}
          minLength="7"
          required
        />
        <button className="auth__button">{props.buttonText}</button>
        {props.children}
      </form>
    </div>
  );
}

export default AuthForm;
