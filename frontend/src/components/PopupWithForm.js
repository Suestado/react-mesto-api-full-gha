import Popup from './Popup.js';

function PopupWithForm(props) {

  return (
    <Popup
      onClose={props.onClose}
      isOpen={props.isOpen}
      name={props.name}
    >
      <>
        <h2 className={`popup__title popup__title_type_${props.name}`}>{props.title}</h2>
        <form
          className="popup__form"
          id="profileEdit-form"
          action="#"
          method="post"
          name={`${props.name}`} //editForm
          noValidate
          onSubmit={props.onSubmitPopup}
        >
          {props.children}

          <button
            className={`popup__submit popup__submit_type_${props.name} ${!props.isValid && 'popup__submit_type_disabled'}`}
            type="submit"
            value={props.submitText}
            name={`submit_${props.name}`}
            id={`submit_${props.name}`}
          >
            {(props.isOpen && props.isUploading) ? 'Сохранение...' : (props.submitText || 'Сохранить')}
          </button>
        </form>
      </>
    </Popup>
  );
}

export default PopupWithForm;
