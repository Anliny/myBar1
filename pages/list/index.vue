<template>
	<view class="content" :style="{backgroundImage:`url(${BGUrl})`}" >
		<view class="appBar" :style="{ height: iStatusBarHeight + 'px'}"></view>
		<view class="page-bar">
			<image @click="handleGoBack" class="left-icon" :src="leftIocon" mode="aspectFill"></image>
			<view class="right-icon" ></view>
			<view class="title">我的发布</view> 
		</view>
		<view class="page-list" :style="{height:`calc(100% - ${iStatusBarHeight + 110}rpx)`}">
			<waterfallsFlow :list="list" @wapper-lick="handleList"> 
				<!--  #ifdef  MP-WEIXIN -->
				      <!-- 微信小程序自定义内容 -->
				      <view class="cnt" v-for="(item, index) of list" :key="index" slot="slot{{index}}" >
							<view class="item-user">
							  <image class="avatar" :src="item.avatar"></image>
							  <view class="name">{{item.title}}</view>
							</view>
							<view class="item-comment">
								  <image class="icon" :src="enjoyIcon" mode="aspectFit"></image>
								  <view class="text"> {{item.enjoy}} </view>
								  <image class="icon" :src="chatIcon" mode="aspectFit"></image>
								  <view class="text"> {{item.chat}} </view>
							</view>
				      </view>
				      <!--  #endif -->
				
				      <!-- #ifndef  MP-WEIXIN -->
				      <!-- app、h5 自定义内容 -->
				      <template v-slot:default="item">
				        <view class="cnt">
				          <view class="item-user">
				            <image class="avatar" :src="item.avatar"></image>
				            <view class="name">{{item.title}}</view>
				          </view>
				          <view class="item-comment">
				            <image class="icon" :src="enjoyIcon" mode="aspectFit"></image>
				            <view class="text"> {{item.enjoy}} </view>
				            <image class="icon" :src="chatIcon" mode="aspectFit"></image>
				            <view class="text"> {{item.chat}} </view>
				          </view>
				        </view>
				      </template>
				    </waterfallsFlow>
				    <!-- #endif -->
			</waterfallsFlow>
		</view>
	</view>
</template>

<script>
	import waterfallsFlow from "@/components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	import {list} from './mock.js'
	export default {
		components:{
			waterfallsFlow
		},
		data() {
			return {
				list:[],
				iStatusBarHeight:0,
				BGUrl: 'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/bg.jpg',
				leftIocon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/icon_03.png',
				chatIcon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/icon_09.png',
				enjoyIcon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/icon_08.png'
			}
		},
		onLoad:function (options) {
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
			this.list = list
		},
	
		methods: {
			// 点击list
			handleList(data){
				console.log(data)
				uni.navigateTo({url:`/pages/detail/index?id=${data.id}`})
			},
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
	.page-list {
	  padding: 10px;
	  box-sizing: border-box;
	  overflow: hidden;
	  overflow-y: auto;
	}
	.page-list .cnt {
	  padding: 10px;
	  background-color: rgb(28,38,75);
	  color: #F5F5F5;
	  border-radius: 0 0 12rpx 12rpx;
	}
	.page-list .cnt .item-user {
	  padding: 10rpx;
	  height: 80rpx;
	  display: flex;
	}
	.page-list .cnt .item-user .avatar{
		height: 80rpx;
		width: 80rpx;
	}
	.page-list .cnt .item-user .name{
		line-height: 80rpx;
		
		font-size: 32rpx;
		line-height: 80rpx;
	}
	.page-list .cnt .item-comment{
		display: flex;
		height: 60rpx;
		justify-content: flex-end;
	}
	.page-list .cnt .item-comment .text{
		font-size: 24rpx;
		line-height: 54rpx;
		margin-right: 20rpx;
	}
	.page-list .cnt .item-comment .text:first-child{
		margin-right: 20rpx;
	}
	.page-list .cnt .item-comment .icon{
		width: 36rpx;
		height: auto;
		margin-right: 8rpx;
		vertical-align: middle;
	}
	
</style>
