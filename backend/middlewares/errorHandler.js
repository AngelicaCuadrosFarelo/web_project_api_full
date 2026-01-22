export default function (err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Ha ocurrido un error en el servidor";

  res.status(statusCode).send({
    message: statusCode === 500 ? "Error interno del servidor" : message,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
}
