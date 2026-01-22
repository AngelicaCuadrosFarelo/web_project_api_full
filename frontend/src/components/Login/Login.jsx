import { Link } from "react-router";
import { useState } from "react";
import { login as handleLogin } from "../../utils/auth";
import { useNavigate } from "react-router";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { setToken } from "../../utils/auth";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { setIsLoggedIn, openModal, setModalData } =
    useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const info = await handleLogin(data);
      setToken(info.token);
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      setModalData({
        error: true,
        message: "Uy, algo salió mal.Por favor, inténtalo de nuevo.",
      });
      openModal();
    }
  };

  return (
    <div className="login">
      <h1>Inicia sesión</h1>
      <form className="form__login" onSubmit={handleSubmit}>
        <fieldset className="form__fieldset">
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Correo Electrónico"
            className="form__input"
            value={data.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Contraseña"
            className="form__input"
            value={data.password}
            onChange={handleChange}
          />
        </fieldset>
        <button className="form__button-login">Inicia sesión</button>
        <span className="form__span">
          ¿Aún no eres miembro? <Link to="/register">Regístrate aquí</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
