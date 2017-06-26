<template>
	<div class="stars" :class="starSize">
		<span v-for="item in stars" :class="item"></span>
	</div>
</template>
<script>
	export default{
		props:{
			score:{
				type:Number
			},
			size:{
				type:Number
			}
		},
		data(){
			return{				
			}
		},
		created(){
			this.starSize = 'star'+this.size ;
		},
		computed:{
			stars(){
				var result = [];
				var length = 5;
				var score = Math.floor(this.score);
				for(var i = 0; i<score;i++){
					result.push('on');
				}
				if(length - score > 0){
					var lastItem = length - score;
					for (var i = 0; i < lastItem; i++) {
						result.push('off');
					}
				}
				return result;
			}
		},
	}
</script>
<style lang="scss">
	@import '../../assets/css/style.scss';
	.stars{ 
		display: inline-block; 		
		&.star24{
			span {
				width: 10px; 
				height: 10px;
        		background-size:10px 10px;
				&.on{ @include bg-image('../../assets/img/star24_on'); }
				&.off{@include bg-image('../../assets/img/star24_off');}
			}
		}
		&.star36{
			span {
				width:15px; 
				height:15px;			
        		background-size:15px 15px;
				&.on{ @include bg-image('../../assets/img/star36_on'); }
				&.off{ @include bg-image('../../assets/img/star36_off');}
			}
		}
		&.star48{
			span {
				width:20px;
		        height:20px;
		        margin-right:22px;
		        background-size:20px 20px;
				&.on{ @include bg-image('../../assets/img/star48_on'); }
				&.off{ @include bg-image('../../assets/img/star48_off');}
			}
		}		
		span{ 			
			margin-right: 3px;			
			display: inline-block;	
			background-repeat: no-repeat;
		}
	}
</style>