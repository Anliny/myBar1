<template>
	<view class="content" :style="{backgroundImage:`url(${BGUrl})`}" >
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
			<view class="icon tk-acumin-pro">Live</view>
			<view class="text tk-acumin-pro">Current Songs</view>
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
		<view class="bottomWapper">
			<view class="line"></view>
			<view class="chatWapper">
				<input adjust-position type="text" class="chatInput" @focus="handleFocus" @blur="getChat" :value="inputValue" />
				<image class="gave" :src="'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/goodsBtn.png'"  @click="handleGoods" mode="scaleToFill"></image>
				<view class="submit" @click="handleSubmit">发送</view>
			</view>
		</view>
		
		<n-transition ref="pop" speed="ease-in-out" :height="500" :maskVal="0.5">
			<view class="maskWapper">
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
					    @scroll="scroll">
						<view class="goodsWapper" >
							<view class="goodsItem" @click="handleGoodsItem(item)" v-for="item in bottomList" :key="item.id">
								<view class="icon" :class="[item.id == goodsItemActive ? 'iconHover' : '']">
									<image :src="item.icon" mode="scaleToFill"></image>
								</view>
								<view class="name">{{item.name}}</view>
								<view class="price">
									<image class="gem" src="../../static/images/gem.png"></image>
									{{item.price}}
								</view>
							</view>
						</view>
					</scroll-view>
					
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
			
			
	</view>
</template>

<script>
	import nTransition from "@/components/n-transition/n-transition.vue"
	// import hycamera from "@/components/shusheng-hycamera/shusheng-hycamera.vue"
	export default {
		components:{
			nTransition,
			// hycamera
		},
		data() {
			return {
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
					},{
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
			}
		},
		onLoad:function (options) {
			 setTimeout(function () {
				 console.log('start pulldown');
			 }, 1000);
			this.getClientHight()
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
		},
		
		 onPullDownRefresh() {
		        //监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
				var that=this;
		        console.log('refresh')
		        setTimeout(function () {
		            // uni.stopPullDownRefresh();  //停止下拉刷新动画
					// 跳转商品购买 (这种跳转方式在H5上只能用相对路径)
					uni.navigateTo({url:'/pages/camera/index'});
					// that.chooseImage();
		        }, 1000);
		    },

		methods: {
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
			//调用摄像头或选择文件上传
			// chooseImage() {
			// 	console.log(2222222);
			// 	uni.chooseImage({
			// 		count: 6, //默认9
			// 		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			// 		sourceType: ['album','camera'], //从相册选择、摄像头
			// 		success: function(res) {
			// 			console.log(JSON.stringify(res.tempFilePaths));
			// 		}
			// 	});
			// },
			// 跳转到用户列表
			handleGoUsers(){
				uni.navigateTo({url:'/pages/users/index'});
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./style.css");
	 /* "http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/font.css"; */
	/* page{
		height: 100%
	}
	.fontSize{
		color: #007AFF;
	} */
</style>
