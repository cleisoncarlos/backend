import prismaClient from "../../prisma";
import { compare } from "bcrypt";
import {sign} from 'jsonwebtoken'

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService {
    async execute({email, password}:AuthRequest){
   // console.log(email)
// verificar se o emai existe
const user = await prismaClient.user.findFirst({
    where: {
        email: email
    }
 
})

if(!user){
    throw new Error("Email ou senha incorreto !")
}

// verificar se a senha esta correta
const passwordMath = await compare(password, user.password)

if(!passwordMath){
    throw new Error("Email ou senha incorreto !") 
}


// se deu certo gera o token
const token = sign({
    name: user.name,
    email: user.email
}, 
process.env.JWT_SECRET, {
    subject: user.id,
    expiresIn: '30d'
} )

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token

    }
    }
}

export {AuthUserService}