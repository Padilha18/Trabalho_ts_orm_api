
import http from "../http-common";

class VendaDataService {

    async get(id){

        console.log('VendaDataService.get: ', id);
        return await http.get('/venda/find/'+id);
    }

    async list(){

        console.log('VendaDataService.list: ');
        return await http.get(`/venda/list`);
    }

    async delete(id){

        console.log('VendaDataService.delete: ', id);
        return await http.delete(`/venda/delete/`+id);
    }

    async update(data){

        console.log('VendaDataService.update: ', data);
        return await http.post(`/venda/update/:id`, data);
    }
    
    async create(data){

        console.log('VendaDataService.create: ', data);
        return await http.post(`/venda/store`, data);
    }  

    
 
}

export default new VendaDataService();
