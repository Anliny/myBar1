<template>
			<view class="content" v-bounce :style="{backgroundImage:`url(${BGUrl})`}"  @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend">
				<view class="appBar" :style="{ height: iStatusBarHeight + 'px'}"></view>
				<view class="header" ref="refHeader">
					<view class="logo">
						<image :src="logo"   mode="scaleToFill"></image>
					</view>
					<view class="nameWapper">
						<view class="title">上海双人舞酒吧</view>
						<view class="number">当晚人数：769</view>   
					</view>
					<view class="avatar">
						<view class="item" v-for="(item,index) in avatarList" :key="index" @click="handleGoUsers">
							<image :src="item" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				<view class="textWapper">
					<!-- <view class="icon tk-acumin-pro">Live</view> -->
					<!-- <view class="text tk-acumin-pro">Current Songs</view> -->
					<view class="image-wapper">
						<image class="image" src="../../static/images/live_02.png" mode="aspectFit"></image>
					</view>
					<image class="text-image" src="http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/static/111_03.png" mode="aspectFit"></image>
				</view>
				<view :style="{ height: 91 - iStatusBarHeight + 'px'}" class="empetTop"></view>
				<view class="chatContanner" style="position: relative;" >
					<view class="chatView" style="">
						<scroll-view id="scroll" ref="refScollView" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"@scroll="scroll">
							<view id="content">
								<view  v-for="item in chatList" :key="item.id" style="margin-bottom: 10upx;padding: 5rpx 0;">
									<view class="chatItem" v-if="!item.type">
										<view class="tableNumber" v-if="item.tableNumber">{{item.tableNumber}}</view>
										<image class="userIcon" :src="item.userIcon" mode="scaleToFill"></image>
										<view class="text">{{item.text}}</view>
									</view>
									<view class="systemChatItem" v-else>
										<view class="tableNumber" v-if="item.tableNumber">{{item.tableNumber}}</view>
										<image class="userIcon" :src="item.userIcon" mode="scaleToFill"></image>
										<view class="text">{{item.text}}</view>
										<view class="goods">
											<image class="goodsIcon" :src="item.goodsIcon" mode="scaleToFill"></image>
											<view class="number tk-acumin-pro">x {{item.goodsNumber}}</view>
										</view>
									</view>
								</view>
							</view>
						 </scroll-view>
					</view>
				</view>
				<view class="empetBottom"></view>
				<view class="bottomWapper" :style="{height:isIOSBottomHeight}">
					<view class="line"></view>
					<view class="chatWapper">
						<input adjust-position type="text" class="chatInput" @focus="handleFocus" @blur="getChat" :value="inputValue" />
						<view class="submit" @click="handleSubmit">发送</view>
						<image class="gave" :src="'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/goodsBtn.png'"  @click="handleGoods" mode="scaleToFill"></image>
						<image class="gave" :src="'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/dianzan.png'"  mode="scaleToFill"></image>
					</view>
				</view>
				
				<n-transition ref="pop" speed="ease-in-out" :height="500" :maskVal="0.5">
					<view class="maskWapper">
						<view class="page-section swiper">
							<view class="goodsWapper">
								<swiper class="swiper" @change="swiperChange" style="width: 100%; height: 100%;" :indicator-dots="false" :autoplay="false" :duration="300">
									<swiper-item class="goodsWapper" v-for="(row,index) in bottomList" :key="index">
										<view class="goodsItem" @click="handleGoodsItem(item)" v-for="item in row" :key="item.id">
											<view class="icon" :class="[item.id == goodsItemActive ? 'iconHover' : '']">
												<image :src="item.icon" mode="scaleToFill"></image>
											</view>
											<view class="name">{{item.name}}</view>
											<view class="price">
												<image class="gem" src="../../static/images/gem.png"></image>
												{{item.price}}
											</view>
										</view>
									</swiper-item>
								</swiper>
								
								<div class="dots-container">
								  <div v-for="(ad, index) in bottomList" :key="index">
									<div :class="['dot', index === swiperCurrent ? 'active' : '']"></div>
								  </div>
								</div>
							</view>
						</view>
							
						<view class="payment">
							<view class="recharge">
								<image class="gem" src="../../static/images/gem.png"></image>
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
				<uniLocker :isshow="isShow" classname="bounceInDown" title="菜单" :lockermenu="lockerMenu" @close="close" >
					<hycamera class="videoSUBMIT" @closeCamera="closeCamera"   @runMethod="getCarmera"></hycamera>
				</uniLocker>
			</view> 
	
</template>

<script>
	import nTransition from "@/components/n-transition/n-transition.vue"
	import hycamera from "@/components/shusheng-hycamera/shusheng-hycamera.vue"
	
	import uniLocker from '@/components/xiaolangtou-locker/uni-locker.vue'
   import Bounce from 'vue-bounce'

	// import hycamera from "@/components/shusheng-hycamera/shusheng-hycamera.vue"
	export default {
		components:{
			nTransition,hycamera,uniLocker 
			// hycamera
		},
		data() {
			return {
				flag: 0,
				text: '',
				lastX: 0,
				lastY: 0,

				
				isShow:false,
				swiperCurrent:0,
				isIOSBottomHeight:0,
				iStatusBarHeight: 0,
				scrollTop:200,
				recharge:0,
				old: {
					scrollTop: 0
				},
				goodsItemActive:null,
				recharge:0,
				number:0,
				isShowFillImage:false,
				BGUrl: 'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/bg.jpg',
				logo: 'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/logo.png',
				avatarList:[
					'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/avatar1.png',
					'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/avatar2.png',
					'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/avatar3.png',
					],
				tips:'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/tips.png',
				inputValue:'',
				chatList:[
					{
						id:1,
						tableNumber:'799',
						userIcon:'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/index/user.png',
						text:'真好听你撒范德萨',
						type:0,
					},{
						id:2,
						tableNumber:'799',
						userIcon:'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/index/user.png',
						text:'系统消息',
						goodsIcon:'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol5.png',
						goodsNumber:15,
						type:1,
					}
				],
				
				bottomList:[
					[
						{
							id:1,
							icon: 'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol1.png',
							name:'四叶草',
							price: 60
						},{
							id:2,
							icon: 'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol2.png',
							name:'四叶草',
							price: 123
						},{
							id:3,
							icon: 'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol3.png',
							name:'四叶草',
							price: 76
						},{
							id:6,
							icon: 'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol4.png',
							name:'四叶草',
							price: 79
						},{
							id:4,
							icon: 'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol5.png',
							name:'四叶草',
							price: 80
						},{
							id:5,
							icon: 'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol6.png',
							name:'四叶草',
							price: 123
						},{
							id:7,
							icon: 'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol7.png',
							name:'四叶草',
							price: 45
						},{
							id:8,
							icon: 'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol8.png',
							name:'四叶草',
							price: 79
						}
					],
					[
						{
							id:9,
							icon: 'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol7.png',
							name:'四叶草',
							price: 45
						},{
							id:10,
							icon: 'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol8.png',
							name:'四叶草',
							price: 79
						}
					]
					
				]
			}
		},
		onLoad:function (options) {
			 setTimeout(function () {
				 console.log('start pulldown');
			 }, 1000);
			 
			// console.log(getApp().globalData.BottomBlackLineHeight+' 11111111111111111111111')
			let height = getApp().globalData.BottomBlackLineHeight
			 this.isIOSBottomHeight = (130+height) +'rpx'
			this.getClientHight()
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
			
			switch(uni.getSystemInfoSync().platform){
			    case 'android':
			       console.log('客户端是Android')
			       break;
			    case 'ios':
			       console.log('客户端是iOS')
			       break;
			    case 'devtools':
			       console.log('客户端是在开发者工具上')
			       break;
			    default:
			       console.log('客户端是在其他工具上')
			       break;
			}
		},
		
		 // onPullDownRefresh() {
		 //        //监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			// 	var that=this;
		 //        console.log('refresh')
		 //        setTimeout(function () {
		 //            // uni.stopPullDownRefresh();  //停止下拉刷新动画
			// 		// 跳转商品购买 (这种跳转方式在H5上只能用相对路径)
			// 		uni.navigateTo({url:'/pages/camera/index'});
			// 		// that.chooseImage();
		 //        }, 1000);
		 //    },
		 
		 onReady:function(options){
			 this.disableTachMove()
		 },

		methods: {
			disableTachMove(){
				console.log(document)
				document.body.addEventListener('touchmove', function (e) { 
					e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果) 
					console.log(e)
				}, {passive: false}); //passive 参数不能省略，用来兼容ios和android
			},
			
			handletouchmove: function(event) {
			            // console.log(event)
			            if (this.flag !== 0) {
			                return;
			            }
			            let currentX = event.touches[0].pageX;
			            let currentY = event.touches[0].pageY;
			            let tx = currentX - this.lastX;
			            let ty = currentY - this.lastY;
			            let text = '';
			            this.mindex = -1;
						
			            //左右方向滑动
			            if (Math.abs(tx) > Math.abs(ty)) {
			                if (tx < 0) {
			                    text = '向左滑动';
			                    this.flag = 1;
			                //  this.getList();  //调用列表的方法
			                } else if (tx > 0) {
			                    text = '向右滑动';
			                    this.flag = 2;
			                }
			            }
			            //上下方向滑动
			            else {
			                if (ty < 0) {
			                    text = '向上滑动';
			                    this.flag = 3;
			                //  this.getList();  //调用列表的方法
			                } else if (ty > 0) {
			                    text = '向下滑动';
			                    this.flag = 4;
								this.isShow = true
			                }
			            }
			 
			            //将当前坐标进行保存以进行下一次计算
			            this.lastX = currentX;
			            this.lastY = currentY;
			            this.text = text;
			        },
			        handletouchstart: function(event) {
			            // console.log(event)
			            this.lastX = event.touches[0].pageX;
			            this.lastY = event.touches[0].pageY;
			        },
			        handletouchend: function(event) {
			            this.flag = 0;
			            this.text = '没有滑动';
			        },
			
			// 关闭抽屉
			close(){
				this.isShow = false
			},
			
			// 
			closeCamera(){
				this.isShow = false
			},
			
			getCarmera(type,res){
				console.log(type,res)
				uni.showToast({
				    title: '成功'+type,
				    duration: 2000
				});
				setTimeout(function(){
					var photolist=[];
					if(type=='photo'){
						//图片  res.tempImagePath  图片地址tempImagePath
						console.log('photo:'+res.tempImagePath);
						uni.setStorageSync('photo_video',res.tempImagePath);
						photolist=[1,res.tempImagePath];
						
					}else if(type=='vedio'){
						//录像图片 res.tempImagePath    tempThumbPath
						uni.setStorageSync('photo_video',res.tempThumbPath);
						photolist=[2,res.tempThumbPath,res.tempVideoPath];
						//tempVideoPath
						console.log('photo:'+res.tempThumbPath+'---video:'+res.tempVideoPath);
					    //录像地址 res.tempVideoPath
					}
					uni.setStorageSync('photo_video',photolist);
					uni.navigateTo({url:'/pages/photos/index'});
				},2000);
			},
			
			pageChange(e){
				let current = e.target.current
				if(current == 0){
					
				}
			},
			
			// 赠送
			handleGive(){
				this.chatList = [
					...this.chatList,
					{
						id:this.chatList.length+1,
						tableNumber:'799',
						userIcon:'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/index/user.png',
						text:"内容由系统发出",
						goodsIcon:'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol5.png',
						goodsNumber:this.number,
						type:1
					}
				]
				this.number = 0
				this.$refs['pop'].hide()
				this.$nextTick(()=>{
					// 注意：想要拿到元素实例，需要在实例已经挂载到页面上才可以
					const query = uni.createSelectorQuery().in(this);
					query.select('#content').boundingClientRect(data => {
						this.scrollTop = data.height
					}).exec();
					this.isShowFillImage = true
					setTimeout(() =>{
						this.isShowFillImage = false
					},4000)
				})
			},
			
			handleConut(){
				this.number ++
			},
			
			// 点击商品
			handleGoodsItem(data){
				this.goodsItemActive = data.id
				this.recharge = data.price
				this.number = 1
				uni.navigateTo({url:'/pages/gift/index'});
			},
			
			// 获取屏幕高度
			getClientHight() {
				let that = this;
				uni.getSystemInfo({
					success(res) {
						console.log(res.screenHeight); //获取手机设备屏幕高度
						// that.clientHight = res.screenHeight;
						// that.footerHight = that.clientHight * 0.1;
					}
				})
			},
			
			upper: function(e) {
				// console.log(e)
			},
			lower: function(e) {
				// console.log(e)
			},
			scroll: function(e) {
					// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			
			
			// 文本框焦点事件
			handleFocus(e){
				// 获取键盘高度， H5上无法获取
				// alert(e.detail.height)
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
						userIcon:'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/index/user.png',
						text:this.inputValue,
						type:0
					}
				]
				this.inputValue = ""
				this.$nextTick(()=>{
					// 注意：想要拿到元素实例，需要在实例已经挂载到页面上才可以
					const query = uni.createSelectorQuery().in(this);
					query.select('#content').boundingClientRect(data => {
						this.scrollTop = data.height
					}).exec();
				})
			},
			
			handleGoods(){
				this.$refs['pop'].show()
				// 跳转商品购买 (这种跳转方式在H5上只能用相对路径)
				// uni.navigateTo({url:'../goods/index'});
			},
			
			// 跳转到用户列表
			handleGoUsers(){
				uni.navigateTo({url:'/pages/users/index'});
			},
			
			// 切换礼物
			swiperChange (e) {
			    this.swiperCurrent = e.detail.current
			  }

		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./style.css");
	.dots-container {
	  position: absolute;
	  width: 120rpx;
	  left: 50%;
	  margin-left: -60rpx;
	  top: 530rpx;
	  display: flex;
	  justify-content: center;
	  background:linear-gradient(#d6d6d6, #5d5d5d);
	  border-radius: 8rpx;
	}
	.dot {
	  margin-right: 0;
	  width: 60rpx;
	  height: 8rpx;
	  border-radius:0;
	}
	.dot.active {
	  background:linear-gradient(90deg, #68248b, #cf6a8e);
	  border-radius: 8rpx;
	}
</style>
