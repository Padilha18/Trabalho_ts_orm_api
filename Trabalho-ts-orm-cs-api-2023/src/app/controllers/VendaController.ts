import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Venda from '../models/Venda';


class VendaController {
    async find(req: Request, res: Response){

        const repository = getRepository(Venda);
        const id = req.params.id;

        const p = await repository.createQueryBuilder('tb_venda').where({"id" : id}).innerJoinAndSelect("tb_venda.comprador", "comprador").innerJoinAndSelect("tb_venda.vendedor", "vendedor").leftJoinAndSelect("tb_venda.veiculos", "veiculo").getOne();

        if(p){
            return res.json(p)
        }else{
            return res.sendStatus(204);
        }
    }

    async list(req: Request, res: Response){
        const repository = getRepository(Venda);
        const lista = await repository.createQueryBuilder('tb_venda').innerJoinAndSelect("tb_venda.vendedor", "vendedor").innerJoinAndSelect("tb_venda.comprador", "comprador").leftJoinAndSelect("tb_venda.veiculos", "veiculo").getMany()
        return res.json(lista);
    }   
    
    // metodos para incluir e alterar endereço
    async store(req: Request, res: Response) {

        const repository = getRepository(Venda);//recupera o repositorio de Endereço
        console.log(req.body);
        const end = repository.create(req.body);
        await repository.save(end);
        return res.json(end);
    }
    
    async update(req: Request, res: Response){
    
        const repository = getRepository(Venda);//recupera o repositorio do vendedor.
    
        const {id} = req.body;//extrai os atributos id do corpo da mensagem
    
        const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo nickname.
        
        if(!idExists){
            return res.sendStatus(404);
        }
        
        const v = repository.create(req.body); //cria a entidade Jogador
        
        await repository.save(v); //persiste (update) a entidade na tabela.
        
        return res.json(v);
    }

    //metodo de excluir
    async delete(req: Request, res: Response){

        const repository = getRepository(Venda);//recupera o repositorio do vendedor.
        
        const id = req.params.id;
        
        const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo nickname da mensagem.

        if(idExists){
        
            await repository.remove(idExists);//caso exista, então aplica a remocao fisica. (corrigir erro no pdf 11)
            return res.sendStatus(204);//retorna o coigo 204.
        
        }else{
        
            return res.sendStatus(404);//se nao encontrar jogador para remover, retorna o codigo 404.
        }
    }

}

export default new VendaController();