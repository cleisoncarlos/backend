import { Router } from "express";

import {CreateuserController} from './controllers/user/CreateUserController'
import { AuthUserController } from "./controllers/user/AuthUserController";
const router = Router();


// rotas user
router.post('/users', new CreateuserController().handle )
router.post('/sessions', new AuthUserController().handle)


export { router };
