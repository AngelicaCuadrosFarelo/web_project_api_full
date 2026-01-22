import { useContext, useRef } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

function EditAvatar() {
  const { onUpdateAvatar } = useContext(CurrentUserContext);
  const inputRef = useRef(null);
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }
  return (
    <form id="fotoPerfil" onSubmit={handleSubmit} className="popup__form">
      <fieldset className="popup__fieldset">
        <input
          type="url"
          id="avatarImg"
          name="url"
          ref={inputRef}
          placeholder="Url de la imagen"
          className="popup__input"
          required
          minLength="2"
        />
        <span className="popup__error" id="avatar-error"></span>
      </fieldset>
      <fieldset className="popup__fieldset">
        <button className="popup__button-save" type="submit">
          Guardar
        </button>
      </fieldset>
    </form>
  );
}

export default EditAvatar;
