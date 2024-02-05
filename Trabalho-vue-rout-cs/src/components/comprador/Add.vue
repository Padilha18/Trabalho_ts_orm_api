<template>
    <div class="submit-form">
      <div v-if="!submitted">   

        <!-- Input CPF -->
        <div class="form-group">
            <label for="inputCpf">CPF:</label>
            <input type="number" v-model="comprador.cpf" class="form-control" id="inputCpf">
        </div>

        <!-- Input Nome -->
        <div class="form-group">
                <label for="inputNome">Nome:</label>
                <input type="text" v-model="comprador.nome" class="form-control" id="inputNome">
        </div>

        <!-- Input dt_nascimento -->
        <div class="form-group">
            <label for="inputDt_nascimento">Data Nascimento:</label>
            <input type="date" v-model="comprador.dt_nascimento" class="form-control" id="inputDt_nascimento">
        </div>

        <!-- Input Endereco -->
        <div class="form-group">
            <label for="inputEndereco">Endereço:</label>
            <input type="text" v-model="comprador.endereco" class="form-control" id="inputEndereco">
        </div>

        <!-- Input Telefone -->
        <div class="form-group">
            <label for="inputTelefone">Telefone:</label>
            <input type="text" v-model="comprador.telefone" class="form-control" id="inputTelefone">
        </div>

        <!-- Input E-mail -->
        <div class="form-group">
            <label for="inputEmail">E-mail:</label>
            <input type="email" v-model="comprador.email" class="form-control" id="inputEmail">
        </div>

        <!-- Input Limite de Credito -->
        <div class="form-group">
            <label for="inputLimiteCredito">Limite de Crédito:</label>
            <input type="number" v-model="comprador.limite_credito" class="form-control" id="inputLimiteCredito">
        </div>
        
        <!-- Input Número de Compras -->
        <div class="form-group">
            <label for="inputNumCompras">Número de Compras:</label>
            <input type="number" v-model="comprador.numero_compras" class="form-control" id="inputNumCompras">
        </div>       
  
        <button @click="saveComprador" class="btn btn-success">Salvar</button>
        <router-link to="/compradores" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newComprador">Novo</button>
        <router-link to="/compradores" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import CompradorDataService from '../../services/CompradorDataService'

    export default {
        name: "addComprador",
        data(){
            return {
                comprador: {indice: '', 
                                    cpf: '', 
                                    nome: '',
                                    dt_nascimento: 0, 
                                    endereco: '',                                                                        
                                    telefone: '',  
                                    email: '',
                                    limite_credito: 0,
                                    numero_compras: 0,
                                    },
                submitted: false,
                //veiculos: []
            }            
        },
        methods: {

            saveComprador(){

                var c = jQuery.extend({}, this.comprador);//clona o this.novo_comprador e armazena na variavel comprador. dessa forma alteracoes em this.novo_comprador nao irao refletir em comprador.                        
                //vndor.veiculo = veic;                                                

                if (c.cpf.trim().length > 0 && c.nome.trim().length > 0 && 
                c.dt_nascimento.trim().length > 0 && c.endereco.trim().length > 0 && 
                c.telefone.trim().length > 0 && c.email.trim().length > 0
                && c.limite_credito.trim().length > 0 && c.numero_compras.trim().length > 0 ) {
                
                    CompradorDataService.create(c)
                    .then(response => {
                        
                        this.submitted = true;
                    })
                    .catch(e => {                        
                        alert("Erro ao tentar cadastrar comprador. !!! " + e.message);

                    })

                }else{
                    alert('Formulário incompleto !!!');
                }

            },
            newComprador(){

                this.submitted = false;
                this.comprador = {};
            },
            
        },

    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>