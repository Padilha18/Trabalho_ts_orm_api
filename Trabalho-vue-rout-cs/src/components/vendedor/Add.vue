<template>
    <div class="submit-form">
      <div v-if="!submitted">   

        <!-- Input CPF -->
        <div class="form-group">
            <label for="inputCpf">CPF:</label>
            <input type="number" v-model="vendedor.cpf" class="form-control" id="inputCpf">
        </div>

        <!-- Input Nome -->
        <div class="form-group">
                <label for="inputNome">Nome:</label>
                <input type="text" v-model="vendedor.nome" class="form-control" id="inputNome">
        </div>

        <!-- Input dt_nascimento -->
        <div class="form-group">
            <label for="inputDt_nascimento">Data Nascimento:</label>
            <input type="date" v-model="vendedor.dt_nascimento" class="form-control" id="inputDt_nascimento">
        </div>

        <!-- Input Endereco -->
        <div class="form-group">
            <label for="inputEndereco">Endereço:</label>
            <input type="text" v-model="vendedor.endereco" class="form-control" id="inputEndereco">
        </div>

        <!-- Input Telefone -->
        <div class="form-group">
            <label for="inputTelefone">Telefone:</label>
            <input type="text" v-model="vendedor.telefone" class="form-control" id="inputTelefone">
        </div>

        <!-- Input E-mail -->
        <div class="form-group">
            <label for="inputEmail">E-mail:</label>
            <input type="email" v-model="vendedor.email" class="form-control" id="inputEmail">
        </div>  

        <!-- Input Senha -->
        <div class="form-group">
            <label for="inputSenha">Senha:</label>
            <input type="password" v-model="vendedor.senha" class="form-control" id="inputSenha">
        </div>  

        <!-- Input Salário fixo -->
        <div class="form-group">
            <label for="inputSalarioFixo">Salário Fixo:</label>
            <input type="number" v-model="vendedor.salario_fixo" class="form-control" id="inputSalarioFixo">
        </div>
        
        <!-- Input Comissão Venda -->
        <div class="form-group">
            <label for="inputComissaoVenda">Comissão Venda:</label>
            <input type="number" v-model="vendedor.comissao_venda" class="form-control" id="inputComissaoVenda">
        </div>  

        <div class="form-group">
            <label for="selectVeiculo">Veiculos:</label>
            <select v-model="vendedor.veiculo" class="form-control" id="selectVeiculo" multiple>                                
                <option v-for="v in veiculos" :key ="v.id" v-bind:value="v">
                    {{ v.modelo }}
                    </option>
            </select>
            
        </div>     
  
        <button @click="saveVendedor" class="btn btn-success">Salvar</button>
        <router-link to="/vendedores" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newVendedor">Novo</button>
        <router-link to="/vendedores" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import VendedorDataService from '../../services/VendedorDataService'
    import VeiculoDataService from '../../services/VeiculoDataService'

    export default {
        name: "addVendedor",
        data(){
            return {
                vendedor: {indice: '', 
                                    cpf: '', 
                                    nome: '',
                                    dt_nascimento: 0, 
                                    endereco: '',                                                                        
                                    telefone: '',  
                                    email: '',
                                    salario_fixo: 0,
                                    comissao_venda: 0,
                                    senha: '',
                                    veiculo: []},
                submitted: false,
                veiculos: []
            }            
        },
        methods: {

            saveVendedor(){

                var vndor = jQuery.extend({}, this.vendedor);//clona o this.novo_vendedor e armazena na variavel vendedor. dessa forma alteracoes em this.novo_vendedor nao irao refletir em vendedor.
                var veic = jQuery.extend({}, this.vendedor.veiculo);//clona o this.novo_vendedor.endereco                        
                vndor.veiculos = veic; 
                console.log(veic);                                               

                if (vndor.cpf.trim().length > 0 && vndor.nome.trim().length > 0 && 
                vndor.dt_nascimento.trim().length > 0 && vndor.endereco.trim().length > 0 && 
                vndor.telefone.trim().length > 0 && vndor.email.trim().length > 0
                && vndor.salario_fixo.trim().length > 0 && vndor.comissao_venda.trim().length > 0
                && vndor.senha.trim().length > 0  ) {
                
                    VendedorDataService.create(vndor)
                    .then(response => {
                        
                        this.submitted = true; 
                    })
                    .catch(e => {                        
                        alert("Erro ao tentar cadastrar vendedor. !!! " + e.message);

                    })

                }else{
                    alert('Formulário incompleto !!!');
                }

            },
            newVendedor(){

                this.submitted = false;
                this.vendedor = {};
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
            }
        },
        mounted() {                        
            this.listVeiculos();
            
         }

    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>