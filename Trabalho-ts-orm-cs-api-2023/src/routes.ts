import { Router } from 'express';


import CompradorController from './app/controllers/CompradorController';
import TipoController from './app/controllers/TipoController';
import VeiculoController from './app/controllers/VeiculoController';
import VendaController from './app/controllers/VendaController';
import VendedorController from './app/controllers/VendedorController';

const router = Router();

//criando  rotas para /comprador.
router.post('/comprador/store', CompradorController.store);//define uma rota vai método post para chamar o método store da classe EnderecoController;
router.get('/comprador/list', CompradorController.list);
router.delete('/comprador/delete/:cpf', CompradorController.delete);
router.post('/comprador/update/:cpf', CompradorController.update);
router.get('/comprador/:cpf', CompradorController.find);
router.get('/comprador/find/:cpf', CompradorController.find);


//criando rotas para /tipo
router.post('/tipo/store', TipoController.store);//define uma rota vai método post para chamar o método store da classe tipoController;
router.get('/tipo/list', TipoController.list);
router.delete('/tipo/delete/:id', TipoController.delete);
router.get('/tipo/find/:id', TipoController.find);

//criando rotas para /veiculo
router.post('/veiculo/store', VeiculoController.store);//define uma rota vai método post para chamar o método store da classe JogadorController;
router.get('/veiculo/list', VeiculoController.list);
router.get('/veiculo/list_basico', VeiculoController.list_basico);
router.delete('/veiculo/delete/:id', VeiculoController.delete);
router.post('/veiculo/update/:id', VeiculoController.update);
router.get('/veiculo/find/:id', VeiculoController.find);


//criando rotas para /Venda
router.post('/venda/store', VendaController.store);//define uma rota vai método post para chamar o método store da classe VendaController;
router.get('/venda/list', VendaController.list);
router.delete('/venda/delete/:id', VendaController.delete);
router.post('/venda/update/:id', VendaController.update);
router.get('/venda/find/:id', VendaController.find);



//criando rotas para /Vendedor
router.post('/vendedor/login', VendedorController.login)
router.post('/vendedor/store', VendedorController.store);//define uma rota vai método post para chamar o método store da classe MapaController;
router.get('/vendedor/list', VendedorController.list);
router.get('/vendedor/list_basico_ven', VendedorController.list_basico_ven);
router.delete('/vendedor/delete/:cpf', VendedorController.delete);
router.post('/vendedor/update/:cpf', VendedorController.update);
router.get('/vendedor/find/:cpf', VendedorController.find);


export default router;
