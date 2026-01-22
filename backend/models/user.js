import mongoose from "mongoose";
import bcrypt from "bcrypt";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    minlength: 4,
    maxlength: 50,
    validate: {
      validator: (value) => emailRegex.test(value),
      message: "Formato de email inválido",
    },
  },
  password: {
    type: String,
    require: true,
    minlength: 3,
    select: false,
  },
  name: {
    type: String,
    default: "Jacques Cousteau",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Explorador",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: function (v) {
        return /^https?:\/\/(www\.)?[\w\-.~:/?#[\]@!$&'()*+,;=]+#?$/.test(v);
      },
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then(function (user) {
      if (!user) return Promise.reject(new Error("Credenciales incorrectas"));
      return bcrypt.compare(password, user.password).then(function (matched) {
        if (!matched)
          return Promise.reject(new Error("Credenciales incorrectas"));
        return user;
      });
    });
};

const User = mongoose.model("User", userSchema);

export default User;
