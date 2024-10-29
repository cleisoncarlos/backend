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
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";


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
router.get('/category/product', isAutenticated, new ListByCategoryController().handle)


// rotas order
router.post('/order', isAutenticated, new CreateOrderController().handle)
router.delete('/order', isAutenticated, new RemoveOrderController().handle)
router.post('/order/add', isAutenticated, new AddItemController().handle)
router.delete('/order/remove', isAutenticated, new RemoveItemController().handle)
router.put('/order/send', isAutenticated, new SendOrderController().handle)
router.get('/orders', isAutenticated, new ListOrderController().handle)
router.get('/order/detail', isAutenticated, new DetailOrderController().handle)
router.put('/order/finish', isAutenticated, new FinishOrderController().handle)

export { router };
