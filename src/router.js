import vueRouter from 'vue-router'
import App from './App'
import UserAuth from './components/UserAuth'
import Home from './components/Home'
import Client from './components/Client'
import Employee from "./components/Employee"
import Product from './components/Product'
import Bill from './components/Bill'


const router = new vueRouter({
        mode: 'history',
        base: __dirname,
        routes:[
            {
                path: '/',
                name: "root",
                component: App
            },
            {
                path: '/user/auth',
                name: 'user_auth',
                component: UserAuth
            },
            {
                path: "/home/",
                name: 'home',
                component: Home
            },
            {
                path: '/client/',
                name: 'client',
                component: Client
            },
            {
                path: '/employee/',
                name: 'employee',
                component: Employee
            },
            {
                path: '/product/',
                name: 'product',
                component: Product
            },
            {
                path: '/bill/',
                name: 'bill',
                component: Bill
            }
        ]
    }
)

export default router