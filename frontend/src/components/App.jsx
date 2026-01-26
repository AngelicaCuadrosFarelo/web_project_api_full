import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import { useEffect, useState } from "react";
import { api } from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { Routes, Route } from "react-router";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./infoTooltip/InfoToolTip.jsx";
import { getToken } from "../utils/auth.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [dataUser, setDataUser] = useState(null);
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalData, setModalData] = useState({
    error: false,
    message: "¡Correcto! Ya estás registrado.",
  });
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  useEffect(() => {
    const token = getToken();
    if (token) {
      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }, [isLoggedIn]);
  async function handleCardDelete(card) {
    await api.deleteCard(card._id).then(() => {
      handleClosePopup();
      setCards((prevCards) =>
        prevCards.filter((prevCard) => prevCard._id !== card._id),
      );
    });
  }
  async function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya les has dado like
    const isLiked = card.isLiked;

    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
    await api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  const onUpdateAvatar = (data) => {
    (async () => {
      await api
        .upDateImageProfile(data.avatar)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => {
          throw new Error(error);
        });
    })();
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  function handleClosePopup() {
    setPopup(null);
  }
  const handleCreateCard = (data) => {
    (async () => {
      await api
        .createCard(data.name, data.link)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          handleClosePopup();
        })
        .catch((error) => {
          throw new Error(error);
        });
    })();
  };
  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .editProfile(data.name, data.about)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => {
          throw new Error(error);
        });
    })();
  };

  //Efecto para obtenr datos del usuario
  useEffect(() => {
    const token = getToken();
    if (token) {
      const getUser = async () => {
        try {
          const getUser = await api.getUserInfo();
          setCurrentUser(getUser);
        } catch (error) {
          throw new Error(error);
        }
      };
      getUser();
    }
  }, [isLoggedIn]); // Array vacío = solo se ejecuta al montar

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        onUpdateAvatar,
        handleCreateCard,
        isLoggedIn,
        setIsLoggedIn,
        modalData,
        setModalData,
        showModal,
        openModal,
        closeModal,
        dataUser,
        setDataUser,
        isLoading,
        setIsLoading,
      }}
    >
      <div className="page">
        <Header />
        <Routes>
          <Route
            index
            element={
              <ProtectedRoute>
                <Main
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute anonymous={true}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute anonymous={true}>
                <Register />
              </ProtectedRoute>
            }
          />
        </Routes>
        <InfoTooltip />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
