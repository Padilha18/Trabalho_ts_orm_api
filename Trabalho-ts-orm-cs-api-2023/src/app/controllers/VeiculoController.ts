import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Veiculo from '../models/Veiculo';




class VeiculoController {
    async find(req: Request, res: Response){

        const repository = getRepository(Veiculo);
        const id = req.params.id;

        const p = await repository.createQueryBuilder('tb_veiculo').where({"id" : id}).innerJoinAndSelect("tb_veiculo.tipos", "tipo").getOne();

        if(p){
            return res.json(p)
        }else{
            return res.sendStatus(204);
        }
    }

    async list(req: Request, res: Response){
        const repository = getRepository(Veiculo);
        const lista = await repository.createQueryBuilder('tb_veiculo').innerJoinAndSelect("tb_veiculo.tipos", "tipo").getMany();
        return res.json(lista);
    }   
    async list_basico(req: Request, res: Response){
        const repository = getRepository(Veiculo);
        const lista = await repository.find();
        
        return res.json(lista);
    }  
    
    // metodos para incluir e alterar veiculo
    async store(req: Request, res: Response) {

        const repository = getRepository(Veiculo);//recupera o repositorio de veiculo
        console.log(req.body);
        const end = repository.create(req.body);
        await repository.save(end);
        return res.json(end);
    }

    async update(req: Request, res: Response){
    
        const repository = getRepository(Veiculo);//recupera o repositorio do veiculo.
    
        const {id} = req.body;//extrai os atributos id do corpo da mensagem
    
        const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo nickname.
        
        if(!idExists){
            return res.sendStatus(404);
        }
        
        const j = repository.create(req.body); //cria a entidade Veiculo
        
        await repository.save(j); //persiste (update) a entidade na tabela.
        
        return res.json(j);
    }
    
    //metodo de excluir
    async delete(req: Request, res: Response){

        const repository = getRepository(Veiculo);//recupera o repositorio do vendedor.
        
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

export default new VeiculoController();