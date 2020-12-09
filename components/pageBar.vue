<template>
	<view class="page-bar" :style="{top:`${psitionTop}px`}">
		<image @click="handleGoBack" class="left-icon" :src="leftIcon" mode="aspectFill"></image>
		<view class="right-icon" ></view>
		<view class="title">{{title}}</view> 
	</view>
</template>

<script>
export default {
	name:'pageBar',
	props:{
		psitionTop:{
			type:String | Number,
			default:function(){
				return 20
			}
		},
		title:{
			type:String,
			default:function (){
				return ""
			}
		},
		leftIcon:{
			type:String,
			default:function(){
				return ""
			}
		}
	},
	data () {
		return {
			
		}
	},
	methods:{
		handleGoBack(){
			this.$emit('pageBarGoBack')
		}
	}
}
	
</script>

<style>
	.page-bar{
		height: 90rpx;
		text-align: center;
		font-size: 32rpx;
		height: 90rpx;
		color: #fff;
		line-height: 90rpx;
		z-index: 100;
		position: absolute;
		width: 100%;
	}
	.page-bar .left-icon{
		height: 90rpx;
		width: 90rpx;
		float: left;		 
		padding: 30rpx;
		box-sizing: border-box;
	}
	.page-bar .right-icon{
		height: 90rpx;
		width: 90rpx;
		float: right;		 
		padding: 30rpx;
		box-sizing: border-box;
	}
</style>
