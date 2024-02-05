import {Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable, TableInheritance} from 'typeorm';

@Entity('tb_pessoa')
@TableInheritance({ column: { type: "varchar", name: "type" } })
abstract class Pessoa {

    @PrimaryColumn('varchar')
    cpf: string;

    @Column('varchar')
    nome: string;

    @Column('date')
    dt_nascimento: Date;

    @Column('varchar')
    endereco: string;

    @Column('varchar')
    telefone: string;

    @Column('varchar')
    email: string;

}
export default Pessoa;
