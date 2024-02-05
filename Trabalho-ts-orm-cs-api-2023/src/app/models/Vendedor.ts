import {ChildEntity, Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable} from 'typeorm';

import Veiculo from '../models/Veiculo';
import Pessoa from '../models/Pessoa';

@ChildEntity( )
class Vendedor extends Pessoa{

    @Column('float')
    salario_fixo: number;

    @Column('float')
    comissao_venda: number;

    @Column('varchar')
    senha: string;


    //agregacao (losango não preenchido)
    @ManyToMany(() => Veiculo)
    @JoinTable({name : "tb_vendedor_veiculo", 
                joinColumn: {name: "vendedor_cpf", 
                            referencedColumnName: "cpf"}, 
                inverseJoinColumn: {name: "veiculo_id", 
                                    referencedColumnName: "id"}})
    veiculo: Veiculo[];

}
export default Vendedor;
