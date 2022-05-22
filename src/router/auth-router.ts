import express from "express";
import { signIn, signup, currentUser, refreshToken, findUsers, adminLogin,deleteUser,
   updateUser,findUserAndCar, createAdminUser } from "../controller/auth";
import { validateRequest, requireAuth } from "../middleware";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/users/signup",
  signup
);

router.post(
  "/users/signin",
  signIn
);

router.get("/users/current-user", currentUser);

router.post("/users/refresh-token", requireAuth, refreshToken);
router.post("/users/create-car", createAdminUser);
router.get("/users/find-user-and-car/:id", findUserAndCar);
router.get("/users/find-users", findUsers);
router.post("/users/update-user", updateUser);
router.post("/admin/login", adminLogin);
router.delete("/user/delete/:id", deleteUser);

export { router as authRouter };
