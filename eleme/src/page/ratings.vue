<template>
	<div class="main ratings">
		<div class="ratings_wrap">
		<div class="overview">
			<div class="left">
				<p class="score">{{average}}</p>
				<p class="title">综合评分</p>
				<p class="rank">高于周边商家{{seller.rankRate}}</p>
			</div>
			<div class="right">
				<p>服务态度<star :size="36" :score="seller.serviceScore"></star><span>{{seller.serviceScore}}</span></p>
				<p>商品评分<star :size="36" :score="seller.foodScore"></star><span>{{seller.foodScore}}</span></p>
				<p>送达时间<span class="delivery_time">{{seller.deliveryTime}}</span></p>
			</div>
		</div>
		<div class="split"></div>
		<div class="check_rating">
			<div class="rating_type">
				<span class="positive" @click="checkAll" :class="{active:checkTerm==1}">全部&nbsp;{{ratings.length}}</span>
				<span class="positive" @click="checkPositive" :class="{active:checkTerm==2}">满意&nbsp;{{positive}}</span>
				<span class="negative" @click="checkNegative" :class="{active:checkTerm==3}">吐槽&nbsp;{{ratings.length - positive}}</span>
			</div>
			<div class="txt_toggle" @click="checkToggle = !checkToggle">
				<i class="ico_check" :class="{ico_uncheck:checkToggle}"></i>只看有内容的评价
			</div>
		</div>		
		<ul class="rate">
			<li v-for="item in ratings" class="rate_item" v-show="showTerms(item.score,item.text)">
				<div class="avatar"><img :src="item.avatar" alt=""></div>
				<div class="cont">
					<div class="hd">
						<div class="row row1">
							<span class="name">{{item.username}}</span>
							<span class="date">{{item.rateTime | formatDate}}</span>
						</div>
						<div class="row">
							<star :size="24" :score="item.score"></star>
							<span class="deliveryTime">{{item.deliveryTime}}</span>
						</div>
					</div>
					<p class="txt">{{item.text}}</p>
					<div class="dish">
						<i v-if="item.score>3" class="ico_good"></i>
						<span v-for="food in item.recommend">{{food}}</span>
					</div>
				</div>
			</li>
		</ul>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import list from '../json/data.json';
	import {formatDate} from './date.js';
	import star from './components/star.vue';	
	export default{
		components:{
	    	star
	    },
	    props:{
	    	seller:{
	    		type:Object,
	    	}
	    },
		data(){
			return{
				ratings:[],		
				checkToggle:false,	
				checkTerm:1,				
			}
		},		
		created(){
			this.ratings = list.ratings;
			var len = this.ratings.length;
			var point = 0;
			for (var i = 0; i < len; i++) {
				point += this.ratings[i].score; 
			}
			this.average  = (point/len).toFixed(1);
		    if (!this.scroll) {
		        this.$nextTick(() => {
		          this.scroll = new BScroll(this.$el, {click: true});
		        });
		    }
		    else {
		        this.scroll.refresh();
		    };		
		},
		computed:{
			positive(){
				var data  = list.ratings;
				var good = 0; 
				for (var i = 0; i < data.length; i++) {
					if(data[i].score>3){
						good +=1;
					}
				}
				return good;				
			}
		},
		methods:{
			checkAll(){
				this.checkTerm = 1;
			},
			checkPositive(){
				this.checkTerm = 2;
			},
			checkNegative(){
				this.checkTerm = 3;
			},
			showTerms(score,txt){
				var num = this.checkTerm;
				var target = this.checkToggle;
				function checkToggle(){
					 if(target == false){
						if(txt!=""){
							return true;
						}
						else{
							return false;
						}
					}
					else{
						return true;
					};	
				};
				if(num == 1){
					if(target == false){
						if(txt!=""){
							return true;
						}
						else{
							return false;
						}
					}
					else{
						return true;
					};	
				}
				else if( num == 2){
					if(score > 3){
						if(target == false){
							if(txt!=""){
								return true;
							}
							else{
								return false;
							}
						}
						else{
							return true;
						};	
					}
				}
				else if( num == 3){
					if(score <= 3){
						if(target == false){
							if(txt!=""){
								return true;
							}
							else{
								return false;
							}
						}
						else{
							return true;
						};	
					}
				}

								
			}
		},
		filters: {
	      formatDate(time) {
	        let date = new Date(time);
	        return formatDate(date, 'yyyy-MM-dd hh:mm');
	      }
	    },	 	      
	}
</script>
<style lang="scss">
	.ratings{ 		
		bottom: 0;	
		.overview{ 		
			padding:18px 0 18px 18px;		
			display: flex;		
			border-bottom: 1px solid #dbdee0;					
			.left{
				width: 137px;
				text-align: center;
				font-size: 12px;
				.score{
					color: #f90;
					font-size: 24px;
					margin-bottom: 12px;
					line-height: 28px;
				}
				.title{
					color: #07111b;					
					margin-bottom: 8px;
				}
				.rank{
					color: #93999f;
				}
			}
			.right{
				border-left: 1px solid #e7e8e9;
				padding:6px 0 6px 24px;
				flex-grow: 1;
				font-size: 12px;
				line-height: 18px;
				color: #07111b;
				p{
					margin-top: 8px;
					.stars{ 
						vertical-align: top;
						margin: 0 12px;
					};
					&>span:nth-of-type(2){
						vertical-align: top;
						color: #f90;
					}
					.delivery_time{ 
						margin-left: 12px; 
						color: #93999f;
						vertical-align: top;
					}
				}
			}
		}		
		.check_rating{		
			.rating_type{
				padding: 18px;
				border-bottom: 1px solid #e6e7e8;
				span{ 
					border-radius: 1px;
					display: inline-block;
					font-size: 12px;
					padding: 8px 12px; 
					margin-right: 8px; 			
				}				
				.positive{
					background: #ccecf8;
					color: #4d555d;
					&.active{
						background: #00a0dc;
						color: #fff;
					}
				}
				.negative{
					background: #dbddde;
					color: #4d555d;
					&.active{
						background: #4d555d;
						color: #fff;
					}
				}

			}
			.txt_toggle{
				padding: 8px 0 8px 8px;		
				border-bottom: 1px solid #e6e7e8;		
				.ico_check{
					width: 24px;
					height: 24px;
					display: inline-block;
					background: url(../assets/img/ico_check.png);
					vertical-align: middle;
					margin-right: 6px;
				}
				.ico_uncheck{
					background: url(../assets/img/ico_uncheck.png);
				}
			}
		}
		.rate{ 			
			padding: 0 18px;	
			.rate_item{
				&:not(:last-child){border-bottom: 1px solid #e6e7e8;}
				display: flex; 
				padding:18px 0;			
				.avatar{ margin-right: 12px;
					img{
						width: 28px; 
					 	height: 28px; 
					 	border-radius: 50%;}
				}
				.cont{
					flex-grow: 1;
					.hd{
						.row{margin-bottom: 4px;
							.deliveryTime{
								display: inline-block;
								vertical-align: top;
								font-size: 10px;
								color: #93999f;
							}
						}
						.row1{display: flex;
							.name{ 
								font-size: 10px;
								color:#07111b; 
							}
							.date{
								flex-grow: 1;
								text-align: right;
								color: #93999f;
							}

						}
					}
					.txt{ margin-bottom: 8px; }
					.dish{
						.ico_good{
							background: url(../assets/img/good.png) no-repeat;
							width: 12px; 
							height: 12px; 
							display: inline-block; 
							vertical-align: middle;
						}
						span{
							border:1px solid #e6e7e8;
							color: #93999f;
							padding: 3px 6px;
							margin: 2px 2px;
							display: inline-block;
							vertical-align: middle;							
						}
					}
				}
			}
		}
	}	
</style>