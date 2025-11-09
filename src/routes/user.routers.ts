import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middleware/genericMiddleware";

const router=Router();
const userController=new UserController();

router.post('/registerUser',userController.register);
router.post('/loginUser',userController.login);
router.get('/getAllUser',authMiddleware(['Admin']),userController.getAll);
router.get('/getOnlyOneUser/:id',authMiddleware(['Admin']), userController.getById);

export default router;