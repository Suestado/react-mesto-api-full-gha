import { useForm } from 'react-hook-form'
import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onSubmitPopup, isUploading }) {

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
  })

  useEffect(() => {
    reset()
  }, [isOpen])

  function onSubmit() {
    onSubmitPopup(watch("avatar"))
  }

  return (
    <PopupWithForm
      name="avatarUpload"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      onSubmitPopup={handleSubmit(onSubmit)}
      isUploading={isUploading}
    >
      <fieldset className="popup__fieldset"
                id="avatarUpload-popup-fieldset">
        <label>
          <input
            className="popup__input popup__input_type_avatarUpload"
            type="url"
            id="avatarUpload-input-url"
            placeholder="Ссылка на картинку"
            {...register(
              "avatar",
              {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 2,
                  message: 'Текст должен содержать не менее 2-х символов'
                },
              },

            )}
          />
          <span
            className={`popup__input-error avatarUpload-input-url-error ${errors?.avatar && "popup__input-error_active"}`}
          >
            {errors?.avatar?.message}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
