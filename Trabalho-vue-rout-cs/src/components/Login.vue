<template>
   <div id="tab_aut">
            <h3>Autenticacação</h3>
            <form>
                <div class="form-outline mb-4">
                    <label class="form-label" for="inputCpf">CPF:</label>
                    <input class="form-control" type="number" v-model="vendedor.cpf" id="inputCpf">
                    </div>
                
                <div class="form-outline mb-4">
                    <label class="form-label" for="inputSenha">Senha:</label>
                    <input class="form-control" type="password" v-model="vendedor.password" id="inputSenha">
                </div>
                
                <button class="btn btn-primary" @click='createVendedorForm()' type="button">Autenticar</button>
                <button class="btn btn-primary" @click='clearForm()' type="button">Limpar</button>
            </form>                                      
        </div>
</template>
<script>

    import VendedorDataService from '../services/VendedorDataService'

    export default{
     name:'login',
     data() {
            return {
                vendedor: {cpf: '', password: ''}
            }
        },
        methods: {
            createVendedorForm(){

                console.log('chamou o createVendedorForm');

                const v = {cpf: this.vendedor.cpf,
                           senha: this.vendedor.password
                        }                                    

                VendedorDataService.authenticate(v).then(response =>{

                    console.log("Retorno do seviço authenticate vendedor", response.status);
                    if(response.status == 201 || response.status == 200){

                        alert('Vendedor '+ response.data.cpf + ' authenticate com sucesso');       
                        
                        this.setAuthenticated({cpf: response.data.cpf})
                        
                        this.$router.push({name: "home"});

                    }else if(response.status == 204){

                        alert('Cpf ou senha inválidos ! ');
                    }

                    this.clearForm();
                }
                ).catch(response => {

                    // error callback
                    alert('Não conectou no serviço authenticateVendedor '+ response);
                   // console.log(response);
                });


            },
            clearForm(){
                this.vendedor.cpf = "";
                this.vendedor.password = "";
            },
            setAuthenticated(vendedor){

                localStorage.setItem('authUser', JSON.stringify(vendedor));
                
            }

        }

    }
</script>
   
<style scoped>
    
</style>