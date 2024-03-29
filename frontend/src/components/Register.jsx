import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm.jsx';

function Register({ onSubmit, setIsRegistered, setIsInfoToolTipOpen }) {
  const navigate = useNavigate();

  function handleSubmitForm(email, password) {
    onSubmit(email, password)
      .then((data) => {
        if(data.email && data._id) {
          setIsRegistered(true);
          setIsInfoToolTipOpen(true);
          navigate('/sign-up', { replace: true });
        }
      })
      .catch(() => {
        setIsRegistered(false);
        setIsInfoToolTipOpen(true);
      });
  }

  return (
    <AuthForm
      header="Регистрация"
      formName="form-registration"
      onSubmit={handleSubmitForm}
      registration="true"
      submitText="Зарегистрироваться"
    />
  );
}

export default Register;
