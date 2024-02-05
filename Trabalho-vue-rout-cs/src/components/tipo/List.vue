<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Tipos</h4>
            <table class="table table-striped" >
                <tr> 
                    <th scope="col">Id</th>
                    <th scope="col">Descrição</th>

                    <!--
                    <th scope="col">Alterar</th> 
                    -->
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(t, indice) in tipos" :key ="t.id" :class="{ active: indice == currentIndex }">
                            <td>{{t.id}}</td>
                            <td>{{t.descricao}}</td>
                                                
                            
                            <td><button v-on:click="remTipo(t, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentTipo">
                    <h4>Tipo</h4>
                    <div>
                        <label><strong>Id:</strong></label> {{ currentTipo.id }}
                    </div>
                    <div>
                        <label><strong>Descricao:</strong></label> {{ currentTipo.descicao }}
                    </div>


                    <a class="badge badge-warning"
                    :href="'/tipo/' + currentTipo.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Por favor clique em um Tipo...</p>
                <router-link to="/addTipo" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
    
     import TipoDataService from '../../services/TipoDataService'     
 
     export default{
      name:'listTipos',
      data() {
             return {
                 tipos: [],
                 currentTipo: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarTipos(){

                TipoDataService.list().then(response =>{

                    console.log("Retorno do seviço listagem do Tipo", response.status);

                   this.tipos = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listTipo');
                    console.log(response);
                });
            },
            setCurrentTipo(tipo, index){

                this.currentTipo = tipo;
                this.currentIndex = index;
            },
            remTipo(tipo, index){

                TipoDataService.delete(tipo.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarTipos();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarTipos();
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