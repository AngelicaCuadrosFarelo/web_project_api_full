import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { checkToken, getToken } from "../../utils/auth";

export default function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from || "/";
  const { setIsLoggedIn, setDataUser, isLoading, setIsLoading, isLoggedIn } =
    useContext(CurrentUserContext);

  useEffect(() => {
    setIsLoading(true);
    const token = getToken();
    if (token) {
      checkToken()
        .then((data) => {
          setIsLoggedIn(true);
          setDataUser(data);
        })
        .catch(() => {
          setIsLoggedIn(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);
  if (isLoading) {
    return <div>cargando...</div>;
  }
  if (anonymous) {
    return isLoggedIn ? <Navigate to="/" /> : children;
  }

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
