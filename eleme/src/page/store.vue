<template>
	<div class="main store">
		<div class="store-content">
			<div class="overview">
					<div class="about">
						<div class="left">
							<h3>{{store.name}}</h3>
							<div class="desc"><star :size="36" :score="store.serviceScore"></star>({{store.ratingCount}})
							<span>月售{{store.sellCount}}单</span></div>
						</div>
						<div class="right" @click="collectSwicth = !collectSwicth">
							<i class="ico_collect" :class="{on:collectSwicth}"></i>
							<p>{{collectSwicth?"收藏":"已收藏"}}</p>
						</div>
					</div>
					<ul class="delivery">
						<li>
							<h4>起送价</h4>
							<div><span>{{store.minPrice}}</span>元</div>
						</li>
						<li>
							<h4>商家配送</h4>
							<div><span>{{store.deliveryPrice}}</span>元</div>
						</li>
						<li>
							<h4>平均配送时间</h4>
							<div><span>{{store.deliveryTime}}</span>元</div>
						</li>
					</ul>
			</div>
			<div class="split"></div>
			<div class="bulletin">
				<h3>公告与活动</h3>
				<div class="introduce">{{store.bulletin}}</div>
				<supports :data="store"></supports>			
			</div>
			<div class="split"></div>
			<div class="pics">
				<h3>商家实景</h3>
				<div class="pic_wrap" ref="picWrapper">
					<ul class="pic_list" ref="picList">
						<li v-for="pic in store.pics"><img :src="pic" alt="商家实景"></li>
					</ul>	
				</div>
			</div>
			<div class="split"></div>
			<div class="info">
				<h3>商家信息</h3>
				<p v-for="item in store.infos">{{item}}</p>
			</div>
		</div>
	</div>
</template>
<script>
	import data from '../json/data.json';
	import star from './components/star.vue';
	import supports from './components/supports.vue';
	import BScroll from 'better-scroll';
	export default{
		components:{
			star,supports
		},
		data(){
			return{
				store:{},
				collectSwicth:false,
			}
		},
		created(){
			this.store = data.seller;
			if (!this.picScroll) {
		        if (this.store.pics) {
		          this.$nextTick(() => {
		            let picWidth = 120;
		            let margin = 6;
		            let width = (picWidth + margin) * this.store.pics.length - margin;
		            this.$refs.picList.style.width = width + 'px';
		            this.picScroll = new BScroll(this.$refs.picWrapper, {
		              scrollX: true,
		              eventPassthrough: 'vertical'
		            });
		          });
		        }
		    } 
		    else {
		        this.picScroll.refresh();
		    }
		    if (!this.scroll) {
		        this.$nextTick(() => {
		          this.scroll = new BScroll(this.$el, {click: true});
		        });
		    }
		    else {
		        this.scroll.refresh();
		    };
		},
		methods:{			
		},
	}
</script>
<style lang="scss">
	.store{		
		h3{ 
			font-weight: normal;
			font-size: 14px;
		}
		.overview{
			padding: 18px;			
			.about{								
				padding-bottom: 18px;
				display: flex;
				border-bottom: 1px solid #dbdee0;		
				line-height: 18px;
				.left{
					flex-grow: 1;
					h3{
						margin-bottom: 8px;
					}
					.desc{
						.stars{ margin-right: 6px; }
						&>span{margin-left: 6px;}
					}
				}
				.right{					
					text-align: center;
					width: 50px;
					font-size: 14px;
					.ico_collect{
						background: url(../assets/img/collect.png) no-repeat;
						width: 24px;
						height: 24px;
						display: inline-block;	
						&.on{
							background: url(../assets/img/collected.png) no-repeat;
						}
					}
				}
			}
			.delivery{		
				display: flex;
				padding-top: 18px;
				li{
					flex-grow: 1;
					text-align: center;
					font-size: 10px;
					&:not(:last-child){border-right: 1px solid #dbdee0;};	
					h4{
						color: #939995;		
						font-size: 10px;	
						font-weight: normal;								
						margin-bottom: 4px;
					}
					div{
						color: #07111b;
						line-height: 24px;
						span{
							font-size: 24px;
						}
					}
				}
			}
		}		
		.bulletin{
			padding: 18px;
			h3{ 
				font-size: 10px; 
				font-weight: normal;
			}
			.introduce{
				padding: 6px 0 18px;				
				line-height: 24px;
				font-size: 14px;
			}
		}
		.pics{
			padding: 18px;
			h3{
				margin-bottom: 8px;
			}
			.pic_wrap{
				width: 100%;
				overflow: hidden;
				.pic_list{ font-size: 0;
					li{
						display: inline-block;
						&:not(:last-child){margin-right: 6px;}					
						img{ 
							width: 120px;
							height: 90px;
							
						}
					}
				}
			}			
		}
		.info{
			padding: 18px;
			h3{
				padding-bottom: 8px;
			}
			p{
				padding: 16px 12px;
				border-top: 1px solid #dbdee0;		
			}
		}
	}
</style>