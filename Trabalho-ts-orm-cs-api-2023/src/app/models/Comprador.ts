import {ChildEntity, Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable} from 'typeorm';
import Pessoa from '../models/Pessoa';

@ChildEntity( )
class Comprador extends Pessoa {

    @Column('float')
    limite_credito: number;

    @Column('int')
    numero_compras: number;
     
}
export default Comprador;
