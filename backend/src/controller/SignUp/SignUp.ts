import { Request, Response } from "express";
import { getRepository } from 'typeorm'
import Trainer from "../../entities/Trainer";


// criação de treinador pokemon
class TrainerController{
    async store(req: Request,res: Response){
       const repository = getRepository(Trainer);
       const { nick_name, email, password } = req.body;

       const trainerExist = await repository.findOne({ where: { email }});
        if(trainerExist){
            return res.sendStatus(409).send('Informações de dados ja usadas')
        }
    }
}
export default new TrainerController();