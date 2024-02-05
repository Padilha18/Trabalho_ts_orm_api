<template>
    <div id="tab_aut">
     
       <div v-if="currentVenda" class="edit-form">
            <h3>Edit Venda</h3>
            <form>
                <!-- Input ID -->
                <div class="form-group">
                    <label for="inputId">ID:</label>
                    <input type="number" v-model="currentVenda.id" class="form-control" id="inputId" disabled>
                </div> 

                <!-- Input Valor -->
                <div class="form-group">
                        <label for="inputValor">Valor:</label>
                        <input type="number" v-model="currentVenda.valor" class="form-control" id="inputValor">
                </div>

                <!-- Input Data_Venda 
                <div class="form-group">
                    <label for="inputDt_venda">Data Venda:</label>
                    <input type="number" v-model="currentVenda.data_venda" class="form-control" id="inputDt_venda" disabled>
                </div>
                -->
                
                


                <!-- Input Forma Pagamento -->
                <!-- 
                <div class="form-group">
                    <label for="inputFormaPagamento">Forma Pagamento:</label>
                    <input type="text" v-model="currentVenda.forma_pagamento" class="form-control" id="inputFormaPagamento" >
                </div>    
                -->

                <div class="form-group">
                    <label for="selectForma_Pagamento">Forma Pagamento:</label>
                    <select v-model="currentVenda.forma_pagamento" class="form-control" id="selectForma_Pagamento" >                                
                        <option value="pix">Pix</option>
                        <option value="cartaoCredito">Cartão no Credito</option>
                        <option value="cartaoDebito">Cartão no Débito</option>
                        <option value="cheque">Cheque</option>
                    </select>    
                </div> 

                <!-- Select Compradores -->
                <div class="form-group">
                    <label for="selectComprador">Compradores:</label>
                    <select v-model="currentVenda.comprador" class="form-control" id="selectComprador">                                
                        <option v-for="c in comprador" :key ="c.cpf" v-bind:value="c">
                            {{ c.nome }}
                        </option>
                    </select>
                </div>

        
                  <!-- Select Compradores -->
                  <div class="form-group">
                    <label for="selectVendedor">Vendedores:</label>
                    <select v-model="currentVenda.vendedor" class="form-control" id="selectvendedor">                                
                        <option v-for="v in vendedor" :key ="v.cpf" v-bind:value="v">
                            {{ v.nome }}
                        </option>
                    </select>
                </div>

                <!-- Select de Veiculos -->
                <div class="form-group">
                    <label for="selectVeiculo">Veiculos:</label>
                    <select v-model="currentVenda.veiculos" class="form-control" id="selectVeiculo" multiple>                                
                        <option v-for="v in veiculos" :key ="v.id" v-bind:value="v">
                            {{ v.modelo }}
                            </option>
                    </select>
                    
                </div>                      
            </form>
            <button class="badge badge-success" @click="updateVenda">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteVenda">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>
       </div>
       <div v-else>
            <br />
            <p>Por favor clique em uma Venda...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import VendaDataService from '../../services/VendaDataService'
     import VeiculoDataService from '../../services/VeiculoDataService'
     import CompradorDataService from '../../services/CompradorDataService'
     import VendedorDataService from '../../services/VendedorDataService'
 
     export default{
      name:'editVendas',
      data() {
             return {                
                 currentVenda: null,
                 message: '',
                 veiculos: [],
                 comprador: [],
                 vendedor: []
             }
         },
         methods: {

            getVenda(id){

                VendaDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentVenda = response.data;
                    console.log(this.currentVenda.vendedor);
                    console.log(this.currentVenda.comprador);
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            listVeiculos(){
                console.log("Entrou list currentVenda (edit.vue)");

                VeiculoDataService.list_basico().then(response =>{

                    console.log("Retorno do seviço VeiculoDataService.list", response.status);

                    this.veiculos = response.data;                                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço VeiculoDataService.list');
                console.log(response);
                });               
            },
            listCompradores(){
                CompradorDataService.list().then(response =>{

                console.log("Retorno do seviço CompradorDataService.list", response.status);

                for(let c of response.data){

                    this.comprador.push(c);
                }                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço CompradorDataService.list');
                console.log(response);
                });               
            },
            listVendedores(){
                VendedorDataService.list_basico_ven().then(response =>{

                console.log("Retorno do seviço VendedorDataService.list", response.status);

                for(let v of response.data){

                    this.vendedor.push(v);
                }                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço VendedorDataService.list');
                console.log(response);
                });               
            },
            updateVenda(){
                //console.log(data_venda);
                console.log("Entrou update currentVenda (edit.vue)");
                VendaDataService.update(this.currentVenda)
                .then(response => {
                    console.log('VendaDataService.update');
                    this.message = 'Venda alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteVenda(){
                console.log("Entrou delete currentVenda (edit.vue)");
                VendaDataService.delete(this.currentVenda.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "vendas-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "vendas-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.listVeiculos();
            this.listCompradores();
            this.listVendedores();
            this.getVenda(this.$route.params.id);
            console.log(this.currentVenda);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>