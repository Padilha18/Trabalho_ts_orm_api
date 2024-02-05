<template>
    <div class="submit-form">
      <div v-if="!submitted">   


        <!-- Input Valor -->
        <div class="form-group">
                <label for="inputValor">Valor:</label>
                <input type="number" v-model="venda.valor" class="form-control" id="inputValor">
        </div>


        <!-- Input Forma Pagamento -->
        <!-- 
        <div class="form-group">
            <label for="inputFormaPagamento">Forma Pagamento:</label>
            <input type="text" v-model="venda.forma_pagamento" class="form-control" id="inputFormaPagamento" >
        </div>    
         -->

        <div class="form-group">
            <label for="selectForma_Pagamento">Forma Pagamento:</label>
            <select v-model="venda.forma_pagamento" class="form-control" id="selectForma_Pagamento">                                
                <option value="pix">Pix</option>
                <option value="cartaoCredito">Cartão no Credito</option>
                <option value="cartaoDebito">Cartão no Débito</option>
                <option value="cheque">Cheque</option>
            </select>    
        </div> 

        <!-- CPF Comprador 
        <div class="form-group">
            <label for="inputCpf_comprador">CPF Comprador:</label>
            <input type="text" v-model="venda.cpf_comprador" class="form-control" id="inputCpf_comprador">
        </div>
        -->
        <!-- CPF Vendedor 
        <div class="form-group">
            <label for="inputCpf_vendedor">CPF Vendedor:</label>
            <input type="text" v-model="venda.endereco" class="form-control" id="inputCpf_vendedor">
        </div>
        -->

        <div class="form-group">
            <label for="selectComprador">Compradores:</label>
            <select v-model="venda.comprador" class="form-control" id="selectComprador">                                
                <option v-for="c in compradores" :key ="c.cpf" v-bind:value="c">
                    {{ c.nome }}
                    </option>
            </select>
        </div>

        

        <div class="form-group">
            <label for="selectVendedor">Vendedores:</label>
            <select v-model="venda.vendedor" class="form-control" id="selectVendedor">                                
                <option v-for="v in vendedores" :key ="v.cpf" v-bind:value="v">
                    {{ v.nome }}
                    </option>
            </select>
        </div>

        <!-- Select de Veiculos -->
        <div class="form-group">
            <label for="selectVeiculo">Veiculos:</label>
            <select v-model="venda.veiculos" class="form-control" id="selectVeiculo" multiple>                                
                <option v-for="v in veiculos" :key ="v.id" v-bind:value="v">
                    {{ v.modelo }}
                    </option>
            </select>
            
        </div>     
  
        <button @click="saveVenda" class="btn btn-success">Salvar</button>
        <router-link to="/vendas" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newVenda">Novo</button>
        <router-link to="/vendas" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import CompradorDataService from '../../services/CompradorDataService'
    import VendedorDataService from '../../services/VendedorDataService'
    import VendaDataService from '../../services/VendaDataService'
    import VeiculoDataService from '../../services/VeiculoDataService'

    export default {
        name: "addVenda",
        data(){
            return {
                venda: {indice: '', 
                                    valor: 0,
                                    forma_pagamento: '',
                                    comprador: {},                                                                        
                                    vendedor: {},  
                                    veiculos: []},
                submitted: false,
                veiculos: [],
                compradores: [],
                vendedores: []
            }            
        },
        methods: {

            saveVenda(){
                

                var vend = jQuery.extend({}, this.venda);//clona o this.novo_venda e armazena na variavel venda. dessa forma alteracoes em this.novo_venda nao irao refletir em venda.
                var veic = jQuery.extend({}, this.venda.veiculos);//clona o this.novo_venda.veiculo
                var comp = jQuery.extend({}, this.venda.comprador);//clona o this.novo_venda.veiculo    
                var ven = jQuery.extend({}, this.venda.vendedor);//clona o this.novo_venda.veiculo                            
                //vend.veiculos = veic;     
                vend.comprador = comp;
                vend.vendedor = ven;
                vend.vendedor.veiculos = vend.veiculos.id;  
                console.log(this.venda);
                                               

                if (vend.valor.trim().length > 0  ) {
                
                    VendaDataService.create(vend)
                    .then(response => {
                        
                        this.submitted = true;
                    })
                    .catch(e => {                        
                        alert("Erro ao tentar cadastrar venda. !!! " + e.message);

                    })

                }else{
                    alert('Formulário incompleto !!!');
                }

            },
            newVenda(){

                this.submitted = false;
                this.venda = {};
            },
            listVeiculos(){

                VeiculoDataService.list().then(response =>{

                console.log("Retorno do seviço VeiculoDataService.list", response.status);

                for(let v of response.data){

                    this.veiculos.push(v);
                }                  

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

                    this.compradores.push(c);
                }                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço CompradorDataService.list');
                console.log(response);
                });               
            },
            listVendedores(){
                VendedorDataService.list().then(response =>{

                console.log("Retorno do seviço VendedorDataService.list", response.status);

                for(let v of response.data){

                    this.vendedores.push(v);
                }                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço VendedorDataService.list');
                console.log(response);
                });               
            }
        },
        mounted() {                        
            this.listVeiculos();
            this.listCompradores();
            this.listVendedores();
            
         }

    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>