import express, {Request, Response, NextFunction} from "express";
import 'express-async-errors'

import cors from 'cors'


import {router} from './routes'


const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if(err instanceof Error){
        // se for inscia de erro
        res.status(400).json({
            error: err.message
        })
    }

    res.status(500).json({
        statua: 'erros',
        message: 'Internal server erros'
    })

})

app.listen(3333, ()=> {
    console.log('Server Online!')
})