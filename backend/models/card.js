import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/(www\.)?[\w\-.~:/?#[\]@!$&'()*+,;=]+#?$/.test(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
