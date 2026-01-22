import ImagePopup from "../Popup/ImagePopup/ImagePopup";
import trash from "../../../../images/Trash.svg";
import like from "../../../../images/like.svg";
import RemoveCard from "../Popup/RemoveCard/RemoveCard";

function Card(props) {
  const { name, link, isLiked } = props.card;
  const { handleOpenPopup, onCardLike, onCardDelete } = props;

  const removeCardPopup = {
    title: "¿Estás seguro/a?",
    children: <RemoveCard onComfirm={onCardDelete} />,
  };
  const imageComponent = {
    children: <ImagePopup card={{ name, link }} />,
  };

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-black" : ""
  }`;

  const handleLikeClick = () => {
    onCardLike();
  };
  return (
    <li id="openImage" className="card">
      <div className="card__content">
        <img
          src={trash}
          alt="Trash"
          onClick={() => handleOpenPopup(removeCardPopup)}
          className="card__trash"
        />
        <img
          onClick={() => handleOpenPopup(imageComponent)}
          src={link}
          alt="valle"
          id="myImage"
          className="card__image"
        />
        <div className="card__description">
          <h2 className="card__text" id="cardtext">
            {name}
          </h2>
          <img
            onClick={handleLikeClick}
            src={like}
            alt="me encanta"
            className={cardLikeButtonClassName}
          />
        </div>
      </div>
    </li>
  );
}

export default Card;
