<template>
	<header>		
		<div class="bg"><img :src="seller.avatar" :alt="seller.name"></div>
		<div class="head_wrap">				
			<div class="avatar"><img width="64" height="64" :src="seller.avatar" :alt="seller.name"></div>
			<div class="info">
				<div class="store"><span class="brand"></span>{{seller.name}}</div>
				<div class="delivery">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
				<div class="pay">
					<span class="minus"></span>{{seller.supports[0].description}}
					<div class="methods" @click="showDetail"><span>{{seller.supports.length}}个</span><i class="ico_enter_s"></i></div>
				</div>
			</div>			
		</div>
		<div class="bulletin_bar" @click="showDetail">
			<i class="ico_bulletin"></i>
			<span class="txt">{{seller.bulletin}}</span>
			<i class="ico_enter_m"></i>
		</div>
		<transition name="fade">
			<div class="detail" v-show="detail"  @click="hideDetail">
				<h2>{{seller.name}}</h2>
				<star :size="48" :score="seller.score"></star>
				<div class="title">
					<div class="line"></div>
					<div class="txt">优惠信息</div>
					<div class="line"></div>
				</div>
				<supports :data="seller"></supports>
				<div class="title">
					<div class="line"></div>
					<div class="txt">商家公告</div>
					<div class="line"></div>
				</div>
				<div class="bulletin">
					{{seller.bulletin}}
				</div>
				<div class="close">
					<i class="ico_close"></i>
				</div>
			</div>
		</transition>
	</header>
</template>
<script>
	import star from './components/star';
	import supports from './components/supports';
	export default{
		components:{
			star,supports
		},
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				detail:false,
			}
		},
		methods:{
			showDetail(){
				this.detail = true;
			},
			hideDetail(){
				this.detail = false;
			}
		}
	}
</script>
<style lang="scss">
	@import '../assets/css/style.scss';	
	header{ 
		 position: relative; 
		 background: rgba(7,17,27,0.5);
		 color: #fff;		 
		 overflow:hidden; 		
		 .bg{
		 	position: absolute;
		 	left: 0;
		 	top: 0;
		 	width:100%;
		 	height:100%;
		 	z-index:-1;
		 	img{
		 		width:100%;
		 		height:100%;
		 	}
		}		
		.head_wrap{ 
			flex-grow: 1;
			font-size: 14px;
			position:relative;			
			z-index:2;
			padding:24px 12px 18px 24px;
			font-size:0;			
			display: flex;
			background:rgba(0,0,0,0.2);				
			.avatar{
				z-index: 2; 
				position: relative;					
				color: red;
				img{
					border-radius:2px;
				}
			}
			.info{
				flex-grow: 1;
				font-size: 14px;				 	
			 	margin-left: 10px;
			 	&>div:not(:last-child){ padding-bottom:7px; line-height: 12px;}
			 	.store{
			 		font-size: 16px;
			 		font-weight: bold;
			 		padding-top: 1px;
			 		.brand{ 
				 		width: 30px;
						height: 18px;
						display: inline-block;
						vertical-align:middle;
						margin-right: 5px;
						background: url(../assets/img/brand@2x.png);
						background-size: 30px 18px;
				 	}
			 	}
			 	.delivery{ font-size: 12px; }
			 	.pay{ 			 		
			 		font-size: 12px; 
			 		.minus{
			 			width: 12px;
						height: 12px;
			 			background: url(../assets/img/decrease_1@2x.png);
			 			background-size: 12px 12px;
			 			display: inline-block;
			 			vertical-align: middle;
			 			margin-right: 5px;
			 		}
			 		.methods{ 
			 			float: right;
			 			line-height: 24px; 
			 			height: 24px;				 			
			 			background: #4c4a4b;
			 			border-radius: 12px;
			 			padding: 0 8px;
			 			margin-top: -5px;
			 			span{
			 				display: inline-block;
			 				vertical-align: top;
			 				margin-right: 3px;
			 			}
			 		}
			 	}
			}			
		}
		.bulletin_bar{			
				position: relative;
				padding: 0 22px 0 12px;	
				height: 28px;
				line-height: 28px;		
				background: rgba(7,17,27,0.2);		
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: normal;	
				.ico_bulletin{	

					display: inline-block;
					width: 22px; 
					height: 12px;
					margin-top: 8px;
					@include bg-image('../assets/img/bulletin');
					background-size: 22px 12px;
				}
				.txt{
					margin: 4px;
					vertical-align: top;
					font-size: 10px;
				}
				.ico_enter_m{
					position: absolute;					
					right: 8px;
					bottom: 8px;
					vertical-align: top;
				}
			}
		.detail{
			position: fixed;
			left:0;
			top: 0;
			z-index: 100;
			width: 100%; 
			height: 100%;
			padding:64px 22px;
			color: #fff;
			text-align: center;
			background:rgba(7,17,27,0.8);
			h2{ margin-bottom: 8px;}
			.title{
				position: relative;
				margin: 28px 0 18px;							
				display: flex;
				.line{ 
					flex-grow: 1;
					border-top: 1px solid rgba(255,255,255,0.2);					
				};
				.txt{
					padding: 0 12px;
					margin-top: -8px;					
					font-size: 16px;
				}
			}
			.supports{				
				text-align: left;
				li{
					border-bottom: 0 none;
					padding:  6px 12px;
				}
			}
			.bulletin{
				padding: 12px 12px 0;
				line-height: 24px;
				text-align: left;
			}
			.close{
				position: absolute;	
				width: 100%;			
				bottom: 32px;
				left: 0;
				text-align: center;
				.ico_close{
					width: 16px; 
					height: 16px;
					display: inline-block;
					background: url(../assets/img/ico_close.png);
				}
			}

		}
	}
</style>