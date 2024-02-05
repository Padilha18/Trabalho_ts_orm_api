
import http from "../http-common";

class VendedorDataService {

    async authenticate(data){

        console.log('VendedorDataService.authenticate: ', data);
        const response = await http.post(`/vendedor/login`, data);
        return response;
    }

    async get(cpf){

        console.log('VendedorDataService.get: ', cpf);
        return await http.get('/vendedor/find/'+cpf);
    }

    async list(){

        console.log('VendedorDataService.list: ');
        return await http.get(`/vendedor/list`); 
    }
    
    async list_basico_ven(){

        console.log('VendedorDataService.list: ');
        return await http.get(`/vendedor/list_basico_ven`);
    }

    async delete(cpf){

        console.log('VendedorDataService.delete: ', cpf);
        return await http.delete(`/vendedor/delete/`+cpf);
    }

    async update(data){

        console.log('VendedorDataService.update: ', data);
        return await http.post(`/vendedor/update/:cpf`, data);
    }
    
    async create(data){

        console.log('VendedorDataService.create: ', data);
        return await http.post(`/vendedor/store`, data);
    }  

    
 
}

export default new VendedorDataService();
