import { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Main(props) {

  const currentUserContext = useContext(CurrentUserContext);

  return (
    <main className="main-content">
      <section className="profile">
        <div
          className="profile__avatar-wrapper"
          onClick={props.onEditAvatar}>
          <img className="profile__avatar"
               src={currentUserContext.avatar}
               alt="Аватар"/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUserContext.name}</h1>
          <p className="profile__description">{currentUserContext.about}</p>
        </div>
        <button className="profile__edit-button"
                type="button"
                onClick={props.onEditProfile}/>
        <button className="add-button profile__add-button"
                type="button"
                onClick={props.onAddPlace}/>
      </section>

      <section className="elements">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              cardItem={card}
              onCardClick={props.handleCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />);
        })}
      </section>

    </main>
  );
}

export default Main;
