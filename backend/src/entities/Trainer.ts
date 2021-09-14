import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}

export default Trainer;