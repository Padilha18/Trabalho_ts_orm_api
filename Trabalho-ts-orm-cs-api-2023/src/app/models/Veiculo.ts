import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable} from 'typeorm';

import Tipo from '../models/Tipo';


@Entity('tb_veiculo')
class Veiculo {


    @PrimaryGeneratedColumn ()
    id: number;
    
    @Column('varchar')
    placa: string;

    @Column('int')
    ano: number;

    @Column('varchar')
    cor: string;

    @Column('int')
    qtd_passageiros: number;

    @Column('varchar')
    modelo: string;

    @Column('varchar')
    marca: string;

    @Column('varchar')
    combustivel: string;

    @Column('float')
    preco: number;

    @Column('boolean')
    status: boolean;



    /*
    //coluna opcional
    @Column('date', {nullable: true})
    data_ultimo_login: Date;
    
    
    //coluna opcional, caso nao seja informado data, vai recebere a data corrente.
    @Column('date', {default: () => 'CURRENT_TIMESTAMP'})
    data_cadastro: Date;

    */

    //associação com a tabela TIPO (flecha)
    @ManyToOne(type => Tipo)
    @JoinColumn({name: "tipo_id", referencedColumnName: "id"})
    tipos: Tipo;   


    //Associação com a tabela VENDA (flecha)

    //  ??????????????????????

    /*
    //agregacao (losango não preenchido)
    @ManyToMany(() => Patente)
    @JoinTable({name : "tb_jogador_patente", 
                joinColumn: {name: "jogador_nickname", 
                             referencedColumnName: "nickname"}, 
                inverseJoinColumn: {name: "patente_id", 
                                    referencedColumnName: "id"}})
    patentes: Patente[];

    */

}
export default Veiculo;