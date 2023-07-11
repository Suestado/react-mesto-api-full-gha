import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import { useForm } from 'react-hook-form';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup({ isOpen, onClose, onSubmitPopup, isUploading }) {

  const currentUser = useContext(CurrentUserContext);

  const {
    register,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
    reset,
    watch,
  } = useForm(
    {
      mode: 'onChange'
    }
  );

  useEffect(() => {
    reset({
      name: currentUser.name,
      about: currentUser.about
    })
  }, [currentUser])

  useEffect(() => {
    reset()
  }, [isOpen])

  function onSubmit() {
    onSubmitPopup(watch("name"), watch("about"));
  }

  return (
    <PopupWithForm
      name="editForm"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmitPopup={handleSubmit(onSubmit)}
      isUploading={isUploading}
      isValid={isValid}
    >
      <fieldset className="popup__fieldset">
        <label>
          <input
            className="popup__input popup__input_type_editForm-name"
            id="name-input"
            type="text"
            name="name"
            placeholder="Введите свое имя"
            {...register(
              "name",
              {
                required: "Текст должен содержать не менее 2-х символов",
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
          <span className="popup__input-error name-input-error">
            {errors?.name?.message}
          </span>

        </label>
        <label>
          <input
            className="popup__input popup__input_type_editForm-description"
            id="description-input"
            type="text"
            name="about"
            placeholder="Введите свой род занятий"
            {...register(
              "about",
              {
                required: "Текст должен содержать не менее 2-х символов",
                maxLength: {
                  value: 200,
                  message: "Текст должен содержать не более 200 символов"
                },
                minLength: {
                  value: 2,
                  message: "Текст должен содержать не менее 2-х символов"
                },
              }
            )}
          />
          <span className="popup__input-error description-input-error">
            {errors?.about?.message}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
