<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Vendedores</h4>
            <table class="table table-striped" > 
                <tr>
                    <th scope="col">Cpf</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Dt_nascimento</th>
                    <th scope="col">Endereço</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">E-mail</th> 
                    <th scope="col">Salario_fixo</th>
                    <th scope="col">Comissão_venda</th>
                    <th scope="col">Senha</th> 

                    <th scope="col">Alterar</th> 
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(v, indice) in vendedores" :key ="v.cpf" :class="{ active: indice == currentIndex }">
                            <td>{{v.cpf}}</td>
                            <td>{{v.nome}}</td>
                            <td>{{v.dt_nascimento | formataData}}</td>
                            <td>{{v.endereco}}</td>
                            <td>{{v.telefone}}</td>
                            <td>{{v.email}}</td>
                            <td>{{v.salario_fixo}}</td>
                            <td>{{v.comissao_venda}}</td>
                            <td>{{v.senha}}</td>
                                                
                            <td><button v-on:click="setCurrentVendedor(v, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remVendedor(v, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentVendedor">
                    <h4>Vendedor</h4>
                    <div>
                        <label><strong>Cpf:</strong></label> {{ currentVendedor.cpf }}
                    </div>
                    <div>
                        <label><strong>Nome:</strong></label> {{ currentVendedor.nome }}
                    </div>
                    <div>
                        <label><strong>Data Nascimento:</strong></label> {{ currentVendedor.dt_nascimento }}
                    </div>
                    <div>
                        <label><strong>Endereco:</strong></label> {{ currentVendedor.endereco }}
                    </div>
                    <div>
                        <label><strong>Telefone:</strong></label> {{ currentVendedor.telefone }}
                    </div>
                    <div>
                        <label><strong>email:</strong></label> {{ currentVendedor.email }}
                    </div>
                    <div>
                        <label><strong>Salario Fixo:</strong></label> {{ currentVendedor.salario_fixo }}
                    </div>
                    <div>
                        <label><strong>Comissão Venda:</strong></label> {{ currentVendedor.comissao_venda }}
                    </div>
                    <div>
                        <label><strong>Senha:</strong></label> {{ currentVendedor.senha }}
                    </div>


                    <a class="badge badge-warning"
                    :href="'/vendedor/update/' + currentVendedor.cpf"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Por favor clique em um Vendedor...</p>
                <router-link to="/addVendedor" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
    
 
     import VendedorDataService from '../../services/VendedorDataService'     
 
     export default{
      name:'listVendedores',
      data() {
             return {
                 vendedores: [],
                 currentVendedor: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarVendedores(){

                VendedorDataService.list().then(response =>{

                    console.log("Retorno do seviço list Vendedor", response.status);

                   this.vendedores = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listvendedor');
                    console.log(response);
                });
            },
            setCurrentVendedor(vendedor, index){

                this.currentVendedor = vendedor;
                this.currentIndex = index;
            },
            remVendedor(vendedor, index){

                VendedorDataService.delete(vendedor.cpf)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarVendedores();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarVendedores();
         }
 
     }
 </script>
    
 <style scoped>

    .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
    }

     
 </style>