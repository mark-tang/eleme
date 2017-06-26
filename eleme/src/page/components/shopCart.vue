<template>
  <div>
    <div class="shopcart">     
        <div class="shopcart_wrap">
          <div class="cart_btn" @click="windowToggle">
            <div class="cart_btn_wrap" :class="{highlight:totalCount}">
              <i class="ico-cart"></i>
              <span v-show="totalCount">{{totalCount}}</span>
            </div>
          </div>
          <div class="total_price" :class="{highlight:totalPrice>0}">￥{{totalPrice}}</div>
          <div class="delivery_price">另需配送费￥{{deliveryPrice}}</div>
        	<div class="start_price" :class="{highlight:account}" @click="bill(payDesc)">{{payDesc}}</div>
        </div>
         <transition name="fade">
          <div class="list_window" v-show="windowSwitch">
            <div class="hd">
              <h2>购物车</h2>
              <span @click="clearAll">清空</span>
            </div>
            <ul class="bd">
              <li v-for="food in selectFoods">
                  <span>{{food.name}}</span>
                  <div>
                    <span>￥{{food.price*food.count}}</span>
                    <cart-deal :food="food"></cart-deal>
                  </div>
              </li>
            </ul>
          </div>
        </transition>
    </div>
    <div class="cover_bg" v-show="windowSwitch"></div>
  </div>
</template>
<script>
  import cartDeal from './cartDeal'  
  export default{
    components:{
      cartDeal
    },
  	props:{
      selectFoods:{
        type:Array,
        default() {
          return [{price: 20, count: 2}];
        }
      },
      deliveryPrice:{
        type: Number,
        default: 0
      },      
      minPrice:{
        type: Number,
        default: 0
      }
  	},  	
    data(){
      return{
        account:false,
        windowSwitch:false,
      }
    },
    computed:{
      totalCount(){
        let count = 0;
        this.selectFoods.forEach((food)=>{
            count += food.count;
        });
        return count;
      },
      totalPrice(){
        var price = 0;
        this.selectFoods.forEach((food)=>{
          price += food.price * food.count;
        })
        return price;
      },
      payDesc() {           
        if (this.totalPrice === 0) {
          this.account=false;
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
           this.account=false;
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;          
        } else {
          this.account=true;
          return '去结算';
        }
      },
    },
    methods:{
      windowToggle(){
        if(this.totalPrice){
          this.windowSwitch=!this.windowSwitch;
        }
      },
      clearAll(){
        this.selectFoods.forEach((food)=>{
            food.count = 0;
        });
        this.windowSwitch = false;
      },
      bill(txt){
        if(txt == "去结算"){
          alert('支付' + this.totalPrice + '元');
        }
      }
    }
  }
  
</script>
<style lang="scss">
	.shopcart{
    background: #141d27;   
		position: fixed;
		bottom:0;
		left: 0;
		width: 100%;
		height: 46px;
    line-height: 46px;    
    color: rgba(255,255,255,0.4);  
    z-index: 50;  
    .list_window{
      position: absolute; 
      transform:translate3d(0,-100%,0);
      left: 0; 
      top: 0;
      width: 100%;           
      color: #07111b;
      z-index: -1;
      &.fade-enter-active, &.fade-leave-active {
        transition:all 0.5s;       
        transform:translate3d(0, -100%, 0);       
      }
      &.fade-enter, &.fade-leave-active {
        transform:translate3d(0, 0, 0);       
      }
      .hd{
        height: 40px;
        line-height: 40px;
        background: #f3f5f7;
        padding: 0 18px;      
        display: flex;
        border-bottom: 1px solid #dadddf;        
        h2{
          flex-grow: 1;
          font-size: 14px;
          font-weight: normal;
        }
      }
      .bd{
        background: #fff;
        padding: 0 18px;
        line-height: 24px;
        li{
          padding: 12px 0;         
          display: flex;
          position: relative;
          &:not(:first-child){
             border-top:1px solid #e6e7e8;
          }         
          &>div{ 
            flex-grow: 1; 
          }
        }
        
      }
    }
    .shopcart_wrap{         
      display: flex; 
      background:#141d27;
      &>div{ position: relative; }     
      .cart_btn{
        position: relative;
        top: -10px;
        margin: 0 12px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #141d27;
        text-align: center; 
        padding: 6px;
        .cart_btn_wrap{         
          width: 44px; 
          height: 44px; 
          border-radius: 50%;
          background: #2b343c;   
          position: relative;  
          i{
            background: url(../../assets/img/ico-cart.png);
            width: 24px;
            height: 24px;
            display: inline-block;
            margin-top: 10px;
          } 
          span{
            position: absolute;
            top: -8px;
            color: #fff;
            right: -10px;       
            display: block;
            width: 24px;
            height: 24px;
            line-height: 24px;
            border-radius: 50%;
            text-align: center;
            background: #f01414;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
          }
          &.highlight{
            background: #00a0dc;
            i{
               background: url(../../assets/img/ico-cart-on.png);
            }
          }         
        }
      }
      .total_price{      
        margin-top: 12px; 
        padding: 0 18px 0 18px; 
        height: 24px; 
        line-height: 24px; 
        border-right: 1px solid #2b333c ;
        &.highlight{
          color: #fff;
        }
      }
      .delivery_price{
            flex-grow: 1; 
            padding-left: 12px;          
      }
      .start_price{
        width: 105px;
        text-align: center;
        &.highlight{
          background: #00b43c; 
          color: #fff;
        }
      }
    }
	}
  .cover_bg{
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; 
    background: rgba(7,17,27,0.6);
  }
</style>


