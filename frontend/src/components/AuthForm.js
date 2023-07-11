import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function AuthForm(props) {

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    watch,
  } = useForm(
    {
      mode: 'onChange',
    },
  );

  function handleSubmitForm() {
    props.onSubmit(watch("email"), watch("password"))
  }

  return (
    <div className="auth-form">
      <h2 className="auth-form__header">{props.header}</h2>
      <form
        className="auth-form__form"
        id={props.formName}
        action="#"
        method="post"
        name={props.formName}
        onSubmit={handleSubmit(handleSubmitForm)}
        noValidate
      >
        <label>
          <input
            className="auth-form__input"
            id="authForm-email"
            name="email"
            type="text"
            placeholder="Email"
            {...register(
              'email',
              {
                required: 'Текст должен содержать не менее 2-х символов',
                maxLength: {
                  value: 40,
                  message: 'Текст должен содержать не более 40 символов',
                },
                minLength: {
                  value: 2,
                  message: 'Текст должен содержать не менее 2-х символов',
                },
              },
            )}
          />
          <span className={`auth-form__error popup__input-error name-input-error ${errors?.email && "popup__input-error_active"}`}>
            {errors?.email?.message}
          </span>
        </label>

        <label>
          <input
            className="auth-form__input"
            id="authForm-password"
            name="password"
            type="password"
            placeholder="Пароль"
            {...register(
              'password',
              {
                required: 'Текст должен содержать не менее 2-х символов',
                maxLength: {
                  value: 40,
                  message: 'Текст должен содержать не более 40 символов',
                },
                minLength: {
                  value: 2,
                  message: 'Текст должен содержать не менее 2-х символов',
                },
              },
            )}
          />
          <span className={`auth-form__error popup__input-error name-input-error ${errors?.password && 'popup__input-error_active'}`}>
            {errors?.password?.message}
          </span>
        </label>

        <button
          className="auth-form__submit"
          type="submit"
          id={`submit-${props.formName}`}
          name={`submit-${props.formName}`}
        >
          {props.submitText}
        </button>

      </form>
      <span className={`auth-form__logInOffer ${props.registration && 'auth-form__logInOffer_active'}`}>
              Уже зарегистрированы? <Link to="/sign-up" className="auth-form__redirectToLogIn">Войти</Link>
              </span>
    </div>
  );
}

export default AuthForm;
