import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../blocks/hooks/useFormAndValidation";

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState("");
  const {handleChange, errors, isValid, resetForm} = useFormAndValidation()

  React.useEffect(() => {
    setAvatar("");
    resetForm();
  }, [props.isOpen]);

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
    handleChange(e);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatar);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      handleOverlayClose={props.handleOverlayClose}
      formValid={isValid}
    >
      <input
        className={`popup__input popup__input_el_avatar ${
          errors.avatar ? "popup__input_type_error" : ""
        }`}
        id="avatar"
        type="url"
        placeholder="Ссылка на фото"
        name="avatar"
        value={avatar || ''}
        required
        onChange={handleChangeAvatar}
      />
      <span
        className={`popup__error ${errors.avatar ? "popup__error_visible" : ""}`}
        id="avatar-error"
      >
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
