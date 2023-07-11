import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm.js';

function Login({ onSubmit, setIsLoggedIn }) {
  const navigate = useNavigate();

  function handleSubmitForm(email, password) {
    onSubmit(email, password)
      .then((data) => {
        if(data.token) {
          setIsLoggedIn(true);
          navigate('/', { replace: true });
          localStorage.setItem('userEmail', email);
          localStorage.setItem('jwtToken', data.token);
        }
      });
  }

  return (
    <AuthForm
      header="Вход"
      formName="form-authorisation"
      onSubmit={handleSubmitForm}
      submitText="Войти"
    />
  );
}

export default Login;
