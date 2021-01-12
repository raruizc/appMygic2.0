<template>
    <div class="Product">
        <div v-if="without_data" class="formProduct">
            <h2> Nuevo Producto </h2>
            <form v-on:submit.prevent="newProduct">
                <input type="text" v-model="product.code_product" placeholder="Código Producto">
                <br>
                <input type="text" v-model="product.name_product" placeholder="Nombre Producto">
                <br>
                <input type="text" v-model="product.reference_product" placeholder="Referencia Producto">
                <br>
                <input type="text" v-model="product.description_product" placeholder="Descripción Producto">
                <br>
                <input type="text" v-model="product.quantity_available" placeholder="Cantidad Disponible">
                <br>
                <input type="text" v-model="product.price_producto" placeholder="Precio Producto">
                <br>                             
                <button type="submit">Confirmar</button>
            </form>
        </div>
        <div class="getProduct" v-if="without_data"> 
            <h2>Consultar Producto</h2>
            <input type="text" v-model="codeProduct" placeholder="Identificación">
            <br>
            <button v-on:click="getProduct">Consultar</button>
            <button v-on:click="getAllProducts">Listar</button>
        </div>
        
        <div v-if="there_data" class="informationProduct">
            <h2 >Información</h2>
            <input type="text" v-model="product.code_product" placeholder="Código Producto">
            <br>
            <input type="text" v-model="product.name_product" placeholder="Nombre Producto">
            <br>
            <input type="text" v-model="product.reference_product" placeholder="Referencia Producto">
            <br>
            <input type="text" v-model="product.description_product" placeholder="Descripción Producto">
            <br>
            <input type="text" v-model="product.quantity_available" placeholder="Cantidad Disponible">
            <br>
            <input type="text" v-model="product.price_producto" placeholder="Precio Producto">
            <br>   
            <button v-on:click="updateProduct" v-if="there_data">Modificar</button>
            <button v-on:click="deleteProduct" v-if="there_data">Eliminar</button>
            <button v-on:click="returnForm">Volver</button>
        </div>

        <div v-if="showTable" class="table-responsive">
            <table class="table table-hover  table-bordered" id="tableProduct">
                <thead>
                    <tr>
                        
                        <th>Código</th>
                        <th>Nombre de Producto</th>
                        <th>Referencia</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio</th>                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in products" :key="index">
                        <td>{{product.code_product}}</td>
                        <td>{{product.name_product}}</td>
                        <td>{{product.reference_product}}</td>
                        <td>{{product.description_product}}</td>
                        <td>{{product.quantity_available}}</td>
                        <td>{{product.price_producto}}</td>
                        
                        
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
    name:"Product",
    data: function(){
        return{
            codeProduct: "",
            there_data: false,
            without_data: true,
            showTable: false,
            products: [],
            product:{
                code_product: "",
                name_product: "",
                reference_product: "",
                description_product: "",
                quantity_available: "",
                price_producto: ""
            }
        }
    },

    methods:{
        newProduct: function(){
            let self = this

            axios.post("http://127.0.0.1:8000/product/", self.product, {headers: {}})
                .then((result) => {
                    alert("Producto Agregado")
                })
                .catch((error) => {
                    alert("Error: No se pudo agregar correctamente el Producto\n" + error.response.status)
                })
        },

        getProduct: function(){
            let self = this

            axios.get("http://127.0.0.1:8000/product/" + self.codeProduct)
                .then((result) => {
                    self.product.code_product = result.data.code_product
                    self.product.name_product = result.data.name_product
                    self.product.reference_product = result.data.reference_product
                    self.product.description_product = result.data.description_product
                    self.product.quantity_available = result.data.quantity_available
                    self.product.price_producto = result.data.price_producto
                    self.there_data = true
                    self.without_data = false
                    alert("Código Producto: " + self.product.code_product +
                    "\nNombre: " + self.product.name_product + 
                    "\nCantidad:" + self.product.quantity_available )
                })
                .catch((error) => {
                    self.there_data = false
                    self.without_data = true,
                    alert("ERROR: No se encuentra el Producto\n" + error.response.status)
                })
        },

        updateProduct: function(){
            let self = this

            axios.put("http://127.0.0.1:8000/product/", self.product, {headers: {}})
                .then((result) => {
                    alert("Producto Actualizado Correctamente")
                    self.there_data = false
                    self.without_data = true
                })
                .catch((error) => {
                    alert("Error: No se pudo actualizar correctamente el producto\n" + error.response.status)
                })
        },

        deleteProduct: function(){
            let self = this

            axios.delete("http://127.0.0.1:8000/product/" + self.codeProduct)
                .then((result) => {
                    self.product.code_product = result.data.code_product
                    self.product.name_product = result.data.name_product
                    self.product.reference_product = result.data.reference_product
                    self.product.description_product = result.data.description_product
                    self.product.quantity_available = result.data.quantity_available
                    self.product.price_producto = result.data.price_producto
                    self.there_data = false
                    self.without_data = true
                    alert("Se ha eliminado correctamente el producto: \nCódigo Producto: " + self.product.code_product +
                    "\nNombre: " + self.product.name_product + 
                    "\nCantidad:" + self.product.quantity_available )
                })
                .catch((error) => {
                    self.there_data = true 
                    self.without_data = false,
                    alert("ERROR: No se encuentra el producto\n" + error.response.status)
                })
        },

        /*table(){
            this.$nextTick(() =>{
                $('#tableProduct').DataTable();
            })
        },*/    
          

        getAllProducts: function(){
            
            let self = this
            axios.get("http://127.0.0.1:8000/product/")
                .then((result) => {
                    self.showTable = true
                    self.products = result.data
                    
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
.Product{
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
}
.formProduct{
    
    border: 3px solid  #283747;
    border-radius: 10px;
    width: 25%;
    margin: 10px;
    
        
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.getProduct{
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
.informationProduct{
    
    border: 3px solid  #283747;
    border-radius: 10px;
    width: 25%;
    padding: 10px;
    margin: 10px;
    
        
    
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

    .Product h2{
        color: #283747;
        

    }

    .Product form{
        width: 50%;
        align-items: center;
        
    }

    .Product input{
        
        width: 100%;

        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;
        text-align: center;
        border: 1px solid #283747;
        
    }

    

    .Product button{
        width: 100%;
        height: 40px;

        color: #E5E7E9;
        
        background:  rgb(3, 175, 138);
        border: 1px solid #E5E7E9;

        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0;
    }

    .Product button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }
</style>


