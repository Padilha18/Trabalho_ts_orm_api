
import http from "../http-common";

class VeiculoDataService {

    async list(){

        console.log('VeiculoDataService.list: ');
        return await http.get(`/veiculo/list`);
    }

    async list_basico(){

        console.log('VeiculoDataService.list: ');
        return await http.get(`/veiculo/list_basico`);
    }

    async update(data){

        console.log('VeiculoDataService.update:', data);
        return await http.post(`/veiculo/update/:id`, data);
    }

    async get(id){

        console.log('VeiculoDataService.get: ', id);
        return await http.get('/veiculo/find/'+id);
    }

    
    async delete(id){

        console.log('VeiculoDataService.delete: ', id);
        return await http.delete(`/veiculo/delete/`+id);
    }

    async create(data){

        console.log('VeiculoDataService.create: ', data);
        return await http.post(`/veiculo/store`, data);
    }  


 


}

export default new VeiculoDataService();