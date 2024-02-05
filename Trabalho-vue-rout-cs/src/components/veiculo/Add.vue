<template>
    <div class="submit-form">
      <div v-if="!submitted">   

        <!-- Input Placa --> 
        <div class="form-group">
                <label for="inputPlaca">Placa:</label>
                <input type="text" v-model="veiculo.placa" class="form-control" id="inputPlaca">
        </div>

        <!-- Input Ano -->
        <div class="form-group">
            <label for="inputAno">Ano:</label>
            <input type="number" v-model="veiculo.ano" class="form-control" id="inputAno">
        </div>

        <!-- Input Cor -->
        <div class="form-group">
            <label for="inputCor">Cor:</label>
            <input type="text" v-model="veiculo.cor" class="form-control" id="inputCor">
        </div>

        <!-- Input Qtd_passageiros -->
        <div class="form-group">
            <label for="inputQtd_passageiros">Qtd Passageiros:</label>
            <input type="number" v-model="veiculo.qtd_passageiros" class="form-control" id="inputQtd_passageiros">
        </div>

        <!-- Input Modelo -->
        <div class="form-group">
            <label for="inputModelo">Modelo:</label>
            <input type="text" v-model="veiculo.modelo" class="form-control" id="inputModelo">
        </div>  

        <!-- Input Marca -->
        <div class="form-group">
            <label for="inputMarca">Marca:</label>
            <input type="text" v-model="veiculo.marca" class="form-control" id="inputMarca">
        </div>  

        <!-- Input Combustivel -->
        <div class="form-group">
            <label for="inputCombustivel">Combustivel:</label>
            <input type="text" v-model="veiculo.combustivel" class="form-control" id="inputCombustivel">
        </div>
        
        <!-- Input Preco -->
        <div class="form-group">
            <label for="inputPreco">Preço:</label>
            <input type="number" v-model="veiculo.preco" class="form-control" id="inputPreco">
        </div> 
        
        <!-- Input Status -->
        <div class="form-group">
            <label for="inputStatus">Status:</label>
            <input type="checkbox" v-model="veiculo.status" class="form-control" id="inputStatus" >
        </div>
        <!-- <div class="form-group">
            <label for="inputStatus">Status:</label>
            <input type="text" v-model="veiculo.status" class="form-control" id="inputStatus" >
        </div> -->

        <div class="form-group">
            <label for="selectTipo">Tipos:</label>
            <select v-model="veiculo.tipo" class="form-control" id="selectTipo">                                
                <option v-for="t in tipos" :key ="t.id" v-bind:value="t">
                    {{ t.descricao }}
                    </option>
            </select>
            
        </div> 
    
  
        <button @click="saveVeiculo" class="btn btn-success">Salvar</button>
        <router-link to="/veiculos" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newVeiculo">Novo</button>
        <router-link to="/veiculos" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import VeiculoDataService from '../../services/VeiculoDataService'
    import TipoDataService from '../../services/TipoDataService'

    export default {
        name: "addVeiculo",
        data(){
            return {
                veiculo: {indice: '', 
                                    placa: '',
                                    ano: 0, 
                                    cor: '',                                                                        
                                    qtd_passageiros: 0,  
                                    modelo: '',
                                    marca: '',
                                    combustivel: '',
                                    preco: 0,
                                    status: 0,
                                    tipo: {}},
                submitted: false,
                tipos: []

            }            
        },
        methods: {

            saveVeiculo(){
                console.log("Clicou no botão salvar Veiculo");

                var v = jQuery.extend({}, this.veiculo);//clona o this.novo_veiculo e armazena na variavel veiculo. dessa forma alteracoes em this.novo_veiculo nao irao refletir em veiculo.                        
                var tip = jQuery.extend({}, this.veiculo.tipo);//clona o this.novo_veiculo.tipo 
                v.tipos = tip;                                                

                if (v.placa.trim().length > 0 && v.ano.trim().length > 0 && 
                v.cor.trim().length > 0 && v.qtd_passageiros.trim().length > 0 && 
                v.modelo.trim().length > 0 && v.marca.trim().length > 0
                && v.combustivel.trim().length > 0 && v.preco.trim().length > 0
                ) {
                
                    VeiculoDataService.create(v)
                    .then(response => {
                        
                        this.submitted = true;
                    })
                    .catch(e => {                        
                        alert("Erro ao tentar cadastrar veiculo. !!! " + e.message);

                    })

                }else{
                    alert('Formulário incompleto !!!');
                }

            },
            newVeiculo(){
                console.log("Entrou no newVeiculo");
                this.submitted = false;
                this.veiculo = {};
            },
            listTipos(){
                TipoDataService.list().then(response =>{

                console.log("Retorno do seviço TipoDataService.list", response.status);

                for(let t of response.data){

                    this.tipos.push(t);
                }                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço TipoDataService.list');
                console.log(response);
                });               
                }
        },
        mounted() {                        
            this.listTipos();
            
         }
        
        
    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>