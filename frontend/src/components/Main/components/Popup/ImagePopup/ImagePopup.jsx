function ImagePopup(props) {
  const { name, link } = props.card;

  return (
    <div id="popupwindow" className="popup">
      <div className="popup__container-window" id="popupcontainerwindow">
        <img
          className="popup__image"
          id="windowImage"
          src={link}
          alt="Imagen ampliada"
        />

        <p className="popup__text" id="imagetitle">
          {name}
        </p>
      </div>
    </div>
  );
}

export default ImagePopup;
