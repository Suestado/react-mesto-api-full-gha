import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onSubmitPopup, isUploading }) {

  const {
    register,
    formState: {
      errors,
      isValid
    },
    handleSubmit,
    watch,
    reset
  } = useForm({
    mode: 'onChange'
  });

  useEffect(() => {
    reset()
  }, [isOpen]);


  function onSubmit() {
    onSubmitPopup(watch("name"), watch("link"))
  }

  return (
    <PopupWithForm
      name="photoAdd"
      title="Новое место"
      submitText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmitPopup={handleSubmit(onSubmit)}
      isUploading={isUploading}
      isValid={isValid}
    >
      <fieldset className="popup__fieldset"
                id="photoAdd-popup-fieldset">
        <label>
          <input
            className="popup__input popup__input_type_photoAdd-place"
            type="text"
            name="name"
            id="photoAdd-input-text"
            placeholder="Название"
            {...register(
              "name",
              {
                required: "Поле обязательно для заполнения",
                maxLength: {
                  value: 40,
                  message: "Текст должен содержать не более 40 символов"
                },
                minLength: {
                  value: 2,
                  message: "Текст должен содержать не менее 2-х символов"
                },
              }
            )}
          />
          <span className={`popup__input-error photoAdd-input-text-error ${errors?.name && "popup__input-error_active"}`}>
            {errors?.name?.message}
          </span>
        </label>
        <label>
          <input
            className="popup__input popup__input_type_photoAdd-link"
            name="link"
            id="photoAdd-input-url"
            placeholder="Ссылка на картинку"
            {...register(
              "link",
              {
                required: "Поле обязательно для заполнения",
                minLength: {
                  value: 2,
                  message: "Текст должен содержать не менее 2-х символов"
                },
              }
            )}/>
          <span className={`popup__input-error photoAdd-input-url-error  ${errors?.link && "popup__input-error_active"}`}>
            {errors?.link?.message}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
