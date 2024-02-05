<template>
    <div id="tab_aut">
     
       <div v-if="currentTipo" class="edit-form">
            <h3>Tipo</h3>
            <form>
                <!-- Input ID -->
                <div class="form-group">
                    <label for="inputId">ID:</label>
                    <input type="number" v-model="tipo.id" class="form-control" id="inputId" >
                </div>

                <!-- Input descricao -->
                <div class="form-group">
                        <label for="inputDescricao">Descrição:</label>
                        <input type="text" v-model="tipo.descicao" class="form-control" id="inputDescricao">
                </div>
                          
            </form>
            
            <button class="badge badge-danger mr-2" @click="deleteTipo">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>
       </div>
       <div v-else>
            <br />
            <p>Por favor clique em um Tipo...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import TipoDataService from '../../services/TipoDataService'
 
     export default{
      name:'editTipo',
      data() {
             return {                
                 currentTipo: null,
                 message: '',
             }
         },
         methods: {

            getTipo(id){
                console.log("Pegou o id pelo - getTipo");
                TipoDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentTipo = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            /*
            updateVendedor(){
                console.log("Entrou update Vendedor (edit.vue)");
                VendedorDataService.update(this.currentVendedor)
                .then(response => {
                    console.log('VendedorDataService.update');
                    this.message = 'Vendedor alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            */
            deleteTipo(){
                console.log("Entrou delete Tipo (edit.vue)");
                TipoDataService.delete(this.currentTutorial.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "tipos-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "tipos-list" });
            }
         },
         mounted() {
            
            this.message = '';
            //this.listVeiculos();
            this.getTipo(this.$route.params.id);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>