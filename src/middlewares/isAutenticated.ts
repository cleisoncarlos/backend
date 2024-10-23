import { NextFunction, Request, Response } from "express";
import {verify} from 'jsonwebtoken'


interface Payload{
    sub: string;
}







export function isAutenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
  // receber o token
  const authToken = req.headers.authorization;

  if(!authToken){
    res.status(401).end()
  }

  const [, token] = authToken.split(' ')

try {
// validar o token 
const {sub} = verify(
    token, 
    process.env.JWT_SECRET
) as Payload;

//recuperar o id do token e colocar em variavel  dentro do req
req.user_id = sub

next()

}catch(err){
    res.status(401).end()
}


//console.log(authToken)
//next()

}