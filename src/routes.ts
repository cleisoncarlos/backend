import { Router } from "express";
import multer from "multer";
import uploadConfig from './config/multer'

import { isAutenticated } from "./middlewares/isAutenticated";

import {CreateuserController} from './controllers/user/CreateUserController'
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";

const router = Router();

const upload = multer(uploadConfig.upload('./tmp'))

// rotas user
router.post('/users', new CreateuserController().handle )
router.post('/sessions', new AuthUserController().handle)
router.get('/me', isAutenticated, new DetailUserController().handle)

// rotas category
router.post('/category', isAutenticated, new CreateCategoryController().handle)
router.get('/category', isAutenticated, new ListCategoryController().handle)

//rota products

router.post('/product', isAutenticated, upload.single('file'), new CreateProductController().handle)


export { router };
