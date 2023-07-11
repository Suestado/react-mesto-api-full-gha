import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import Api from '../utils/Api.js';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmCardDelete from './ConfirmCardDelete.js';
import InfoToolTip from './InfoTooltip.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import { authorization, getToken, registration } from './Auth.js';


function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [deletedCardItem, setDeletedCardItem] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(null);

  useEffect(() => {
    Api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Данные пользователя не могут быть загружены с сервера: Error: ${err}`);
      });
  }, []);

  useEffect(() => {
    Api.getInitialCards()
      .then((data) => setCards(data))
      .catch((err) => {
        console.log(`Стартовые карточки не могут быть загружены с сервера: Error: ${err}`);
      });
  }, []);

  useEffect(() => {
    checkJWTToken();
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteConfirmationOpen(false);
    setIsInfoToolTipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    Api.uploadLikeStatus(isLiked, card._id)
      .then((newCard) => setCards((cards) => cards.map((item) => item._id === card._id ? newCard : item)))
      .catch((err) => console.log(`Лайк не может быть поставлен: Error: ${err}`));
  }

  function handleCardDelete(cardItem) {
    setIsDeleteConfirmationOpen(true);
    setDeletedCardItem(cardItem);
  }

  function confirmCardDelete() {
    setIsUploading(true);
    Api.removeCard(deletedCardItem._id)
      .then(() => setCards(cards.filter((item) => item._id !== deletedCardItem._id)))
      .catch((err) => console.log(`Карточка не может быть удалена: Error: ${err}`))
      .then(() => closeAllPopups())
      .finally(() => setIsUploading(false));
  }

  function handleUpdateUser(name, about) {
    setIsUploading(true);
    Api.setUserInfo(name, about)
      .then((data) => setCurrentUser(data))
      .catch((err) => console.log(`Данные пользователя не могут быть обновлены: Error: ${err}`))
      .then(() => closeAllPopups())
      .finally(() => setIsUploading(false));
  }

  function handleUpdateAvatar(avatar) {
    setIsUploading(true);
    Api.setUserAvatar(avatar)
      .then((data) => setCurrentUser(data))
      .catch((err) => console.log(`Аватар пользователя не может быть обновлен: Error: ${err}`))
      .then(() => closeAllPopups())
      .finally(() => setIsUploading(false));
  }

  function handleAddPlace(name, link) {
    setIsUploading(true);
    Api.uploadUserCard(name, link)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => console.log(`Карточка пользователя не может быть добавлена: Error: ${err}`))
      .then(() => closeAllPopups())
      .finally(() => setIsUploading(false));
  }

  function handleOverlayClose(evt) {
    if(evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  function handleRegistrationSubmit(email, password) {
    return registration(email, password)
      .catch((err) => {
        console.log(`Регистрация не была проведена: ${err}`);
      });
  }

  function handleAuthorizationSubmit(email, password) {
    return authorization(email, password)
      .catch((err) => {
        console.log(`Авторизация завершилась неудачей: ${err}`);
        alert('Неправильный логин или пароль');
      });
  }

  function checkJWTToken() {
    if(localStorage.getItem('jwtToken')) {
      const jwt = localStorage.getItem('jwtToken');

      getToken(jwt)
        .then((data) => {
          if(data.data._id && data.data.email) {
            setIsLoggedIn(true);
            navigate('/', { replace: true });
          }
        });
    }
  }

  function onLeavePage() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
  }

  return (<CurrentUserContext.Provider value={currentUser}>

    <Header
      onClick={onLeavePage}
      userEmail={localStorage.getItem('userEmail')}
    />
    <Routes>

      <Route path="/sign-up" element={<>
        <Login
          onSubmit={handleAuthorizationSubmit}
          setIsLoggedIn={setIsLoggedIn}
        />
        <InfoToolTip
          isRegistered={isRegistered}
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          name="InfoToolTip"
        />
      </>}/>

      <Route path="/sign-in" element={<>
        <Register
          onSubmit={handleRegistrationSubmit}
          setIsRegistered={setIsRegistered}
          setIsInfoToolTipOpen={setIsInfoToolTipOpen}
        />
        <InfoToolTip
          isRegistered={isRegistered}
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          name="InfoToolTip"
        />
      </>}/>


      <Route path="/"
             element={
               <ProtectedRouteElement
                 isLoggedIn={isLoggedIn}
                 element={
                   <>
                     <Main
                       onEditProfile={() => setIsEditProfilePopupOpen(!isEditProfilePopupOpen)}
                       onAddPlace={() => setIsAddPlacePopupOpen(!isAddPlacePopupOpen)}
                       onEditAvatar={() => setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)}
                       onImagePopup={() => setIsImagePopupOpen(!setIsImagePopupOpen)}
                       onClose={closeAllPopups}
                       isImagePopupOpen={isImagePopupOpen}
                       handleCardClick={(evt) => {
                         setSelectedCard(evt.target);
                         setIsImagePopupOpen(!isImagePopupOpen);
                       }}
                       cards={cards}
                       onCardLike={handleCardLike}
                       onCardDelete={handleCardDelete}
                     />

                     <EditProfilePopup
                       isOpen={isEditProfilePopupOpen}
                       onClose={closeAllPopups}
                       onOverlayClose={handleOverlayClose}
                       onSubmitPopup={handleUpdateUser}
                       isUploading={isUploading}
                     />

                     <AddPlacePopup
                       isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}
                       onOverlayClose={handleOverlayClose}
                       onSubmitPopup={handleAddPlace}
                       isUploading={isUploading}
                     />

                     <EditAvatarPopup
                       isOpen={isEditAvatarPopupOpen}
                       onClose={closeAllPopups}
                       onOverlayClose={handleOverlayClose}
                       onSubmitPopup={handleUpdateAvatar}
                       isUploading={isUploading}
                     />

                     <ImagePopup
                       isImagePopupOpen={isImagePopupOpen}
                       card={selectedCard}
                       onClose={closeAllPopups}
                       onOverlayClose={handleOverlayClose}
                     />

                     <ConfirmCardDelete
                       isOpen={isDeleteConfirmationOpen}
                       onClose={closeAllPopups}
                       onOverlayClose={handleOverlayClose}
                       onSubmitPopup={confirmCardDelete}
                       isUploading={isUploading}
                     />
                   </>}
               />}
      />
    </Routes>

    <Footer/>

  </CurrentUserContext.Provider>);
}

export default App;
