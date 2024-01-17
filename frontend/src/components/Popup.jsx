import { useEffect } from 'react';

function Popup(props) {
  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return (
      document.addEventListener('keydown', handleEscClose)
    );
  }, [handleEscClose]);

  function handleOverlayClose(evt) {
    if(evt.target.classList.contains('popup')) {
      props.onClose();
    }
  }

  function handleEscClose(evt) {
    if(evt.key === 'Escape') {
      props.onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_editForm ${props.isOpen && 'popup_opened'}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__container">

        {props.children}

        <button
          className={`popup__close popup__close_type_${props.name}`}
          type="button"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default Popup;
