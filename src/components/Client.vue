<template>
    <div class="Client">
        <div v-if="without_data" class="formClient">
            <h2> Nuevo Cliente </h2>
            <form v-on:submit.prevent="newClient">
                <input type="text" v-model="client.id_client" placeholder="Identificación">
                <br>
                <input type="text" v-model="client.type_document" placeholder="Tipo de Documento">
                <br>
                <input type="text" v-model="client.name_client" placeholder="Nombre Cliente">
                <br>
                <input type="text" v-model="client.surname_client" placeholder="Apellido Cliente">
                <br>
                <input type="text" v-model="client.address_client" placeholder="Dirección">
                <br>
                <input type="text" v-model="client.phone_client" placeholder="Teléfono">
                <br>
                <input type="text" v-model="client.email_client" placeholder="Correo Electrónico">
                <br>
                <button type="submit">Confirmar</button>
            </form>
        </div>
        <div v-if="without_data" class="getClient"> 
            <h2>Consultar Cliente</h2>
            <input type="text" v-model="idClient" placeholder="Identificación">
            <br>
            <button v-on:click="getClient">Consultar</button>
            <button v-on:click="getAllClients">Listar</button>
            <!---<form v-on:submit.prevent="getClient">
                <input type="text" v-model="idClient" placeholder="Identificación">
                <br>
                <button type="submit">Consultar</button>
            </form>--->
        </div>

        <div v-if="there_data" class="information">
            <h2 >Información</h2>
            <input  v-if="there_data" type="text" v-model="client.id_client" readonly placeholder="Identificación">
            <br>
            <input v-if="there_data" type="text" v-model="client.type_document" placeholder="Tipo Documento">
            <br>
            <input v-if="there_data" type="text" v-model="client.name_client" placeholder="Nombre Cliente"> 
            <br>
            <input v-if="there_data" type="text" v-model="client.surname_client" placeholder="Apellido Cliente">
            <br>
            <input v-if="there_data" type="text" v-model="client.address_client" placeholder="Dirección">
            <br>
            <input v-if="there_data" type="text" v-model="client.phone_client" placeholder="Teléfono">
            <br>
            <input v-if="there_data" type="text" v-model="client.email_client" placeholder="Correo Electrónico">

            <!--<p v-if="hay_datos"><span>Identificación: </span> <input  type="text" v-model="client.id_client" readonly></p>
            <p v-if="hay_datos"><span>Tipo de Documento: </span> <input type="text" v-model="client.type_document" ></p>
            <p v-if="hay_datos"><span>Nombre Cliente: </span> <input type="text" v-model="client.name_client" ></p>
            <p v-if="hay_datos"><span>Apellido Cliente: </span> <input type="text" v-model="client.surname_client" ></p>
            <p v-if="hay_datos"><span>Dirección: </span> <input type="text" v-model="client.address_client" ></p>
            <p v-if="hay_datos"><span>Teléfono: </span> <input type="text" v-model="client.phone_client" ></p>
            <p v-if="hay_datos"><span>Correo Electrónico: </span> <input type="text" v-model="client.email_client" ></p>
            --->
            <button v-on:click="updateClient" v-if="there_data">Modificar</button>
            <button v-on:click="deleteClient" v-if="there_data">Eliminar</button>
            <button v-on:click="returnForm">Volver</button>
            
        </div>

        <div v-if="showTable" class="table-responsive">
            
            <table class="table table-hover  table-bordered" id="tableClients">
                <thead>
                    <tr>
                        <th>Identificación</th>
                        <th>Tipo de Documento</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>E-mail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(clientes, index) in clients" :key="index">
                        <td>{{clientes.id_client}}</td>
                        <td>{{clientes.type_document}}</td>
                        <td>{{clientes.name_client}}</td>
                        <td>{{clientes.surname_client}}</td>
                        <td>{{clientes.address_client}}</td>
                        <td>{{clientes.phone_client}}</td>
                        <td>{{clientes.email_client}}</td>
                    </tr>
                </tbody>
            </table>
            <button v-on:click="returnForm">Volver</button>
        </div>

    </div>
</template>


<script>
import axios from 'axios';
import datatable from 'datatables.net';

export default {
    name:"Client",    
    data:function(){
        return{
            idClient:"",
            there_data: false,
            without_data: true,
            showTable: false,
            clients: [],
            client:{
                id_client: "",
                type_document: "",
                name_client: "",
                surname_client: "",
                address_client: "",
                phone_client: "",
                email_client: ""
            }
        }
    },
    
    methods:{
        newClient: function(){
            let self = this

            axios.post("http://127.0.0.1:8000/client/", self.client, {headers: {}})
                .then((result) => {
                    alert("Cliente Agregado")
                })
                .catch((error) => {
                    alert("Error: No se pudo agregar correctamente el cliente\n" + error.response.status)
                })
        },

        getClient: function(){
            let self = this

            axios.get("http://127.0.0.1:8000/client/" + self.idClient)
                .then((result) => {
                    self.client.id_client = result.data.id_client
                    self.client.type_document = result.data.type_document
                    self.client.name_client = result.data.name_client
                    self.client.surname_client = result.data.surname_client
                    self.client.address_client = result.data.address_client
                    self.client.phone_client = result.data.phone_client
                    self.client.email_client = result.data.email_client
                    self.there_data = true
                    self.without_data = false
                    alert("Identificación: " + self.client.id_client +
                    "\nNombre: " + self.client.name_client + 
                    "\nApellido:" + self.client.surname_client )
                })
                .catch((error) => {
                    self.there_data = false
                    self.without_data = true,
                    alert("ERROR: No se encuentra el cliente\n" + error.response.status)
                })
        },

        updateClient: function(){
            let self = this

            axios.put("http://127.0.0.1:8000/client/", self.client, {headers: {}})
                .then((result) => {
                    alert("Cliente Actualizado Correctamente")
                    self.there_data = false
                    self.without_data = true
                })
                .catch((error) => {
                    self.there_data = true
                    self.without_data = false
                    alert("ERROR: Vuelva a intentar actualizar el cliente\n" + error.response.status)
                })
        },

        deleteClient: function(){
            let self = this

            axios.delete("http://127.0.0.1:8000/client/" + self.idClient)
                .then((result) => {
                    self.client.id_client = result.data.id_client
                    self.client.type_document = result.data.type_document
                    self.client.name_client = result.data.name_client
                    self.client.surname_client = result.data.surname_client
                    self.client.address_client = result.data.address_client
                    self.client.phone_client = result.data.phone_client
                    self.client.email_client = result.data.email_client
                    self.there_data = false
                    self.without_data = true
                    alert("Se ha eliminado correctamente el cliente: \nIdentificación: " + self.client.id_client +
                    "\nNombre: " + self.client.name_client + 
                    "\nApellido:" + self.client.surname_client )
                })
                .catch((error) => {
                    self.there_data = true
                    self.without_data = false
                    alert("ERROR: No se encuentra el producto")
                })
        },

        /*myTable(){
            $(function(){
                $('#tableClients').DataTable();
            });
        },*/    
          

        getAllClients: function(){
            
            let self = this
            axios.get("http://127.0.0.1:8000/client/")
                .then((result) => {
                    self.showTable = true
                    self.clients = result.data
                    self.without_data = false
                    alert("Tabla Obtenida Correctamente")
                                     
                    
                })
                .catch((error) => {                    
                    self.without_data = true
                    alert("ERROR: Vuelva a intentar obtener los datos\n" + error.response.status)
                })
        },

        returnForm:function(){
            this.without_data = true
            this.showTable = false
            this.there_data = false
        }



    }

}
</script>

<style>
.Client{
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
}
.formClient{
    
    border: 3px solid  #283747;
    border-radius: 10px;
    width: 35%;
    margin: 20px;
    padding: 10px;
    
        
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.getClient{
    border: 3px solid  #283747;
    border-radius: 10px;
    width: 25%;
    height: 60%;
    padding: 10px;
        
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.information{
    
    border: 3px solid  #283747;
    border-radius: 10px;
    width: 25%;
    padding: 10px;
    margin: 20px;
    
        
    
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.table{
    border: 3px solid  #283747;
    border-radius: 10px;
    
    padding: 10px;
    margin: 20px;  
        
    
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

    .Client h2{
        color: #283747;
        

    }

    .Client form{
        width: 50%;
        align-items: center;
        
    }

    .Client input{
        
        width: 100%;

        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;
        text-align: center;
        border: 1px solid #283747;
        
    }

    

    .Client button{
        width: 100%;
        height: 40px;

        color: #E5E7E9;
        background: rgb(3, 175, 138);
        border: 1px solid #E5E7E9;

        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0;
    }

    .Client button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }
</style>