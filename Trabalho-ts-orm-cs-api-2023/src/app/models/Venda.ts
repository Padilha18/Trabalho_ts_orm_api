import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable} from 'typeorm';

import Comprador from '../models/Comprador';
import Vendedor from '../models/Vendedor';
import Veiculo from '../models/Veiculo';

@Entity('tb_venda')
class Venda {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('float')
    valor: number;

    @Column('text')
    forma_pagamento: string;

    //coluna opcional, caso nao seja informado data, vai recebere a data corrente.
    @Column('date', {default: () => 'CURRENT_TIMESTAMP'})
    data_venda: Date;

    //associação com COMPRADOR (flecha)
    @ManyToOne(type => Comprador)
    @JoinColumn({name: "comprador_cpf", referencedColumnName: "cpf"})
    comprador: Comprador;
    
    //associação com VENDEDOR (flecha)  
    @ManyToOne(type => Vendedor)
    @JoinColumn({name: "vendedor_cpf", referencedColumnName: "cpf"})
    vendedor: Vendedor;   
    
    //agregacao com VEICULO (losango não preenchido)
    @ManyToMany(() => Veiculo)
    @JoinTable({name : "tb_venda_veiculo", 
                joinColumn: {name: "venda_id", 
                                referencedColumnName: "id"}, 
                inverseJoinColumn: {name: "veiculo_id", 
                                    referencedColumnName: "id"}})
    veiculos: Veiculo[];

}
export default Venda;
