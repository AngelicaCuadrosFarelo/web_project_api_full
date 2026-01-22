import express from "express";
import {
  validateUserId,
  validateProfileUpdate,
  validateAvatarUpdate,
} from "../middlewares/validation.js";
import {
  getUserById,
  getUsers,
  updateProfile,
  updateAvatar,
  getCurrenUser,
} from "../controllers/users.js";

const routes = express.Router();

routes.get("/me", getCurrenUser);
routes.get("/:userId", validateUserId, getUserById);
routes.get("/", getUsers);
routes.patch("/me", validateProfileUpdate, updateProfile);
routes.patch("/me/avatar", validateAvatarUpdate, updateAvatar);

export default routes;
