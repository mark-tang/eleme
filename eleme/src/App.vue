<template>
  <div class="home">  
    <public-head :seller="seller"></public-head>
    <div class="menu">
      <router-link :to="{path:'/goods'}">商品</router-link>
      <router-link :to="{path:'/ratings'}">评论</router-link>
      <router-link :to="{path:'/store'}">商家</router-link>     
    </div>
     <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
  </div>
</template>
<script>
  import data from './json/data.json'; 
  import publicHead from './page/header';  
  export default{
    components:{
      publicHead
    },
    data(){
      return{
        seller:{},
      }
    },
     created(){
        this.seller = data.seller;
      }
  }
</script>
<style lang="scss">
  @import "./assets/css/style"; 
  .home{ 
    .menu {
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom:1px solid #e7e8e9;
      a{
        flex: 1;
        text-align: center;
        font-size: 14px;
        color:#4d555d;
        &.router-link-active {
        color: #f01414;
        }
      }
    }
  }
  
</style>