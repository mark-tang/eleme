<template>
	<div class="cart_deal">	
		<transition name="fade">
	        <div class="cart_decrease" @click.stop.prevent="minusGoods($event)" v-show="food.count>0">
	          <transition name="inner">
	          <i class="icon-minus"></i>
	          </transition>
	        </div>
	    </transition>    
		<span v-show="food.count">{{food.count}}</span>
		<i class="icon-add" @click.stop.prevent="addGoods($event)"></i>		
	</div>
</template>
<script>	
	import Vue from 'vue';
	export default{
		props:{
			food:{
				type:Object
			}
		},		
		methods:{
			addGoods(event){		
		        if (!this.food.count) {		        
		          Vue.set(this.food, 'count', 1);
		        } else {				
		          this.food.count ++;

		        }
				
			},
			minusGoods(event){				
		        	if(this.food.count>0){
		       		 this.food.count--;
		        	}
			},
		}
	}
</script>
<style lang="scss" scoped>	
	.cart_deal{
		position: absolute; 
		right: 0;
		bottom: 6px; 
		span{ 			
			width: 22px; 
			margin: 0 3px; 
			display: inline-block;			
			font-size: 10px; 			
			vertical-align: middle; 
			text-align: center;}
		i{
			width: 24px; 
			height: 24px;			 
			display: inline-block; 
			vertical-align: middle;
			cursor: pointer; 
			&.icon-minus{ background: url('../../assets/img/icon-minus.png') no-repeat center center; }
			&.icon-add{  background: url('../../assets/img/icon-add.png') no-repeat center center;display:inline-block;margin: 4px 0px 6px 0px; }
		}
	}

	.cart_decrease{
		display:inline-block;
		margin: 4px 0px 6px 0px; 
		vertical-align: middle;
	    &.fade-enter-active, &.fade-leave-active {
	      transition: all 0.4s linear;
	    }
	    &.fade-enter, &.fade-leave-active {
	      opacity: 0;
	      transform:translate3d(24px, 0, 0);
	    }
	    .inner{
	      display:inline-block;
	      line-height :24px;
	      font-size :24px;
	      vertical-align: top;
	      &.inner-enter-active, &.inner-leave-active {
	        transition: all 0.4s linear;
	        transform: rotate(0);
	      }
	      &.inner-enter, &.inner-leave-active {
	        opacity: 0;
	        transform:rotate(180deg);
	      }
	    }
    }
</style>