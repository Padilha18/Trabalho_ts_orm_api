<template>
    <div id="tab_aut">
     
       <div v-if="currentComprador" class="edit-form">
            <h3>Comprador</h3>
            <form>
                <!-- Input CPF -->
                <!-- Input Nome --> 
                <div class="form-group">
                        <label for="inputNome">Nome:</label>
                        <input type="text" v-model="currentComprador.nome" class="form-control" id="inputNome">
                </div>

                <!-- Input dt_nascimento -->
                <div class="form-group">
                    <label for="inputDt_nascimento">Data Nascimento:</label>
                    <input type="date" v-model="currentComprador.dt_nascimento" class="form-control" id="inputDt_nascimento">
                </div>

                <!-- Input Endereco -->
                <div class="form-group">
                    <label for="inputEndereco">Endereço:</label>
                    <input type="text" v-model="currentComprador.endereco" class="form-control" id="inputEndereco">
                </div>

                <!-- Input Telefone -->
                <div class="form-group">
                    <label for="inputTelefone">Telefone:</label>
                    <input type="text" v-model="currentComprador.telefone" class="form-control" id="inputTelefone">
                </div>

                <!-- Input E-mail -->
                <div class="form-group">
                    <label for="inputEmail">E-mail:</label>
                    <input type="email" v-model="currentComprador.email" class="form-control" id="inputEmail">
                </div>

                <!-- Input Limite de Credito -->
                <div class="form-group">
                    <label for="inputLimiteCredito">Limite de Crédito:</label>
                    <input type="number" v-model="currentComprador.limite_credito" class="form-control" id="inputLimiteCredito">
                </div>
                
                <!-- Input Número de Compras -->
                <div class="form-group">
                    <label for="inputNumCompras">Número de Compras:</label>
                    <input type="number" v-model="currentComprador.numero_compras" class="form-control" id="inputNumCompras">
                </div>  
                       
            </form>
            <button class="badge badge-success" @click="updateComprador">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteComprador">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>
       </div>
       <div v-else>
            <br />
            <p>Por favor clique em um Comprador...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import CompradorDataService from '../../services/CompradorDataService'
 
     export default{
      name:'editCompradores',
      data() {
             return {                
                currentComprador: null,
                message: '',
                 
             }
         },
         methods: {

            getComprador(cpf){

                CompradorDataService.get(cpf)
                .then(response => {
                    console.log(response.data);
                    this.currentComprador = response.data;
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            updateComprador(){
                //console.log("Entrou update Comprador (edit.vue)");
                CompradorDataService.update(this.currentComprador)
                .then(response => {
                    console.log('CompradorDataService.update' + this.currentComprador);
                    this.message = 'Comprador alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteComprador(){
                //console.log("Entrou delete Comprador (edit.vue)");
                CompradorDataService.delete(this.currentComprador.cpf)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "compradores-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "compradores-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.getComprador(this.$route.params.cpf);
            
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>