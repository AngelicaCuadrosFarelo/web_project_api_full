import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { NODE_ENV, JWT_SECRET } = process.env;

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error(
        "Correo electrónico y/o contraseña son incorrectos",
      );
      error.statusCode = 404;
      return next(error);
    }

    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
      {
        expiresIn: "7d",
      },
    );
    return res.send({ token });
  } catch (err) {
    const error = new Error("Credenciales incorrectas");
    error.statusCode = 401;
    return next(error);
  }
}

export async function getUsers(req, res, next) {
  const users = await User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      next(err);
    });
}

export async function createUser(req, res, next) {
  try {
    const { name, about, avatar, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });
    res.status(201).send(user);
  } catch (err) {
    const error = new Error("Este usuario ya esta registrado");
    error.statusCode = 400;
    return next(error);
  }
}

export async function getCurrenUser(req, res, next) {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (user) {
    return res.status(200).send(user);
  } else {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    return next(error);
  }
}

export async function getUserById(req, res, next) {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (user) {
    return res.status(200).send(user);
  } else {
    const error = new Error("ID de usuario no encontradoo");
    error.statusCode = 404;
    return next(error);
  }
}

export async function updateProfile(req, res, next) {
  const { name, about } = req.body;

  const userId = req.user._id;
  const currentUser = await User.findById(userId);
  if (userId !== currentUser._id.toString()) {
    const error = new Error("No tienes persimo para cambiar el perfil");
    error.statusCode = 401;
    return next(error);
  }
  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => {
      if (!user) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        return next(error);
      }
      res.json(user);
    })
    .catch((err) => {
      const error = new Error("Datos inválidos");
      error.statusCode = 400;
      return next(error);
    });
}

export async function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(user);
    })
    .catch((err) => {
      const error = new Error("Datos inválidos");
      error.statusCode = 400;
      return next(error);
    });
}
