<template>
    <div class="submit-form">
      <div v-if="!submitted">   

        <!-- Input ID -->
        <div class="form-group">
            <label for="inputId">ID:</label>
            <input type="number" v-model="tipo.id" class="form-control" id="inputId"  disabled>
        </div>

        <!-- Input descricao -->
        <div class="form-group">
                <label for="inputDescricao">Descrição:</label>
                <input type="text" v-model="tipo.descricao" class="form-control" id="inputDescricao">
        </div>    
  
        <button @click="saveTipo" class="btn btn-success">Salvar</button>
        <router-link to="/Tipos" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newTipo">Novo</button>
        <router-link to="/Tipos" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import TipoDataService from '../../services/TipoDataService'

    export default {
        name: "addTipo",
        data(){
            return {
                tipo: {indice: '', 
                                    id: 0, 
                                    descricao: '',
                                    },
                submitted: false,
            }            
        },
        methods: {

            saveTipo(){

                var tip = jQuery.extend({}, this.tipo);//clona o this.novo_tipo e armazena na variavel tipo. dessa forma alteracoes em this.novo_tipo nao irao refletir em tipo.                      
                //vndor.veiculo = veic;                                                

                if (tip.descricao.trim().length > 0 ) {
                
                    TipoDataService.create(tip)
                    .then(response => {
                        
                        this.submitted = true;
                    })
                    .catch(e => {                        
                        alert("Erro ao tentar cadastrar tipo. !!! " + e.message);

                    })

                }else{
                    alert('Formulário incompleto !!!');
                }

            },
            newTipo(){

                this.submitted = false;
                this.tipo = {};
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