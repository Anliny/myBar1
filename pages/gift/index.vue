<template>
	<view class="content" :style="{backgroundImage:`url(${BGUrl})`}" >
		<view class="page-bar" :style="{top:`${iStatusBarHeight}px`}">
			<image @click="handleGoBack" class="left-icon" :src="leftIocon" mode="aspectFill"></image>
			<view class="right-icon" ></view>
			<view class="title">爆屏大礼包</view> 
		</view>
		<view style="display: flex;justify-content: center;">
		<image :src="giftUrl" class="gift-img" :style="{'marginTop':`${iStatusBarHeight*2 + 120}rpx`}" mode="aspectFill"></image>
		</view>
		<view class="inputWapper">
			<view class="label">爆屏大礼包</view>
			<view class="input">
				<input class="text" type="number" value="" placeholder-class="pla" placeholder="请填写数量" />
			</view>
			<view class="unit">水滴</view>
		</view>
		<view class="inputWapper">
			<view class="label">礼包个数</view>
			<view class="input">
				<input class="text" type="number" value="" placeholder-class="pla"	 placeholder="请填写个数"/>
			</view>
			<view class="unit">个</view>
		</view>
		<view class="total">共236人</view>
		<view class="inputWapper textareaInput">
			<view class="input">
				<textarea  class="text" type="text" value="" placeholder-class="pla pla1" placeholder="诚心交友,开心每一天" />
			</view>
		</view>
		<view class="giftNumber">
			<image class="gem" src="../../static/images/gem.png" mode="aspectFit"></image>
			<view class="giftTotal">88888</view>
		</view>
		<view class="btn">
			<view class="bg">
				
		发送大礼包
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		components:{},
		data() {
			return {
				iStatusBarHeight:0,
				BGUrl: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/beijing.png',
				leftIocon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/icon_03.png',
				chatIcon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/icon_09.png',
				enjoyIcon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/icon_08.png',
				giftUrl:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/liwu.png',
				data:null,
			}
		},
		onLoad:function (options) {
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
			
		},
		methods: {
			// 返回
			handleGoBack(){
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./style.css");
</style>
