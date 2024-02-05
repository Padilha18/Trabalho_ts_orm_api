import Vue from 'vue'
import Router from 'vue-router'

import login from  '@/components/Login'
import home from  '@/components/Home'

//Vendedor
import listVendedores from '@/components/vendedor/List'
import editVendedor from '@/components/vendedor/Edit'
import novoVendedor from '@/components/vendedor/Add'

//Comprador
import listCompradores from '@/components/comprador/List'
import editComprador from '@/components/comprador/Edit'
import novoComprador from '@/components/comprador/Add'

//Veiculo
import listVeiculos from '@/components/veiculo/List'
import editVeiculo from '@/components/veiculo/Edit'
import novoVeiculo from '@/components/veiculo/Add'

//Venda
import listVendas from '@/components/venda/List'
import editVenda from '@/components/venda/Edit'
import novoVenda from '@/components/venda/Add'

//Tipo
import listTipos from '@/components/tipo/List'
import editTipo from '@/components/tipo/Edit'
import novoTipo from '@/components/tipo/Add'



Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/vendedor/login',
      name: 'login',
      component: login
    },
   
    //Vendedor
    {
      path: '/vendedores',
      name: 'vendedores-list',
      component: listVendedores    
    },
    {
      path: '/vendedor/update/:cpf',
      name: "vendedor-edit",
      component: editVendedor
    },
    {
      path: '/addVendedor',
      name: "vendedor-add",
      component: novoVendedor
    },

    
    //Comprador
    {
      path: '/compradores',
      name: 'compradores-list',
      component: listCompradores    
    },
    {
      path: '/comprador/update/:cpf',
      name: "comprador-edit",
      component: editComprador
    },
    {
      path: '/addComprador',
      name: "comprador-add",
      component: novoComprador
    },


    //Veiculo
    {
      path: '/Veiculos',
      name: 'veiculos-list',
      component: listVeiculos   
    },
    {
      path: '/veiculo/update/:id',
      name: "veiculo-edit",
      component: editVeiculo
    },
    {
      path: '/addVeiculo',
      name: "veiculo-add",
      component: novoVeiculo
    },

    //Venda
    {
      path: '/vendas',
      name: 'vendas-list',
      component: listVendas    
    },
    {
      path: '/venda/update/:id',
      name: "venda-edit",
      component: editVenda
    },
    {
      path: '/addVenda',
      name: "venda-add",
      component: novoVenda
    },


    //Tipo
    {
      path: '/tipos',
      name: 'tipos-list',
      component: listTipos    
    },
    {
      path: '/tipo/:id',
      name: "tipos-edit",
      component: editTipo
    },
    {
      path: '/addTipo',
      name: "tipo-add",
      component: novoTipo
    },

    
    
  ]
})

router.beforeEach((to, from, next) => {
    
  if (to.name !== 'login' && !localStorage.getItem('authUser')){
     next({name: 'login'})
  } else {
     next()
  }
  
})

export default router;