import Vue from 'vue'
import VueRouter from 'vue-router'
import cart from './cart'
import address from './address'


Vue.use(VueRouter)


const routes = [
	{
		path : "/",
		component : cart
	},
	{
		path : "/address",
		component : address
	},
	
	
]

var router = new VueRouter ({
	routes
})

export default router;