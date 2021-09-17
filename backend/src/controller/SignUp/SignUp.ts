/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Trainer from '../../entities/Trainer';

// criação de treinador pokemon
class SignUp {
  async store(req: Request, res: Response) {
    const repository = getRepository(Trainer);
    const { nick_name, email, password } = req.body;

    const trainerExist = await repository.findOne({ where: { email } });

    // limitando para nao repetir email
    if (trainerExist) {
      return res.json({ message: 'usuário já existe' }).status(401);
    }

    const trainer = repository.create({ nick_name, email, password });

    // salvando os dados recebidos no banco de dados
    await repository.save(trainer);

    return res.json(trainer);
  }
}
export default new SignUp();
