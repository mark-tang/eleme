<template>
	<div class="main goods">		
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" :class="{'on':current==index}" @click="navSelect(index,$event)"><span> <i v-show="item.type>0" class="icon" :class="classMap[item.type]"></i>{{item.name}}</span></li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodWrapper">
			<ul class="foods_item">
				<li v-for="(item,index) in goods" class="food-list-hook">
					<h3 class="title">{{item.name}}</h3>
					<ul class="dish">
						<li v-for="(food,index) in item.foods"  @click="selectFood(food, $event)">
							<img :src="food.icon" :alt="food.name">
							<div class="text">
								<h4>{{food.name}}</h4>
								<p>{{food.description}}</p>
								<p class="sell"><span>月售{{food.sellCount}}</span><span>好评{{food.rating}}</span></p>
								<p class="price"><span class="now">¥{{food.price}}</span><span v-show="food.oldPrice" class="old">¥{{food.oldPrice}}</span></p>
							</div>
							<cartDeal :food="food"></cartDeal>							
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shop-cart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
	</div>
</template>
<script type="es6">
	import cartDeal from './components/cartDeal'
	import shopCart from './components/shopCart'	
	import data from '../json/data.json';
	import BScroll from 'better-scroll';	
	export default{		
		components: {
			shopCart,cartDeal
    	},
    	props:{
    		seller:{
    			type:Object
    		}
    	},	
    	data(){
			return {
				goods:[],
				current:0,
				scrolly: 0,
				listHeight: [],	
				selectedFood:{},
			}
		},
	    computed:{
	    	selectFoods() {
	        let foods = [];
	        this.goods.forEach((good) => {
	          good.foods.forEach((food) => {
	            if (food.count) {  
	              foods.push(food); 
	            }
	          });
	        });
	        return foods;
	      }
	    },			
	   	created(){
	   		this.goods = data.goods;   
	   		this.$nextTick(() => {
		        this._initScroll();
		        this._calculateHeight();
		    });
		    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    	},   
    	mounted(){
	    		this.setNums();
    	},	
    	methods:{    
    		setNums(){    
    			var len = document.querySelectorAll('.dish li').length;      			
    			this.$store.commit('setInit',len);
    		},		
    		navSelect(index,event){
    			this.current = index;
    			 if (!event._constructed) {
		          // 去掉自带click事件的点击
		          return;
		        }
		        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
		        let el = foodList[index];
		        this.foodScroll.scrollToElement(el, 300);
    		},
    		_initScroll() {
		        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
		          click: true
		        });
		       
		        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
		          probeType: 3,
		          click: true
		        });
		        this.foodScroll.on('scroll', (pos) => {
		          this.scrolly = Math.abs(Math.round(pos.y));
		        });		       
		    },
		    _calculateHeight() {
		        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
		        let height = 0;
		        this.listHeight.push(height);
		        for (let i = 0; i < foodList.length; i++) {
		          let item = foodList[i];
		          height += item.clientHeight;
		          this.listHeight.push(height);
		        }
	        },
	        selectFood(food, event) {
		        if (!event._constructed) {		         
		          return;
		        }
		        this.selectedFood = food;
		    },
	       
    	},
	}	

</script>
<style lang="scss" scoped>
	@mixin icon($name){
		background-image: url($name+'@2x.png');
	}
	.goods{ 
		bottom:46px;
		display:flex;  
		.menu-wrapper{
			background:#f3f5f7;
			flex:0 0 80px;
			position: relative;
			width:80px; 
			ul{ 
				li{ 
					display:table;
					width:80px;
					height:54px;
					line-height:14px;
					padding:0 12px;
					&.on{
						background: #fff; 
						margin-top: -1px; 
						span{ border-bottom: 0 none; }
					}
					span{ 
						border-bottom: 1px solid #e6e7e8; 
						display: table-cell; 
						vertical-align: middle;
						.icon{
							background-size:12px 12px;
							display:inline-block;
							width:12px;
							height:12px;
							vertical-align:top;
							margin-right:4px;
							 &.decrease{ @include icon('../assets/img/decrease_3');}
							 &.discount {@include icon('../assets/img/discount_3');}
							 &.guarantee{@include icon('../assets/img/guarantee_3');}
							 &.invoice{@include icon('../assets/img/invoice_3');}
							 &.special{@include icon('../assets/img/special_3');}     
						}        					
        			}
        		}
        	}
        }
		.foods-wrapper{
		 	background: #fff;
		 	flex: 1;
			.foods_item{
				li{
					.title{ 
						background:#f3f5f7;
						border-left:2px solid #d9dde1;
						color:#93999f;
						font-size:12px;        
						line-height:26px;
						height:26px;
						padding-left:14px;
					}
					.dish{
						li{
							display: flex; 
							margin: 18px; 
							padding-bottom: 10px; 
							position: relative;
							img{ 
								width: 57px; 
								height: 57px; 
								margin-right: 10px;}
							.text{ flex-grow: 1; 
								h4{ 
									color:#07111b;
									margin:2px 0 8px 0;
									font-size:14px;
									line-height:14px; 
									height:14px;
								}
								.sell span{ margin-right: 12px; color:#93999f;}
								.price{font-weight:700px;line-height:24px;
									.now{ margin-right:8px;font-size:14px;color:#f01414;}
						            .old{ font-size:10px;color:#93999f; text-decoration: line-through;}
								}
							}							
						}

					}
				}
			}
		}
	}
	.cart_deal{
		position: absolute; 
		right: 0;
		bottom: 6px; 
		span{ 
			 display: inline-block; 
			margin: 0 8px;
			vertical-align: middle; 
		}
		i{
			cursor: pointer;  
			display: inline-block; 
			width: 24px; 
			height: 24px;			
			vertical-align: middle;
			&.icon-minus{ background: url('../assets/img/icon-minus.png') no-repeat center center; }
			&.icon-add{ 
				background: url('../assets/img/icon-add.png') no-repeat center center;
				display:inline-block;
				margin: 4px 6px 6px 6px; 
			}
		}
	}
	.cart-decrease{display:inline-block;margin: 4px 6px 6px 6px;
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