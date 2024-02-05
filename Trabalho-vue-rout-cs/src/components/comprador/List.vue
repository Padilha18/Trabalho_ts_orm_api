<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Compradores</h4>
            <table class="table table-striped" > 
                <tr>
                    <th scope="col">Cpf</th> 
                    <th scope="col">Nome</th>
                    <th scope="col">Dt_nascimento</th>
                    <th scope="col">Endereço</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">E-mail</th> 
                    <th scope="col">Limite_credito</th>
                    <th scope="col">Numero_compras</th> 

                    <th scope="col">Alterar</th> 
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(c, indice) in compradores" :key ="c.cpf" :class="{ active: indice == currentIndex }">
                            <td>{{c.cpf}}</td>
                            <td>{{c.nome}}</td>
                            <td>{{c.dt_nascimento | formataData}}</td>
                            <td>{{c.endereco}}</td>
                            <td>{{c.telefone}}</td>
                            <td>{{c.email}}</td>
                            <td>{{c.limite_credito}}</td>
                            <td>{{c.numero_compras}}</td>
                                                
                            <td><button v-on:click="setCurrentComprador(c, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remComprador(c, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentComprador">
                    <h4>Comprador</h4>
                    <div>
                        <label><strong>Cpf:</strong></label> {{ currentComprador.cpf }}
                    </div>
                    <div>
                        <label><strong>Nome:</strong></label> {{ currentComprador.nome }}
                    </div>
                    <div>
                        <label><strong>Data Nascimento:</strong></label> {{ currentComprador.dt_nascimento }}
                    </div>
                    <div>
                        <label><strong>Endereco:</strong></label> {{ currentComprador.endereco }}
                    </div>
                    <div>
                        <label><strong>Telefone:</strong></label> {{ currentComprador.telefone }}
                    </div>
                    <div>
                        <label><strong>email:</strong></label> {{ currentComprador.email }}
                    </div>
                    <div>
                        <label><strong>Limite Credito:</strong></label> {{ currentComprador.limite_credito }}
                    </div>
                    <div>
                        <label><strong>Numero Compras:</strong></label> {{ currentComprador.numero_compras }}
                    </div>


                    <a class="badge badge-warning"
                    :href="'/comprador/update/' + currentComprador.cpf"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Por favor clique em um Comprador...</p>
                <router-link to="/addComprador" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
    
 
     import CompradorDataService from '../../services/CompradorDataService'     
 
     export default{
      name:'listCompradores',
      data() {
             return {
                 compradores: [],
                 currentComprador: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarCompradores(){

                CompradorDataService.list().then(response =>{

                    console.log("Retorno do seviço list compradores", response.status);

                   this.compradores = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listcomprador');
                    console.log(response);
                });
            },
            setCurrentComprador(comprador, index){

                this.currentComprador = comprador;
                this.currentIndex = index;
            },
            remComprador(comprador, index){

                CompradorDataService.delete(comprador.cpf)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarCompradores();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarCompradores();
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