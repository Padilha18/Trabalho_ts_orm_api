
import http from "../http-common";

class TipoDataService {

    async get(id){

        console.log('TipoDataService.get: ', id);
        return await http.get('/tipo/find/'+id);
    }

    async list(){

        console.log('TipoDataService.list: ');
        return await http.get(`/tipo/list`);
    }

    async delete(id){

        console.log('TipoDataService.delete: ', id);
        return await http.delete(`/tipo/delete/`+id);
    }
    
    async create(data){

        console.log('TipoDataService.create: ', data);
        return await http.post(`/tipo/store`, data);
    }  

    
 
}

export default new TipoDataService();
