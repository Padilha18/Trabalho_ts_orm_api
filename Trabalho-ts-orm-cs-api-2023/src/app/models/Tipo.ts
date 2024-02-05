import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_tipo')
class Tipo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    descricao: string;

}
export default Tipo;
