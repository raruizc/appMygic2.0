<template>
    <div class="Bill">
        <div  v-if="without_data" class = "formBill">
            <h3>Selección Cliente</h3>
            <form v-on:submit.prevent="newBill">
                <input type="text" v-model="bill.seller" placeholder="Id Vendedor">
                <br>
                <input type="text" v-model="bill.client" placeholder="Id Cliente">
                <br>
                <button type="submit">Confirmar</button>
            </form>
        </div>

        <div v-if="without_data" class = "getBill" >
            <h3>Buscar Factura</h3>
            <input type="text" v-model="bill_number" placeholder="Número Factura">
            <br>
            <button v-on:click="getBill">Consultar</button>
            <button v-on:click="getAllBills">Listar</button>
        </div>

        <div v-if="there_data" class="detailBill">
            <h3>Detalle Factura</h3>
            <form v-on:submit.prevent="makeDetail">
                <input type="text" v-model="bill_number" readonly placeholder="Número Factura">
                <br>
                <input type="text" v-model="code_product_details" placeholder="Código Producto">
                <br>
                <input type="text" v-model="quantity_product" placeholder="Cantidad Producto">
                <br>
                <button type="submit">Agregar</button>
            </form>
            <button v-on:click="getProducts">Consultar Productos</button>
            <button v-on:click="returnForm">Volver</button>
        </div>

        <div v-if="showTableProduct" class="table-responsive">
            <table class="table table-hover  table-bordered" id="tableProducts">
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
            <button v-on:click="hideProducts">Ocultar</button>
        </div>

        <div v-if="show_table" class = "tableBill">            
            <input type="text" v-model="totalValue"  readonly placeholder="Total Factura">
            <br>
            <button v-on:click="confirmSale">Confirmar</button>
        </div>

        <div v-if="showTableBill" class="table-responsive">
            <table class="table table-hover  table-bordered" id="tableBills">
                <thead>
                    <tr>                        
                        <th>Número Factura</th>
                        <th>Fecha Factura</th>
                        <th>Vendedor</th>
                        <th>Cliente</th>
                        <th>Valor Total</th>                                                
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(bill, index) in bills" :key="index">
                        <td>{{bill.id}}</td>
                        <td>{{bill.date_bill}}</td>
                        <td>{{bill.seller}}</td>
                        <td>{{bill.client}}</td>
                        <td>{{bill.total_value}}</td>
                    </tr>
                </tbody>
            </table>
            <button v-on:click="hideBills">Ocultar</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:"Bill",
    data:function(){
        return{            
            there_data: false,
            without_data: true,
            show_table: false, 
            showTableBill: false,           
            showTableProduct: false,
            bill_number: "",
            bills: [],
            products: [],
            code_product_details: "",
            quantity_product: "" ,
            totalValue: 0,              
            bill:{
                seller: "",
                client: ""
            }           

        }
    },

    methods:{
        newBill: function(){
            let self = this

            axios.post("http://127.0.0.1:8000/bill/", self.bill, {headers: {}})
                .then((result) => {
                    self.there_data = true
                    self.without_data = false
                    self.bill_number = result.data.id
                    alert("Factura Generada Con Éxito\n Número de Factura: " + self.bill_number)
                    
                })
                .catch((error) => {
                    self.there_data = false
                    self.without_data = true
                    alert("Error: No se pudo agregar correctamente la Factura\n " + error.response.status)
                })

        },
        
        makeDetail: function(){
            var self = this
            let detail_in = {
                bill_number: this.bill_number,
                code_product_details: this.code_product_details,
                quantity_product: this.quantity_product
            }
            axios.put("http://127.0.0.1:8000/detail/", detail_in, {headers: {}})
                .then((result) => {
                    
                    self.totalValue = self.totalValue + result.data.total_value_product                    
                    self.show_table = true
                    
                    alert("Se agregó correctamente el producto: \nCódigo: " + result.data.code_product_details +
                    "\nCantidad: " + result.data.quantity_product +
                    "\nTotal del producto: " + result.data.total_value_product)
                    
                })
                .catch((error) => {
                    
                    self.show_table = false
                    alert("Error: No se pudo agregar correctamente el producto\nCantidad Insuficiente o"+ 
                    "\nCódigo de producto incorrecto" + 
                    "\nError "+ error.response.status)
                })

        },

        confirmSale: function(){
            let self = this
            self.there_data = false
            self.without_data = true
            self.show_table = false
            self.showTableProduct = false
        },

        getBill: function(){
            let self = this

            axios.get("http://127.0.0.1:8000/bill/"+ self.bill_number)
                .then((result) => {
                    self.there_data = true
                    self.without_data = false
                    self.bill_number = result.data.id
                    alert("Se encontró la factura con éxito\n Número de Factura: " + self.bill_number)
                    
                })
                .catch((error) => {
                    self.there_data = false
                    self.without_data = true
                    alert("Error: No se encontró correctamente la Factura\n " + error.response.status)
                })
        },

        getProducts: function(){
            
            let self = this
            axios.get("http://127.0.0.1:8000/product/")
                .then((result) => {
                    self.showTableProduct = true
                    self.without_data = false
                    self.products = result.data                    
                    alert("Tabla Obtenida Correctamente")                   
                    
                })
                .catch((error) => { 
                    self.without_data = true                 
                    alert("ERROR: Vuelva a intentar obtener los datos\n" + error.response.status)
                })
        },

        returnForm:function(){
            this.without_data = true
            this.showTableProduct = false
            this.there_data = false
        },

        hideProducts:function(){
            this.showTableProduct = false
        },

        getAllBills: function(){
            
            let self = this
            axios.get("http://127.0.0.1:8000/bill/")
                .then((result) => {
                    self.showTableBill = true
                    self.bills = result.data
                    self.without_data = false                    
                    alert("Tabla Obtenida Correctamente")                    
                    
                })
                .catch((error) => {                    
                    self.without_data = true
                    alert("ERROR: Vuelva a intentar obtener los datos\n" + error.response.status)
                })
        },

        hideBills:function(){
            this.without_data = true
            this.showTableBill= false
        }        


    }
    
}
</script>

<style>
.Bill{
    margin: 80px 0px;
    padding: 0%;
    height: 100%;
    width: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
}
.formBill{
    
    border: 3px solid  #283747;
    border-radius: 10px;
    width: 25%;
    margin: 20px;
    
        
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.getBill{
    border: 3px solid  #283747;
    border-radius: 10px;
    width: 25%;
    margin: 20px;
    padding: 10px;
    
        
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.detailBill{
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
.tableBill{
    
    border: 3px solid  #283747;
    border-radius: 10px;
    width: 25%;
    padding: 10px;
    margin: 20px;
    
        
    
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

    .Bill h2{
        color: #283747;
        

    }

    .Bill form{
        width: 50%;
        align-items: center;
        
    }

    .Bill input{
        
        width: 100%;

        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;
        text-align: center;
        border: 1px solid #283747;
        
    }

    

    .Bill button{
        width: 100%;
        height: 40px;

        color: #E5E7E9;
        background: rgb(3, 175, 138);
        border: 1px solid #E5E7E9;

        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0;
    }

    .Bill button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }

</style>