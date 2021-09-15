import { Request, Response } from "express";
import { getRepository, useContainer } from 'typeorm'
import Trainer from "../../entities/Trainer";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// criação de treinador pokemon
class SignIn {
    async authenticate(req: Request, res: Response) {
        const repository = getRepository(Trainer);
        const { email, password } = req.body;

        const trainer = await repository.findOne({ where: { email } });

        if(!trainer){
            return res.sendStatus(401);
        }

        const isValidPassword = await bcrypt.compare(password, trainer.password);

        if(!isValidPassword){
            return res.sendStatus(401);
        }

        const token = jwt.sign({ id: trainer.id}, 'secret', {expiresIn: '1d'});

        delete trainer.password;

        return res.json({
            trainer,
            token
        })

    }   
}
export default new SignIn();