<template>
    <div class="Employee">
        <div v-if="without_data" class="formEmployee">
            <h2> Nuevo Empleado </h2>
            <form v-on:submit.prevent="newEmployee">
                <input type="text" v-model="employee.id_employee" placeholder="Identificación">
                <br>
                <input type="text" v-model="employee.type_document" placeholder="Tipo de Documento">
                <br>
                <input type="text" v-model="employee.name_employee" placeholder="Nombre Empleado">
                <br>
                <input type="text" v-model="employee.surname_employee" placeholder="Apellido Empleado">
                <br>
                <input type="text" v-model="employee.address_employee" placeholder="Dirección">
                <br>
                <input type="text" v-model="employee.phone_employee" placeholder="Teléfono">
                <br>
                <input type="text" v-model="employee.email_employee" placeholder="Correo Electrónico">
                <br>
                <input type="text" v-model="employee.charge_employee" placeholder="Cargo">
                <br>
                <input type="text" v-model="employee.salary" placeholder="Salario">
                <br>
                <button type="submit">Confirmar</button>
            </form>
        </div>
        <div v-if="without_data" class="getEmployee"> 
            <h3>Consultar Empleado</h3>
            <input type="text" v-model="idEmployee" placeholder="Identificación">
            <br>
            <button v-on:click="getEmployee">Consultar</button>
            <button v-on:click="getAllEmployees">Listar</button>
        </div>
        
        <div v-if="there_data" class="informationEmployee">
            <h2 >Información</h2>
            <input  v-if="there_data" type="text" v-model="employee.id_employee" readonly placeholder="Identificación">
            <br>
            <input v-if="there_data" type="text" v-model="employee.type_document" placeholder="Tipo Documento">
            <br>
            <input v-if="there_data" type="text" v-model="employee.name_employee" placeholder="Nombre Empleado"> 
            <br>
            <input v-if="there_data" type="text" v-model="employee.surname_employee" placeholder="Apellido Empleado">
            <br>
            <input v-if="there_data" type="text" v-model="employee.address_employee" placeholder="Dirección">
            <br>
            <input v-if="there_data" type="text" v-model="employee.phone_employee" placeholder="Teléfono">
            <br>
            <input v-if="there_data" type="text" v-model="employee.email_employee" placeholder="Correo Electrónico">
            <br>
            <input v-if="there_data" type="text" v-model="employee.charge_employee" placeholder="Cargo">
            <br>
            <input v-if="there_data" type="text" v-model="employee.salary" placeholder="Salario">
            <br>
            <button v-on:click="updateEmployee" v-if="there_data">Modificar</button>
            <button v-on:click="deleteEmployee" v-if="there_data">Eliminar</button>
            <button v-on:click="returnForm">Volver</button>
        </div>

        <div v-if="showTable" class="table-responsive">
            <table class="table table-hover  table-bordered" id="tableEmployees">
                <thead>
                    <tr>
                        <th>Identificación</th>
                        <th>Tipo de Documento</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>E-mail</th>
                        <th>Cargo</th>
                        <th>Salario</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(employ, index) in employees" :key="index">
                        <td>{{employ.id_employee}}</td>
                        <td>{{employ.type_document}}</td>
                        <td>{{employ.name_employee}}</td>
                        <td>{{employ.surname_employee}}</td>
                        <td>{{employ.address_employee}}</td>
                        <td>{{employ.phone_employee}}</td>
                        <td>{{employ.email_employee}}</td>
                        <td>{{employ.charge_employee}}</td>
                        <td>{{employ.salary}}</td>
                    </tr>
                </tbody>
            </table>
            <button v-on:click="returnForm">Volver</button>
        </div>

    </div>
    
</template>

<script>
import axios from 'axios';
import datatable from 'datatables.net-bs4';

export default {
    name:"Employee",
    data: function(){
        return{
            idEmployee: "",
            there_data: false,
            without_data: true,
            showTable: false,
            employees: [],
            employee:{
                id_employee: "",
                type_document: "",
                name_employee: "",
                surname_employee: "",
                address_employee: "",
                phone_employee: "",
                email_employee: "",
                charge_employee: "",
                salary: ""
            }
        }
    },

    methods:{
        newEmployee: function(){
            let self = this

            axios.post("http://127.0.0.1:8000/employee/", self.employee, {headers: {}})
                .then((result) => {
                    alert("Empleado Agregado")
                })
                .catch((error) => {
                    alert("Error: No se pudo agregar correctamente el Empleado\n" + error.response.status)
                })
        },

        getEmployee: function(){
            let self = this

            axios.get("http://127.0.0.1:8000/employee/" + self.idEmployee)
                .then((result) => {
                    self.employee.id_employee = result.data.id_employee
                    self.employee.type_document = result.data.type_document
                    self.employee.name_employee = result.data.name_employee
                    self.employee.surname_employee = result.data.surname_employee
                    self.employee.address_employee = result.data.address_employee
                    self.employee.phone_employee = result.data.phone_employee
                    self.employee.email_employee = result.data.email_employee
                    self.employee.charge_employee = result.data.charge_employee
                    self.employee.salary = result.data.salary
                    self.there_data = true
                    self.without_data = false
                    alert("Identificación: " + self.employee.id_employee +
                    "\nNombre: " + self.employee.name_employee + 
                    "\nApellido:" + self.employee.surname_employee )
                })
                .catch((error) => {
                    self.there_data = false
                    self.without_data = true,
                    alert("ERROR: No se encuentra el Empleado\n" + error.response.status)
                })
        },

        updateEmployee: function(){
            let self = this

            axios.put("http://127.0.0.1:8000/employee/", self.employee, {headers: {}})
                .then((result) => {
                    alert("Empleado Actualizado Correctamente")
                    self.there_data = false
                    self.without_data = true
                })
                .catch((error) => {
                    alert("Error: No se pudo actualizar correctamente el Empleado\n" + error.response.status)
                })
        },

        deleteEmployee: function(){
            let self = this

            axios.delete("http://127.0.0.1:8000/employee/" + self.idEmployee)
                .then((result) => {
                    self.employee.id_employee = result.data.id_employee
                    self.employee.type_document = result.data.type_document
                    self.employee.name_employee = result.data.name_employee
                    self.employee.surname_employee = result.data.surname_employee
                    self.employee.address_employee = result.data.address_employee
                    self.employee.phone_employee = result.data.phone_employee
                    self.employee.email_employee = result.data.email_employee
                    self.employee.charge_employee = result.data.charge_employee
                    self.employee.salary = result.data.salary
                    self.there_data = false
                    self.without_data = true
                    alert("Se ha eliminado correctamente el empleado: \nIdentificación: " + self.employee.id_employee +
                    "\nNombre: " + self.employee.name_employee + 
                    "\nApellido:" + self.employee.surname_employee )
                })
                .catch((error) => {
                    self.there_data = true 
                    self.without_data = false,
                    alert("ERROR: No se encuentra el empleado\n" + error.response.status)
                })
        },

        /*table(){
            this.$nextTick(() =>{
                $('#tableEmployees').DataTable();
            })
        },*/    
          

        getAllEmployees: function(){
            
            let self = this
            axios.get("http://127.0.0.1:8000/employee/")
                .then((result) => {
                    self.showTable = true
                    self.employees = result.data
                   
                    alert("Tabla Obtenida Correctamente")
                    
                    self.without_data = false
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
.Employee{
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
}
.formEmployee{
    
    border: 3px solid  #283747;
    border-radius: 10px;
    width: 25%;
    margin: 20px;
    
        
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.getEmployee{
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
.informationEmployee{
    
    border: 3px solid  #283747;
    border-radius: 10px;
    width: 25%;
    padding: 10px;
    margin: 20px;
    
        
    
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

    .Employee h2{
        color: #283747;
        

    }

    .Employee form{
        width: 50%;
        align-items: center;
        
    }

    .Employee input{
        
        width: 100%;

        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;
        text-align: center;
        border: 1px solid #283747;
        
    }

    

    .Employee button{
        width: 100%;
        height: 40px;

        color: #E5E7E9;
        background: rgb(3, 175, 138);
        border: 1px solid #E5E7E9;

        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0;
    }

    .Employee button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }
</style>