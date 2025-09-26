import express from 'express'
const router = express.Router();
import { adminLogin, createUser, deleteUser, getUsers, updateUser } from '../controllers/adminController.js';
import { admin, protect } from '../middleware/authMiddleware.js';


router.post("/login", adminLogin)

router.route("/").get(protect, admin, getUsers).post(protect, admin, createUser)

router.route("/:id").put(protect, admin, updateUser).delete(protect, admin, deleteUser)

export default router;