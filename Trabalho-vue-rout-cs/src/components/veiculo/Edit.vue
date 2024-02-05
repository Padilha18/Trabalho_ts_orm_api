<template>
    <div id="tab_aut">
     
       <div v-if="currentVeiculo" class="edit-form">
            <h3>Veiculo</h3>
            <form>
                <!-- Input ID -->
                <div class="form-group">
                    <label for="inputID">ID:</label>
                    <input type="number" v-model="currentVeiculo.id" class="form-control" id="inputID" disabled>
                </div>

                <!-- Input Placa -->
                <div class="form-group">
                        <label for="inputPlaca">Placa:</label>
                        <input type="text" v-model="currentVeiculo.placa" class="form-control" id="inputPlaca">
                </div>

                <!-- Input Ano -->
                <div class="form-group">
                    <label for="inputAno">Ano:</label>
                    <input type="number" v-model="currentVeiculo.ano" class="form-control" id="inputAno">
                </div>

                <!-- Input Cor -->
                <div class="form-group">
                    <label for="inputCor">Cor:</label>
                    <input type="text" v-model="currentVeiculo.cor" class="form-control" id="inputCor">
                </div>

                <!-- Input Qtd_passageiros -->
                <div class="form-group">
                    <label for="inputQtd_passageiros">Qtd Passageiros:</label>
                    <input type="number" v-model="currentVeiculo.qtd_passageiros" class="form-control" id="inputQtd_passageiros">
                </div>

                <!-- Input Modelo -->
                <div class="form-group">
                    <label for="inputModelo">Modelo:</label>
                    <input type="text" v-model="currentVeiculo.modelo" class="form-control" id="inputModelo">
                </div>  

                <!-- Input Marca -->
                <div class="form-group">
                    <label for="inputMarca">Marca:</label>
                    <input type="text" v-model="currentVeiculo.marca" class="form-control" id="inputMarca">
                </div>  

                <!-- Input Combustivel -->
                <div class="form-group">
                    <label for="inputCombustivel">Combustivel:</label>
                    <input type="text" v-model="currentVeiculo.combustivel" class="form-control" id="inputCombustivel">
                </div>
                
                <!-- Input Preco -->
                <div class="form-group">
                    <label for="inputPreco">Preço:</label>
                    <input type="number" v-model="currentVeiculo.preco" class="form-control" id="inputPreco">
                </div> 
                
                <!-- Input Status -->
                <div class="form-group">
                    <label for="inputStatus">Status:</label>
                    <input type="checkbox" v-model="currentVeiculo.status" class="form-control" id="inputStatus" >
                </div>

                <div class="form-group">
                    <label for="selectTipo">Tipos:</label>
                    <select v-model="currentVeiculo.tipos" class="form-control" id="selectTipo">                                
                        <option v-for="t in tipos" :key ="t.id" v-bind:value="t">
                            {{ t.descricao }}
                            </option>
                    </select>
                    
                </div>                        
            </form>
            <button class="badge badge-success" @click="updateVeiculo">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteVeiculo">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>
       </div>
       <div v-else>
            <br />
            <p>Por favor clique em um Veiculo...</p>
        </div>

                                          
    </div>
 </template>
 <script>
    
     import VeiculoDataService from '../../services/VeiculoDataService'
     import TipoDataService from '../../services/TipoDataService'
     
 
     export default{
      name:'editVeiculos',
      data() {
             return {                
                 currentVeiculo: null,
                 message: '',
                 tipos: []
             }
         },
         methods: {

            getVeiculo(id){
                console.log("Pegou o ID de veiculos - getVeiculos - edit.vue");
                VeiculoDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentVeiculo = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            listTipos(){
                console.log("Entrou list tipos (edit.vue)");

                TipoDataService.list().then(response =>{

                    console.log("Retorno do seviço TipoDataService.list", response.status);

                    this.tipos = response.data;
                    console.log(response.data);                                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço TipoDataService.list');
                console.log(response);
                });               
            },
            updateVeiculo(){
                console.log("Entrou update Veiculo (edit.vue)");
                VeiculoDataService.update(this.currentVeiculo)
                .then(response => {
                    console.log('VeiculoDataService.update');
                    this.message = 'Veiculo alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteVeiculo(){
                console.log("Entrou delete Veiculo (edit.vue)");
                VeiculoDataService.delete(this.currentComprador.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "veiculos-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "veiculos-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.listTipos();
            this.getVeiculo(this.$route.params.id);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>