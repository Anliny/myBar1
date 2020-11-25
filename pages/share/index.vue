<template>
	<view class="content" :style="{background:`url(${BGUrl})`}" style="background-size: 750upx;">
		<view class="appBar" :style="{ height: iStatusBarHeight + 'px'}"></view>
		<view class="header">
			<view class="goBack" @click="goBack">
				<image class="icon" src="http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/share/left.png" mode="scaleToFill"></image>
			</view>
			<view class="avatarWapper">
				<image class="avatar" :src="avatarList[0]" mode="scaleToFill"></image>
				<view class="name">Tonight</view>
				<image class="avatar" :src="avatarList[1]" mode="scaleToFill"></image>
			</view>
		</view>
	
		<swiper :loop="false" class="imageContainer" :style="{height:`calc(100% - ${iStatusBarHeight*2+240}rpx)`}" previous-margin="0rpx" next-margin="45rpx" >
			<swiper-item class="swiperitem"  v-for="(item,index) in imgList" :key="index">
				<view class="itemWapper" :style="{backgroundImage:'url('+item+')'}">
					<view class="textWapper">
						<view class="icon">Live</view>
						<view class="text tk-acumin-pro">Current Songs</view>
					</view>
					<view class="shareBtn" v-if="isactive==0">
						<view class="icon" @tap="YQsubmit" :data-id="0">邀请一起喝</view>
					</view>
					<view class="shareBtn1" v-else-if="isactive==1">
						<view class="icon"  @tap="YQsubmit" :data-id="1" >等他回应</view>
					</view>
					<view class="shareBtn2"  v-else-if="isactive==2">
						<view class="icon" @tap="YQsubmit" :data-id="2" >她接过酒杯</view>
					</view>
					<view class="shareBtn2"  v-else-if="isactive==3" >
						<view class="icon" @tap="YQsubmit" :data-id="3" >已将微信发送给你</view>
					</view>
					<image class="gift" src="http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/share/gift.png" mode="scaleToFill"></image>	
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import FontAwesome from '@/components/Am-FontAwesome/index.vue'
	import {userData} from "../users/mock.js"

	export default {
		components: {},
		data() {
			return {
				iStatusBarHeight: 0,
				isactive:0,
				scrollTop:0,
				recharge:0,
				old: {
					scrollTop: 0
				},
				inputValue:'',
				info: [
					111,222,333
				],
				current: 0,
				mode: 'round',
				BGUrl: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/bg.jpg',
				logo: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/logo.png',
				avatarList:[
					'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/avatar1.png',
					'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/avatar2.png',
					],
				tips:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/tips.png',
				imgList: [
					'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/swiperBG2.jpg',
					'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/swiperBG1.png'
					// 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2294966447,248611631&fm=26&gp=0.jpg'
				],
				chatList:[
					{
						id:1,
						tableNumber:'799',
						userIcon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/share/user.png',
						text:'真好听你撒范德萨范德萨你懂撒范德萨范德萨发，是否你懂撒范德萨发生的三废士大夫的萨芬你撒范德萨发撒范德萨发',
					},{
						id:2,
						tableNumber:'99',
						userIcon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/share/user.png',
						text:'真好听',
					}
				]
			}
		},
		onLoad() {
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
		},
		methods: {
			goBack(){
				uni.navigateTo({url:'../photos/index'});
			},
			
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
		  scroll: function(e) {
					console.log(e)
					this.old.scrollTop = e.detail.scrollTop
			},
			
			change(e) {
				this.current = e.detail.current;
			},
			
			// 获取文本框内容
			getChat(event){
				this.inputValue = event.target.value
			},
			// 点击发送
			handleSubmit(){
				this.chatList = [
					...this.chatList,
					{
						id:this.chatList.length+1,
						tableNumber:'799',
						userIcon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/share/user.png',
						text:this.inputValue,
					}
				]
				this.inputValue = ""
			},
			YQsubmit(e){
				var type=e.currentTarget.dataset.id;
				
				if(type==0){
					this.isactive=1;
				}else if(type==1){
					this.isactive=2;
				}else if(type==2){
					this.isactive=3;
				}else if(type==3){
					this.isactive=0;
				}
			}
			
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./style.scss");
	.swiper-box1 .uni-swiper-slide-frame{
		width: 84% !important;
	}
	.imageContainer {
		width: 750rpx;
		margin-top: 10rpx;
		height: calc(100% - 280rpx);
		
	}
	
	.itemImg {
		width: 630rpx;
		height: 100%;
		border-radius: 10rpx;
	}
	
	.swiperitem {
		width: 630rpx;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-size: 630rpx 100%;
		background-repeat: no-repeat;
		padding-right: 20rpx;
		 box-sizing: border-box;
	}
	.itemWapper{
		width: 100%;
		height: 100%;
		background-size: 100% auto;
	}
</style>
