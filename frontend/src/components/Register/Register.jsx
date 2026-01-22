import { Link } from "react-router";
import { useState } from "react";
import { register as handleRegister } from "../../utils/auth";
import { useNavigate } from "react-router";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const Register = () => {
  const { openModal, setModalData } = useContext(CurrentUserContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

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
      const info = await handleRegister(data);
      setModalData({
        error: false,
        message: "¡Correcto! Ya estás registrado.",
      });
      openModal();
      navigate("/login");
    } catch (err) {
      setModalData({
        error: true,
        message: "Uy, algo salió mal.Por favor, inténtalo de nuevo.",
      });
      openModal();
    }
  };

  return (
    <div className="register">
      <h1>Regístrate</h1>
      <form className="form__register" onSubmit={handleSubmit}>
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
        <button className="form__button-register">Regístrate</button>
        <span className="form__span">
          ¿Ya eres miembro? <Link to="/login">Inicia sesión aquí</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
