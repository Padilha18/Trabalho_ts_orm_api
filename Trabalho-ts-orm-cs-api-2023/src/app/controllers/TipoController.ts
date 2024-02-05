import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Tipo from '../models/Tipo';


class TipoController {
    async find(req: Request, res: Response){

        const repository = getRepository(Tipo);
        const id = req.params.id;

        const p = await repository.findOne({where : {"id" : id}});

        if(p){
            return res.json(p)
        }else{
            return res.sendStatus(204);
        }
    }

    async list(req: Request, res: Response){
        const repository = getRepository(Tipo);
        const lista = await repository.find();
        return res.json(lista);
    }   
    
    // metodos para incluir e alterar Tipo
    async store(req: Request, res: Response) {

        const repository = getRepository(Tipo);//recupera o repositorio de Tipo
        console.log(req.body);
        const end = repository.create(req.body);
        await repository.save(end);
        return res.json(end);
    }
    
    //metodo de excluir
    async delete(req: Request, res: Response){

        const repository = getRepository(Tipo);//recupera o repositorio do vendedor.
        
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

export default new TipoController();