import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

function NewCard() {
  const { handleCreateCard } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateCard({ name, link });
  };
  return (
    <form onSubmit={handleSubmit} id="formAdd" className="popup__form">
      <fieldset className="popup__fieldset">
        <input
          type="text"
          id="title"
          name="titulo"
          placeholder="Titulo"
          className="popup__input"
          required
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="title-error"></span>

        <input
          type="url"
          name="enlace"
          id="url"
          placeholder="URL de la imagen"
          className="popup__input"
          required
          value={link}
          onChange={handleLinkChange}
        />
        <span className="popup__error" id="url-error"></span>
      </fieldset>
      <fieldset className="popup__fieldset">
        <button id="saveBtn" className="popup__button-save" type="submit">
          Crear
        </button>
      </fieldset>
    </form>
  );
}

export default NewCard;
