import prismaClient from "../../prisma";
import { compare } from "bcrypt";

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


    return {ok: true}
    }
}

export {AuthUserService}