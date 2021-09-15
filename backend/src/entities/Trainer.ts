import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcryptjs'
@Entity('trainer')
class Trainer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nick_name: string;
    
    @Column()
    email:string;

    @Column()
    password: string;
    
    //criptografando a senha
    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password, 8)
    }
}

export default Trainer;