import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../blocks/hooks/useFormAndValidation";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  const { handleChange, errors, isValid, resetForm, setIsValid} = useFormAndValidation()

  React.useEffect(() => {
    setName(currentUser.data.name);
    setDescription(currentUser.data.about);
    resetForm();
    setIsValid(true);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
    handleChange(e);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    handleChange(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      onClose={props.onClose}
      isOpen={props.isOpen}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      handleOverlayClose={props.handleOverlayClose}
      formValid={isValid}
    >
      <input
        className={`popup__input popup__input_el_name ${
          errors.name ? "popup__input_type_error" : ""
        }`}
        id="name-profile"
        name="name"
        type="text"
        value={name || ""}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChangeName}
      />
      <span
        className={`popup__error ${errors.name ? "popup__error_visible" : ""}`}
        id="name-profile-error"
      >
        {errors.name}
      </span>
      <input
        className={`popup__input popup__input_el_job ${
          errors.about ? "popup__input_type_error" : ""
        }`}
        id="job-profile"
        type="text"
        value={description || ""}
        placeholder="Описание"
        name="about"
        minLength="2"
        maxLength="200"
        required
        onChange={handleChangeDescription}
      />
      <span
        className={`popup__error ${
          errors.about ? "popup__error_visible" : ""
        }`}
        id="job-profile-error"
      >
        {errors.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
