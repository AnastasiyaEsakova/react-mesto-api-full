function ImagePopup(props){
  return(
    <div className= {props.isOpen ? "popup popup_opened popup_type_image" : "popup popup_type_image"}
    id='popup_type_image' onClick={props.handleOverlayClose}>
      <div className="popup__container popup__container_type_image">
        <button className="popup__close-icon" type="button" aria-label="закрыть форму" id="button_close_image" onClick={props.onClose}></button>
        <figure className="popup__image-container">
          <img src={props.card.link} alt={props.card.name} className="popup__image" />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}
export default ImagePopup;
