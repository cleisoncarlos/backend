import { Router } from "express";

import { isAutenticated } from "./middlewares/isAutenticated";

import {CreateuserController} from './controllers/user/CreateUserController'
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

const router = Router();

// rotas user
router.post('/users', new CreateuserController().handle )
router.post('/sessions', new AuthUserController().handle)
router.get('/me', isAutenticated, new DetailUserController().handle)


// rotas category

router.post('/category', isAutenticated, new CreateCategoryController().handle)
router.get('/category', isAutenticated, new ListCategoryController().handle)


export { router };
