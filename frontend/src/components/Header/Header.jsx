import Title from "../../images/Title.png";
import Linea from "../../images/Line.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { removeToken } from "../../utils/auth";
import { useNavigate, useLocation, Link } from "react-router";

function Header() {
  const { isLoggedIn, dataUser, setDataUser, setIsLoggedIn } =
    useContext(CurrentUserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseSesion = () => {
    removeToken();
    setDataUser(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__content">
        <img src={Title} alt="vector" className="header__vector" />
        <div className="header_info">
          {isLoggedIn && dataUser !== null && dataUser.email}
          {isLoggedIn && (
            <button onClick={handleCloseSesion}>Cerrar sesión</button>
          )}
          {!isLoggedIn && location.pathname === "/login" && (
            <Link to="/register">Regístrate</Link>
          )}
          {!isLoggedIn && location.pathname === "/register" && (
            <Link to="/login">Iniciar Sesión</Link>
          )}
        </div>
      </div>
      <img src={Linea} alt="linea" className="header__line" />
    </header>
  );
}

export default Header;
