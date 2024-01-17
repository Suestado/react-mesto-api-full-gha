function ImagePopup(props) {

  return (
    <div
      className={`popup popup_type_photoFullScreen ${props.isImagePopupOpen && 'popup_opened'}`}
      onClick={props.onOverlayClose}
    >
      <figure className="popup__picContainer popup__picContainer_type_photoFullScreen">
        <img
          className="popup__image popup__image_type_photoFullScreen"
          src={props.card.src}
          alt={props.card.alt}/>
        <figcaption className="popup__substring popup__substring_type_photoFullScreen">
          {props.card.alt}
        </figcaption>
        <div
          className="popup__close popup__close_type_photoFullScreen"
          onClick={props.onClose}
        />
      </figure>
    </div>
  );
}

export default ImagePopup;
