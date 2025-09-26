import express from 'express'
import { upload } from '../middleware/uploadMiddleware.js';
import { registerUser, loginUser, getUserProfile, updateUserProfile, uploadProfileImage } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post("/register", registerUser)
router.post("/login", loginUser)


router.get("/profile", protect, getUserProfile)
router.put("/profile", protect, updateUserProfile)
router.post("/profile/upload", protect, upload.single("image"), uploadProfileImage)



export default router;