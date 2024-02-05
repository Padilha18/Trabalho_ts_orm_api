<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Vendas</h4>
            <table class="table table-striped" > 
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Forma Pagamento</th>
                    <th scope="col">Data Venda</th>
                    <th scope="col">Compradores</th>
                    <th scope="col">Vendedores</th>
                    <!-- <th scope="col">Veiculo</th>   -->

                    <th scope="col">Alterar</th> 
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(vend, indice) in vendas" :key ="vend.id" :class="{ active: indice == currentIndex }">
                            <td>{{vend.id}}</td>
                            <td>{{vend.valor}}</td>
                            <td>{{vend.forma_pagamento}}</td>
                            <td>{{vend.data_venda | formataData}}</td>
                            <td>{{vend.comprador.nome}}</td>
                            <td>{{vend.vendedor.nome}}</td> 
                            <!-- <td>{{vend.veiculo}}</td> -->
                            
                                                
                            <td><button v-on:click="setCurrentVenda(vend, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remVenda(vend, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentVenda">
                    <h4>Venda</h4>
                    <div>
                        <label><strong>ID:</strong></label> {{ currentVenda.id }}
                    </div>
                    <div>
                        <label><strong>Valor:</strong></label> {{ currentVenda.valor }}
                    </div>
                    <div>
                        <label><strong>Forma Pagamento:</strong></label> {{ currentVenda.forma_pagamento }}
                    </div>

                    <!-- <div>
                        <label><strong>Data Venda:</strong></label> {{ currentVenda.data_venda }}
                    </div>  -->

                    <div>
                        <label><strong>Compradores:</strong></label> {{ currentVenda.comprador.nome }}
                    </div>
                    <div>
                        <label><strong>Vendedores:</strong></label> {{ currentVenda.vendedor.nome }}
                    </div>
                    <!-- <div>
                        <label><strong>Veiculo:</strong></label> {{ currentVenda.veiculo }}
                    </div> -->


                    <a class="badge badge-warning"
                    :href="'/venda/update/' + currentVenda.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Por favor clique em uma Venda...</p>
                <router-link to="/addVenda" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
    
 
     import VendaDataService from '../../services/VendaDataService'
     import VeiculoDataService from '../../services/VeiculoDataService'
     import CompradorDataService from '../../services/CompradorDataService'
     import VendedorDataService from '../../services/VendedorDataService'   
 
     export default{
      name:'listVendas',
      data() {
             return {
                 vendas: [],
                 currentVenda: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarVendas(){

                VendaDataService.list().then(response =>{

                    console.log("Retorno do seviço list Venda", response.status);

                   this.vendas = response.data;
                   console.log(this.vendas);

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listvenda');
                    console.log(response);
                });
            },
            setCurrentVenda(venda, index){

                this.currentVenda = venda;
                this.currentIndex = index;
            },
            remVenda(venda, index){

                VendaDataService.delete(venda.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarVendas();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarVendas();
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