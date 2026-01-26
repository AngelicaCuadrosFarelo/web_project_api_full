import { useContext } from "react";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/NewCard/NewCard";
import EditAvatar from "./components/Popup/Avatar/EditAvatar";
import EditProfile from "./components/Popup/EditProfile/EditProfile";
import avatar from "../../images/JacquesCousteau.jpg";
import lapiz from "../../images/lapiz.svg";
import add from "../../images/add.svg";
import Card from "./components/Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Footer from "../Footer/Footer";
import InfoTooltip from "../infoTooltip/InfoToolTip.jsx";

function Main({
  popup,
  onOpenPopup,
  onClosePopup,
  cards,
  onCardDelete,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const editAvatarPopop = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-container">
          <img
            src={currentUser.avatar}
            alt="avatar"
            className="profile__image"
          />
          <div
            onClick={() => onOpenPopup(editAvatarPopop)}
            id="btnAvatar"
            className="profile__edit"
          >
            <img
              src={lapiz}
              alt="changeImage"
              className="profile__edit profile__edit-avatar"
            />
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name} </h1>
          <p className="profile__subtitle">{currentUser.about} </p>
        </div>
        <button
          onClick={() => onOpenPopup(editProfilePopup)}
          id="openBtn"
          className="profile__button-edit"
        >
          <img src={lapiz} alt="Editar" className="profile__ico" />
        </button>
        <div id="addBtn" className="profile__button">
          <button
            onClick={() => onOpenPopup(newCardPopup)}
            className="profile__button-add"
          >
            <img src={add} alt="add" className="profile__button-ico" />
          </button>
        </div>
      </section>
      <section className="elements">
        <ul className="elements__card">
          {cards.map((card) => (
            <Card
              onCardDelete={() => onCardDelete(card)}
              onCardLike={() => onCardLike(card)}
              key={card._id}
              card={card}
              handleOpenPopup={onOpenPopup}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
      <Footer />
      <InfoTooltip />
    </main>
  );
}

export default Main;
