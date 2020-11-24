<template>
	<view class="content" :style="{background:`url(${BGUrl})`}" style="background-size: 750upx;">
		<view class="appBar" :style="{ height: iStatusBarHeight + 'px'}"></view>
		<view style="height: 75rpx;"></view>
		<view class="header">
			<view class="goBack" @click="handleGoBack">
				<image class="icon" :src="leftIcon" mode="scaleToFill"></image>
				回现场
			</view>
			
			<view class="avatar"> 
				<view class="item" @click="goShare" v-for="(item,index) in avatarList" :key="index">
					<image :src="item" mode="scaleToFill"></image>
				</view>
			</view>
		</view>
		
		<swiper :loop="false" class="imageContainer" @change="changeSwipper" :style="{height:`calc(100% - ${145+iStatusBarHeight}px)`}" previous-margin="45rpx" next-margin="45rpx" >
			<swiper-item class="swiperitem" :style="{backgroundImage:'url('+item.bgUrl+')'}" v-for="(item,index) in imgList" :key="index">
				<view class="" style="width: 100%;height: 100%;">
					<view class="mediaWapper" v-if="item.mediaType">
						<video :id="`myVideo${index}`"  
							preload="true"
							webkit-playsinline="true"
							x5-video-player-type="h5"
							x5-video-orientation="portraint" ref="`myVideo${index}`" :show-play-btn="false" :show-loading='true'	object-fit="fill" :src="item.mediaUrl" :show-center-play-btn="false" :controls="false" @error="videoErrorCallback" :autoplay="true" loop></video>
					</view>
					<view class="mediaWapper" v-else>
						<image :id="`myVideo${index}`" :src="item.mediaUrl" mode="scaleToFill"></image>
					</view>
					
					<cover-view class="textWapper">
						<cover-view class="icon">{{item.song.icon}}</cover-view>
						<cover-view class="text tk-acumin-pro">{{item.song.name}}</cover-view>
					</cover-view>
					<view class="chatContanner">
						<view class="chatView" style="">
							<scroll-view ref="refScollView" :scroll-top="item.scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
							                @scroll="scroll">
									<view :id="`content${index}`">
										<view  v-for="chat in item.chatList" :key="chat.id" style="margin-bottom: 10upx;">
											<view class="chatItem" v-if="!chat.type">
												<view class="tableNumber" v-if="chat.tableNumber">{{chat.tableNumber}}</view>
												<image class="userIcon" :src="chat.userIcon" mode="scaleToFill"></image>
												<view class="text">{{chat.text}}</view>
											</view>
											<view class="systemChatItem" v-else>
												<view class="tableNumber" v-if="chat.tableNumber">{{chat.tableNumber}}</view>
												<image class="userIcon" :src="chat.userIcon" mode="scaleToFill"></image>
												<view class="text">{{chat.text}}</view>
												<view class="goods">
													<image class="goodsIcon" :src="chat.goodsIcon" mode="scaleToFill"></image>
													<view class="number">x {{chat.goodsNumber}}</view>
												</view>
											</view>
										</view>
									</view>
							 </scroll-view>
						</view>
					</view>
					<view class="bottomWapper">
						<view class="line"></view>
						<view class="chatWapper">
							<input type="text" class="chatInput" @focus="getIndex(index)" @blur="getChat" :value="item.inputValue" />
							<view class="submit" @click="handleSubmit(index)">发送</view>
							<image class="gave" :src="goodsBtnIcon" @click="handleGoods(index)" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				
			</swiper-item>
		</swiper>
		<n-transition ref="pop" speed="ease-in-out" :height="500" :maskVal="0.5">
			<view class="maskWapper">
				<scroll-view :scroll-top="goodsScrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
				    @scroll="scroll">
					
						<view class="goodsWapper" >
							<view class="goodsItem" @click="handleGoodsItem(item)" v-for="item in bottomList" :key="item.id">
								<view class="icon" :class="[item.id == goodsItemActive ? 'iconHover' : '']">
									<image :src="item.icon" mode="scaleToFill"></image>
								</view>
								<view class="name">{{item.name}}</view>
								<view class="price">{{item.price}}</view>
							</view>
						</view>
					
				</scroll-view>
				
				<view class="payment">
					<view class="recharge">
						{{recharge}}   充值＞
					</view>
					<view class="btnGroup" >
						<view class="number" @click="handleConut">{{number}} ＞</view>
						<view class="submit" @click="handleGive">送给他</view>
					</view>
				</view>
			</view>
		</n-transition>
		<image class="fillImage" v-if="isShowFillImage"  :src="isShowFillImage ? 'https://atour-1300409046.cos.ap-shanghai.myqcloud.com/APNG/%E5%9B%9B%E5%8F%B6%E8%8D%89.png':''" mode="scaleToFill"></image>
		
	</view>
</template>

<script>
import {userData} from "../users/mock.js"
	import nTransition from "@/components/n-transition/n-transition.vue"
	
export default {
	components:{
		nTransition
	},
	data() {
		return {
			videoObj:null,
			iStatusBarHeight: 0,
			leftIcon:"http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/photos/left.png",
			goodsBtnIcon:"http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/photos/goodsBtn.png",
			goodsScrollTop:0,
			recharge:0,
			old: {
				scrollTop: 0
			},
			info: [
				111,222,333
			],
			
			goodsItemActive:null,
			recharge:0,
			number:0,
			isShowFillImage:false,
			
			current: 0,
			index:0,
			mode: 'round',
			BGUrl: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/bg.jpg',
			logo: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/logo.png',
			avatarList:[
				'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/avatar1.png',
				'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/avatar2.png',
				'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/avatar3.png',
				],
			tips:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/tips.png',
			imgList: [
				{
					mediaUrl:'http://lilian007.oss-cn-shanghai.aliyuncs.com/5.mp4',
					mediaType:1, //1是视频，0是图片
					scrollTop:0,
					id:1,
					inputValue:'',
					img_type:1,
					song:{icon:'GOOD',name:'往事与如何'},
					chatList:[
						{
							id:1,
							tableNumber:'799',
							userIcon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/photos/user.png',
							text:'真好听你撒范德萨范德萨你懂撒范德萨范德萨发，是否你懂撒范德萨发生的三废士大夫的萨芬你撒范德萨发撒范德萨发',
							type:0,
						},{
							id:2,
							tableNumber:'799',
							userIcon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/photos/user.png',
							text:'系统消息',
							goodsIcon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol5.png',
							goodsNumber:15,
							type:1,
						}
					]
				},{
					mediaUrl:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/swiperBG1.png',
					mediaType:0, //1是视频，0是图片
					scrollTop:0,
					song:{icon:'LIVE',name:'Current Songs'},
					id:2,
					inputValue:'',
					img_type:1,
					chatList:[]
				},{
					mediaUrl:'http://lilian007.oss-cn-shanghai.aliyuncs.com/5.mp4',
					mediaType:1, //1是视频，0是图片
					scrollTop:0,
					id:1,
					inputValue:'',
					img_type:1,
					song:{icon:'GOOD',name:'往事与如何'},
					chatList:[]
				},
			],
			bottomList:[
				{
					id:1,
					icon: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol1.png',
					name:'四叶草',
					price: 60
				},{
					id:2,
					icon: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol2.png',
					name:'四叶草',
					price: 123
				},{
					id:3,
					icon: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol3.png',
					name:'四叶草',
					price: 76
				},{
					id:6,
					icon: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol4.png',
					name:'四叶草',
					price: 79
				},{
					id:4,
					icon: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol5.png',
					name:'四叶草',
					price: 80
				},{
					id:5,
					icon: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol6.png',
					name:'四叶草',
					price: 123
				},{
					id:7,
					icon: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol7.png',
					name:'四叶草',
					price: 45
				},{
					id:8,
					icon: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol8.png',
					name:'四叶草',
					price: 79
				}
			]
		}
	},
	onLoad() {
		this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
		// this.videoObj = "#video0"
		// let videoContext = uni.createVideoContext(this.videoObj, this)
		// console.log(videoContext)
		// videoContext.play()
		
		var imagelist=this.imgList;
		var photo_video=uni.getStorageSync('photo_video');
		console.log(photo_video+'========');
		var lists='';
		if(photo_video[0]==1){
			console.log(photo_video[1]+'========');
			lists={
				bgUrl:photo_video[1],
				scrollTop:0,
				song:{icon:'LIVE',name:'Current Songs yyy'+photo_video[0]},
				id:2,
				inputValue:'',
				img_type:1,
				chatList:[]
			};
		}else if(photo_video[0]==2){
			console.log(photo_video[2]+'-----11111111');
			lists={
				bgUrl:photo_video[1],
				scrollTop:0,
				song:{icon:'LIVE',name:'Current Songs yyy'+photo_video[0]},
				id:2,
				inputValue:'',
				img_type:2,
				chatList:[]
			};
		}
		
		// imagelist.push(lists);
		// this.imgList=imagelist;
		// console.log(imagelist);
	},
	methods: {
		// 去分享
		goShare(){
			uni.navigateTo({url:'/pages/share/index'});
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
		
		// 点击商品
		handleGoodsItem(data){
			this.goodsItemActive = data.id
			this.recharge = data.price
			this.number = 1
		},
		handleConut(){
			this.number ++
		},
		handleGoods(num){
			this.$refs['pop'].show()
			this.index = num
			console.log(num)
			// 跳转商品购买 (这种跳转方式在H5上只能用相对路径)
			// uni.navigateTo({url:'../goods/index'});
		},
		// 赠送
		handleGive(){
			console.log(this.imgList[this.index].chatList)
			this.imgList[this.index].chatList = [
				...this.imgList[this.index].chatList,
				{
					id:this.imgList[this.index].chatList.length+1,
					tableNumber:'799',
					userIcon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/photos/user.png',
					text:"内容由系统发出",
					goodsIcon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol5.png',
					goodsNumber:this.number,
					type:1
				}
			]
			this.number = 0
			this.$refs['pop'].hide()
			this.$nextTick(()=>{
				// 注意：想要拿到元素实例，需要在实例已经挂载到页面上才可以
				const query = uni.createSelectorQuery().in(this);
				query.select('#content'+ this.index).boundingClientRect(data => {
					this.imgList[this.index].scrollTop = data.height
				}).exec();
				this.isShowFillImage = true
				setTimeout(() =>{
					this.isShowFillImage = false
				},4000)
			})
		},
		
	
		getIndex(index){
			this.index = index
		},
		// 获取文本框内容
		getChat(event){
			console.log(event)
			this.imgList[this.index].inputValue = event.target.value
		},
		// 点击发送
		handleSubmit(number){
			console.log(number)
			this.imgList[number].chatList = [
				...this.imgList[number].chatList,
				{
					id:this.imgList[number].chatList.length+1,
					tableNumber:'799',
					userIcon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/photos/user.png',
					text:this.imgList[number].inputValue,
				}
			]
			this.imgList[number].inputValue = ""
			this.index = null
			this.$nextTick(()=>{
				const query = uni.createSelectorQuery().in(this);
				query.select('#content'+ number).boundingClientRect(data => {
					console.log(data)
					this.imgList[number].scrollTop = data.height
				}).exec();
			})
		},
		// 返回聊天页面
		handleGoBack(){
			uni.navigateTo({url:'../index/index'});
		},
		
		// 滑动Swipper
		changeSwipper(event){
			console.log(event)
			// let index  = event.detail.current
			// //停止播放上一次的视频
			// let videoContextOld = uni.createVideoContext(this.videoObj, this)
			// videoContextOld.pause()
			// this.imgList.forEach(item => {
			// 	// mediaType == 1 表示上传的视频
			// 	if(item.mediaType == 1){
			// 		console.log(item)
			// 		// 如果为视频才赋值
			// 		this.videoObj = '#video'+index
			// 		// 播放本次视频
			// 		let videoContextNew = uni.createVideoContext('#video'+index, this)
			// 		console.log(videoContextNew)
			// 		videoContextNew.play()
			// 	}
			// })
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
		height: calc(100% - 200rpx);
		
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
		background-size: 630rpx auto;
		background-repeat: no-repeat;
		padding: 0 10rpx;
		box-sizing: border-box;
	}
</style>
