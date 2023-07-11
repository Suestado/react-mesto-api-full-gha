import { Link, useLocation } from 'react-router-dom';
import logoWhite from '../images/logoWhite.svg';

function Header({ onClick, userEmail }) {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <img className="logo header__logo"
           src={logoWhite}
           alt="Логотип Место"/>
      <nav className="header__navBar">
        {pathname === '/' && <p className="header__userMail">{userEmail}</p>}
        {pathname === '/sign-up' && <Link to="/sign-in" className="header__authLink">Регистрация</Link>}
        {pathname === '/sign-in' && <Link to="/sign-up" className="header__authLink">Войти</Link>}
        {pathname === '/' && <Link
          to="/sign-up"
          className="header__authLink"
          onClick={onClick}
        >Выйти</Link>}
      </nav>
    </header>
  );
}

export default Header;
