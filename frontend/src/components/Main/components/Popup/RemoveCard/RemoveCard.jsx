function RemoveCard({ onComfirm }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onComfirm();
  };

  return (
    <form onSubmit={handleSubmit} id="confirmacion" className="popup__form">
      <fieldset className="popup__fieldset">
        <button className="popup__button-save" type="submit">
          Sí
        </button>
      </fieldset>
    </form>
  );
}

export default RemoveCard;
