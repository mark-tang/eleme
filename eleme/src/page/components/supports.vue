<template>	
	<ul class="supports">
		<li v-for="(item,index) in data.supports"><i :class="classMap[index]"></i>{{item.description}}</li>	
	</ul>
</template>
<script>
	export default{
		props:{
			data:{
				type:Object
			}
		},
		created(){
			 this.classMap = ['ico_minus', 'ico_discount', 'ico_special', 'ico_invoice','ico_safeguard'];
		}
	}
</script>
<style lang="scss">
	.supports{
		li{			
			border-bottom: 1px solid #dbdee0;		
			padding: 16px 12px;			
			i{
				background-size: 16px 16px;
				display: inline-block;
				width: 16px; 
				height: 16px;
				vertical-align: top;
				margin-right: 6px;
			}
			.ico_minus{ background-image:url(../../assets/img/decrease_3@2x.png); }
			.ico_discount{background-image:url(../../assets/img/discount_3@2x.png); }
			.ico_special{background-image:url(../../assets/img/special_3@2x.png); }
			.ico_invoice{background-image:url(../../assets/img/invoice_3@2x.png); }
			.ico_safeguard{background-image:url(../../assets/img/guarantee_3@2x.png); }
			

		}
	}
</style>