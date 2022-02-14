import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../blocks/hooks/useFormAndValidation";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  const {handleChange, errors, isValid, resetForm} = useFormAndValidation();

  React.useEffect(() => {
    setName("");
    setLink("");
    resetForm();
  }, [props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
    handleChange(e);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
    handleChange(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      handleOverlayClose={props.handleOverlayClose}
      formValid={isValid}
    >
      <input
        className={`popup__input popup__input_el_place-name ${
          !errors.name ? "" : "popup__input_type_error"
        }`}
        id="place-name"
        type="text"
        placeholder="Название"
        name="name"
        minLength="2"
        maxLength="30"
        required
        onChange={handleChangeName}
        value={name || ''}
      />
      <span
        className={`popup__error ${
          !errors.name ? "" : "popup__error_visible"
        }`}
        id="place-name-error"
      >
        {errors.name}
      </span>
      <input
        className={`popup__input popup__input_el_link ${
          !errors.link ? "" : "popup__input_type_error"
        }`}
        id="link"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required
        onChange={handleChangeLink}
        value={link || ''}
      />
      <span
        className={`popup__error ${!errors.link ? "" : "popup__error_visible"}`}
        id="link-error"
      >
        {errors.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
