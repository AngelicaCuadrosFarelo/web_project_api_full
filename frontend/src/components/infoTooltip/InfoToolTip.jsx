import iconList from "../../images/iconList.png";
import unionx from "../../images/unionx.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function InfoTooltip() {
  const { showModal, modalData, closeModal } = useContext(CurrentUserContext);

  if (!showModal) {
    return null;
  }

  return (
    <div id="overlayadd" className="popup">
      <div className="infoTooltip">
        <button className="modal__button-close" onClick={closeModal}>
          &#10006;
        </button>
        <div className="modal_content">
          <img
            className="modal_image"
            src={modalData.error ? unionx : iconList}
            alt="modal"
          />
          <p className="modal_text">{modalData.message} </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
