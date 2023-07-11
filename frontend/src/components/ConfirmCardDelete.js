import PopupWithForm from './PopupWithForm.js';

function ConfirmCardDelete({ isOpen, onClose, onSubmitPopup, isUploading, onOverlayClose }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmitPopup();
  }

  return (
    <PopupWithForm
      name="cardDeleteConfirmation"
      title="Вы уверены?"
      submitText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmitPopup={handleSubmit}
      isUploading={isUploading}
      isValid={true}
    />
  );
}

export default ConfirmCardDelete;
