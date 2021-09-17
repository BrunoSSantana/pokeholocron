/* eslint-disable class-methods-use-this */
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Trainer from '../../entities/Trainer';

dotenv.config();

// criação de treinador pokemon
class SignIn {
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(Trainer);
    const { email, password } = req.body;

    const trainer = await repository.findOne({ where: { email } });

    if (!trainer) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, trainer.password);

    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const token = jwt.sign({ id: trainer.id }, process.env.SECRET_kEY,
      { expiresIn: '1d' });

    delete trainer.password;

    return res.json({
    //   trainer,
      token,
    });
  }
}
export default new SignIn();
