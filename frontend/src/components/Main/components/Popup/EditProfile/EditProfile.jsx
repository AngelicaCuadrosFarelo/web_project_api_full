import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext); // Obtiene el objeto currentUser

  const [name, setName] = useState(currentUser.name); // Agrega la variable de estado para name
  const [description, setDescription] = useState(currentUser.about); // Agrega la variable de estado para description

  const handleNameChange = (event) => {
    setName(event.target.value); // Actualiza name cuando cambie la entrada
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Actualiza description cuando cambie la entrada
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del envío de formularios

    handleUpdateUser({ name, about: description }); // Actualiza la información del usuario
  };

  return (
    <form id="miFormulario" onSubmit={handleSubmit} className="popup__form">
      <fieldset className="popup__fieldset">
        <input
          type="text"
          id="name"
          name="nombre"
          placeholder="Nombre"
          className="popup__input"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="name-error"></span>

        <input
          type="text"
          name="Acerca de mi"
          id="job"
          placeholder="Acerca de mi"
          className="popup__input"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error" id="job-error"></span>
      </fieldset>
      <fieldset className="popup__fieldset">
        <button className="popup__button-save" type="submit">
          Guardar
        </button>
      </fieldset>
    </form>
  );
}

export default EditProfile;
