
import http from "../http-common";

class CompradorDataService {

    async get(cpf){

        console.log('CompradorDataService.get: ', cpf);
        return await http.get('/comprador/find/'+ cpf);
    }

    async list(){

        console.log('CompradorDataService.list: ');
        return await http.get(`/comprador/list`);
    }

    async delete(cpf){

        console.log('CompradorDataService.delete: ', cpf);
        return await http.delete(`/comprador/delete/`+cpf);
    }

    async update(data){

        console.log('CompradorDataService.update: ', data);
        return await http.post(`/comprador/update/:cpf`, data);
    }
    
    async create(data){

        console.log('CompradorDataService.create: ', data);
        return await http.post(`/comprador/store`, data);
    }  

    
 
}

export default new CompradorDataService();
