import Popup from './Popup.js';
import union from '../images/union.svg';
import unionFailed from '../images/unionFailed.svg';

function InfoToolTip(props) {
  
  return (
    <Popup
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={props.name}
    >
      <img
        className="popup__union"
        src={props.isRegistered ? union : unionFailed}
        alt="Галочка"/>
      <h2 className="popup__register-confirmation">
        {props.isRegistered ? "Вы успешно зарегистрировались!" : "Что-то пошло не так!\n" +
          "Попробуйте ещё раз."}
      </h2>
    </Popup>
  );
}

export default InfoToolTip;
