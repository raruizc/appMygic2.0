<template>
  <div id="app" class = "app">
    <div class="header">
        <h1>Mygic</h1>
        <nav>
          <button v-on:click="init" v-if="is_auth"> Inicio </button>
          <button v-on:click="manageClients" v-if="is_auth"> Clientes </button>
          <button v-on:click="manageEmployees" v-if="is_auth"> Empleados </button>
          <button v-on:click="manageProducts" v-if="is_auth"> Productos </button>
          <button v-on:click="makeSale" v-if="is_auth"> Ventas </button>
          <button v-on:click="logOut" v-if="is_auth"> Cerrar Sesión </button>
        </nav>
    </div>

    <div class="main">
      <router-view v-on:log-in="logIn" > </router-view>
    </div>

    <div class="footer">
      <h2>Ricardo Antonio Ruiz Cardozo</h2>      
    </div>

    
  </div>
</template>

<script>
import vueRouter from 'vue-router'

export default {
  name: 'App',

  components: {
  },

  data:function(){
    return{
      is_auth: localStorage.getItem('isAuth') || false
    }
  },

  methods:{
    updateAuth: function(){
      var self = this
      self.is_auth  = localStorage.getItem('isAuth') || false

      if(self.is_auth == false)
        self.$router.push({name: "user_auth"})
      
        
      else{
        self.$router.push({name: "home"})
      }

    },

    logIn: function(username){
      localStorage.setItem('isAuth', true)
      this.updateAuth()
    },

    logOut: function(){
      localStorage.removeItem('isAuth')
      this.updateAuth()
    },

    init: function(){
      if(this.$route.name != 'home'){
        this.$router.push({name: "home"})
      }
    },
    manageClients: function(){
      if(this.$route.name != 'client'){
        this.$router.push({name: "client"})
      }
    },
    manageEmployees: function(){
      if(this.$route.name != 'employee'){
        this.$router.push({name: "employee"})
      }
    },
    manageProducts: function(){
      if(this.$route.name != 'product'){
        this.$router.push({name: "product"})
      }
    },
    makeSale: function(){
      if(this.$route.name != 'bill'){
        this.$router.push({name: "bill"})
      }
    }

  },

  created: function(){
    this.$router.push({name: "home"})
    this.updateAuth()
  }
  
}
</script>

<style>
  body{
    margin: 0 0 0 0;
  }

  .header{
    margin: 0%;
    padding: 0;
    width: 100%;
    height: 10vh; 
    min-height: 100px;

    background-image: linear-gradient(to bottom right, rgb(3, 175, 138) 10%, #283747 100%);
    background-color: #283747 ;
    color:#E5E7E9  ;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header h1{
    width: 20%;
    text-align: center;
  }

  .header nav {
    height: 100%;
    width: 40%;

    display: flex;
    justify-content: space-around;
    align-items: center;

    margin-right: 140px;

    font-size: 20px;
  }

  .header nav button{
    color: #E5E7E9;
    background: rgb(75, 121, 111);
    border: 1px solid #E5E7E9;
    margin: 10px;
    font-size: 1rem;
    

    border-radius: 5px;
    padding: 10px 20px;

  }

  .header nav button:hover{
    color: #283747;
    background: #E5E7E9;
    border: 1px solid #E5E7E9;
  }

  
  .main{
    /*height: 120vh;*/
    margin: 0%;
    padding: 0%;

    background: #FDFEFE ;
  }

 
  .footer{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 10vh;
    min-height: 50px; 

    background-image: linear-gradient(to bottom right, #283747 10%, rgb(3, 175, 138) 100%);
    background-color: #283747;
    color: #E5E7E9;

  }

  .footer h2{
    width: 100%;
    height: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
