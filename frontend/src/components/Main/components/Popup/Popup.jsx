export default function Popup(props) {
  //los hijos son el contenido de la ventana emergente
  const { onClose, title, children } = props;
  return (
    <div id="overlayadd" className="popup">
      <div className={`popup__container ${title ? "" : "popup__image"}`}>
        <button onClick={onClose} type="button" className="popup__button-close">
          &#10006;
        </button>
        {title && <h2 className="popup__title">{title} </h2>}
        {children}
      </div>
    </div>
  );
}
