import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Card({ cardItem, onCardClick, onCardLike, onCardDelete }) {
  const currentUserContext = useContext(CurrentUserContext);
  const currentUser = currentUserContext._id;
  const isOwner = cardItem.owner._id === currentUser;
  const isLikedByMe = cardItem.likes.some(user => user._id === currentUser);

  function handleLikeClick() {
    onCardLike(cardItem);
  }

  function handleCardDelete() {
    onCardDelete(cardItem);
  }

  return (
    <article className="element">
      <img className="element__image"
           src={cardItem.link}
           alt={cardItem.name}
           onClick={onCardClick}/>
      <div className="element__group-name">
        <h2 className="element__name">{cardItem.name}</h2>
        <div className="element__like-wrapper">
          <button
            className={`element__like ${isLikedByMe && 'element__like_active'}`}
            type="button"
            onClick={handleLikeClick}
          />
          <p className="element__like-counter">{cardItem.likes.length}</p>
        </div>
      </div>
      {isOwner && <button
        className="element__trash"
        type="button"
        onClick={handleCardDelete}
      />}
    </article>
  );
}

export default Card;
