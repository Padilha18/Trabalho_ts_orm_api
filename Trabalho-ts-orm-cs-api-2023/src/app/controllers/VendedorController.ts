import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Vendedor from '../models/Vendedor';
import Veiculo from '../models/Veiculo';


class VendedorController{

    
    async find(req: Request, res: Response){

        const repository = getRepository(Vendedor);
        const cpf = req.params.cpf;

        const list = await repository.findOne({where : {"cpf" : cpf}});
        const p = await repository.createQueryBuilder("tb_vendedor").where({"cpf" : cpf}).leftJoinAndSelect("tb_vendedor.veiculo", "veiculos").getOne();

        if(p){
            return res.json(p)
        }else{
            return res.sendStatus(204);
        }
    }

    
    async login(req: Request, res: Response){
        const repository = getRepository(Vendedor);

        const {cpf, senha} = req.body;
        const v = await repository.findOne(
            {where : {"cpf" : cpf, "senha" : senha }});

        if(v){           
          //  res.sendStatus(201);
            return res.json(v);
        }else{
            return res.sendStatus(204);
        }
    }

  
    async list(req: Request, res: Response){
        const repository = getRepository(Vendedor);
        //const lista = await repository.find();
        const lista = await repository.createQueryBuilder("tb_vendedor").leftJoinAndSelect("tb_vendedor.veiculo", "veiculos").getMany()
         
        return res.json(lista);
    }

    async list_basico_ven(req: Request, res: Response){
        const repository = getRepository(Vendedor);
        const lista = await repository.find();
        
        return res.json(lista);
    }  

    async delete(req: Request, res: Response){

        const repository = getRepository(Vendedor);//recupera o repositorio do vendedor.
        
        const cpf = req.params.cpf;
        
        const cpfExists = await repository.findOne({where :{cpf}});//consulta na tabela se existe um registro com o mesmo nickname da mensagem.

        if(cpfExists){
        
            await repository.remove(cpfExists);//caso exista, então aplica a remocao fisica. (corrigir erro no pdf 11)
            return res.sendStatus(204);//retorna o coigo 204.
        
        }else{
        
            return res.sendStatus(404);//se nao encontrar jogador para remover, retorna o codigo 404.
        }
    }

    async update(req: Request, res: Response){
    
        const repository = getRepository(Vendedor);//recupera o repositorio do vendedor.
    
        const {cpf} = req.body;//extrai os atributos id do corpo da mensagem
    
        const cpfExists = await repository.findOne({where :{cpf}});//consulta na tabela se existe um registro com o mesmo nickname.
        
        if(!cpfExists){
            return res.sendStatus(404);
        }
        
        const v = repository.create(req.body); //cria a entidade Jogador
        
        await repository.save(v); //persiste (update) a entidade na tabela.
        
        return res.json(v);
    }

    async store(req: Request, res: Response){

        const repository = getRepository(Vendedor);//recupera o repositorio do Patente.

        const repositoryVeiculo = getRepository(Veiculo);//recupera o repositorio do Patente.

        const {cpf} = req.body;//extrai os atributos id do corpo da mensagem

        const cpfExists = await repository.findOne({where : {cpf}});//consulta na tabela se existe um registro com o mesmo cpf da mensagem.

        if(!cpfExists){

            //let veiculo = new Veiculo(); //cria uma instancia de veiculo.

            //endereco.cep = req.body.endereco.cep;
            //endereco.complemento = req.body.endereco.complemento;            

            //const result = await repositoryVeiculo.save(veiculo);//efetiva a operacao de insert.                        

            const v = repository.create(req.body);
            await repository.save(v);
            return res.json(v);

              
        }else{

            return res.sendStatus(409);//caso exista um registro, retorna 409 informando o conflito
        }
        
    }
 



}

export default new VendedorController();