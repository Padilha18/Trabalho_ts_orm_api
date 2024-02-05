<template>
    <div id="tab_aut">
     
       <div v-if="currentVendedor" class="edit-form">
            <h3>Vendedor</h3>
            <form>
                <!-- Input CPF -->
                <div class="form-group">
                    <label for="inputCpf">CPF:</label>
                    <input type="number" v-model="currentVendedor.cpf" class="form-control" id="inputCpf" disabled>
                </div>

                <!-- Input Nome -->
                <div class="form-group">
                        <label for="inputNome">Nome:</label>
                        <input type="text" v-model="currentVendedor.nome" class="form-control" id="inputNome">
                </div>

                <!-- Input dt_nascimento -->
                <div class="form-group">
                    <label for="inputDt_nascimento">Data Nascimento:</label>
                    <input type="date" v-model="currentVendedor.dt_nascimento" class="form-control" id="inputDt_nascimento">
                </div>

                <!-- Input Endereco -->
                <div class="form-group">
                    <label for="inputEndereco">Endereço:</label>
                    <input type="text" v-model="currentVendedor.endereco" class="form-control" id="inputEndereco">
                </div>

                <!-- Input Telefone -->
                <div class="form-group">
                    <label for="inputTelefone">Telefone:</label>
                    <input type="text" v-model="currentVendedor.telefone" class="form-control" id="inputTelefone">
                </div>

                <!-- Input E-mail -->
                <div class="form-group">
                    <label for="inputEmail">E-mail:</label>
                    <input type="email" v-model="currentVendedor.email" class="form-control" id="inputEmail">
                </div>  

                <!-- Input Senha -->
                <div class="form-group">
                    <label for="inputSenha">Senha:</label>
                    <input type="password" v-model="currentVendedor.senha" class="form-control" id="inputSenha">
                </div>  

                <!-- Input Salário fixo -->
                <div class="form-group">
                    <label for="inputSalarioFixo">Salário Fixo:</label>
                    <input type="number" v-model="currentVendedor.salario_fixo" class="form-control" id="inputSalarioFixo">
                </div>
                
                <!-- Input Comissão Venda -->
                <div class="form-group">
                    <label for="inputComissaoVenda">Comissão Venda:</label>
                    <input type="number" v-model="currentVendedor.comissao_venda" class="form-control" id="inputComissaoVenda">
                </div>  
                
                 
                <div class="form-group">
                    <label for="selectVeiculo">Veiculos:</label>
                    <select v-model="currentVendedor.veiculo" class="form-control" id="selectVeiculo" multiple>                                
                        <option v-for="v in veiculos" :key ="v.id" v-bind:value="v">
                            {{ v.modelo }}
                            </option>
                    </select>
                </div>                       
             
            </form>
            <button class="badge badge-success" @click="updateVendedor">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteVendedor">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>
       </div>
       <div v-else>
            <br />
            <p>Por favor clique em um Vendedor...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import VendedorDataService from '../../services/VendedorDataService'
     import VeiculoDataService from '../../services/VeiculoDataService'
 
     export default{
      name:'editVendedores',
      data() {
             return {                
                 currentVendedor: null,
                 message: '',
                 veiculos: []
             }
         },
         methods: {

            getVendedor(cpf){
                
                VendedorDataService.get(cpf)
                .then(response => {
                    console.log(response.data);
                    this.currentVendedor = response.data;
                    console.log(this.currentVendedor);
                    
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            listVeiculos(){
                console.log("Entrou list Vendedor (edit.vue)");

                VeiculoDataService.list_basico().then(response =>{

                    console.log("Retorno do seviço VeiculoDataService.list", response.status);

                    this.veiculos = response.data;                                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço VeiculoDataService.list');
                console.log(response);
                });               
            },
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
            deleteVendedor(){
                console.log("Entrou delete Vendedor (edit.vue)");
                VendedorDataService.delete(this.currentVendedor.cpf)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "vendedores-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "vendedores-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.listVeiculos();
            this.getVendedor(this.$route.params.cpf);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>