import App from '../App'
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default[  
 	{path: '/goods',component: require('../page/goods')},
 	{path: '/ratings',component: require('../page/ratings')},
 	{path: '/store',component: require('../page/store')},
 	{path:'*',redirect:'/goods'},
]




