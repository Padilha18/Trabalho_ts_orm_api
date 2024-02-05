import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Comprador from '../models/Comprador';


class CompradorController {
    async find(req: Request, res: Response){

        const repository = getRepository(Comprador);
        const cpf = req.params.cpf;

        const p = await repository.findOne({where : {"cpf" : cpf}});

        if(p){
            return res.json(p)
        }else{
            return res.sendStatus(204);
        }
    }


    async list(req: Request, res: Response) {
        const repository = getRepository(Comprador);
        const lista = await repository.find();
        return res.json(lista);
    }

    // metodos para incluir e alterar comprador
    async store(req: Request, res: Response) {

        const repository = getRepository(Comprador);//recupera o repositorio de Comprador
        console.log(req.body);
        const end = repository.create(req.body);
        await repository.save(end);
        return res.json(end);
    }

    async update(req: Request, res: Response){
    
        const repository = getRepository(Comprador);//recupera o repositorio do veiculo.
    
        const {cpf} = req.body;//extrai os atributos id do corpo da mensagem
    
        const cpfExists = await repository.findOne({where :{cpf}});//consulta na tabela se existe um registro com o mesmo nickname.
        
        if(!cpfExists){
            return res.sendStatus(404);
        }
        
        const j = repository.create(req.body); //cria a entidade Veiculo
        
        await repository.save(j); //persiste (update) a entidade na tabela.
        
        return res.json(j);
    }

    //metodo de excluir
    async delete(req: Request, res: Response){

        const repository = getRepository(Comprador);//recupera o repositorio do vendedor.
        
        const cpf = req.params.cpf;
        
        const cpfExists = await repository.findOne({where :{cpf}});//consulta na tabela se existe um registro com o mesmo nickname da mensagem.

        if(cpfExists){
        
            await repository.remove(cpfExists);//caso exista, então aplica a remocao fisica. (corrigir erro no pdf 11)
            return res.sendStatus(204);//retorna o coigo 204.
        
        }else{
        
            return res.sendStatus(404);//se nao encontrar jogador para remover, retorna o codigo 404.
        }
    }


}

export default new CompradorController();