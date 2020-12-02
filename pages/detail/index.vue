<template>
	<view class="content" :style="{backgroundImage:`url(${BGUrl})`}" >
		<!-- <view :style="{ height: iStatusBarHeight + 'px'}"></view> -->
		<view class="page-bar" :style="{top:`${iStatusBarHeight}px`}">
			<image @click="handleGoBack" class="left-icon" :src="leftIocon" mode="aspectFill"></image>
			<view class="right-icon" ></view>
			<view class="title">发布详情</view> 
		</view>
		<video class="video"  :id="`video${data.id}`"
			preload="true"
			webkit-playsinline="true"
			x5-video-player-type="h5"
			x5-video-orientation="portraint" 
			ref="`myVideo${index}`" 
			:show-play-btn="false" 
			:show-loading='true'	
			object-fit="fill" 
			:src="data.mediaUrl" 
			:show-center-play-btn="false" 
			:controls="false" 
			@error="videoErrorCallback" 
			:autoplay="true" loop>
		</video>
		<n-transition ref="pop" speed="ease-in-out" :height="700" :maskVal="0" :isHide="true">
			<view class="comment">
				<view class="icon-btn-group">
					<view class="left">
						<image :src="enjoyIcon" mode="aspectFit"></image>
						<view class="text">{{data.enjoy}}</view>
					</view>
					<view class="right">
						<image :src="chatIcon" mode="aspectFit"></image>
						<view class="text">{{data.chat}}</view>
					</view>
				</view>
				<view class="comment-list"  >
					<view class="comment-item" v-for="item in data.comments" :key="item.userId">
						<view class="title-wapper">
							<image :src="item.avatar" mode="aspectFit"></image>
							<view class="title">
								<text class="name">{{item.name}}</text><br/>
								<text class="text">{{item.text}}</text>
							</view>
						</view>
						<view class="content">{{item.content}}</view>
					</view>
				</view>
			</view>
		</n-transition>
	</view>
</template>

<script>
	import nTransition from "@/components/n-transition/n-transition1.vue"
	export default {
		components:{
			nTransition
		},
		data() {
			return {
				iStatusBarHeight:0,
				BGUrl: 'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/bg.jpg',
				leftIocon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/icon_03.png',
				chatIcon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/icon_09.png',
				enjoyIcon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/icon_08.png',
				data:null,
			}
		},
		onLoad:function (options) {
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
			// 获取列表参数
			console.log(options)
			
			this.data = {
				  id: 1,
				  image_url:
				    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599475741266&di=e36d6c01c93320e2ba1504d8357248f4&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F30%2F29%2F01300000201438121627296084016.jpg",
				  title: "Tonight",
				  flag:false,
				  check:false,
				  avatar:'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/avatar1.png',
				  mediaUrl:'http://lilian007.oss-cn-shanghai.aliyuncs.com/5.mp4',
				  chat:99,
				  enjoy:12,
				  comments:[
						{
							avatar:'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/avatar1.png',
							name:'Frodo Baggins',
							userId:1,
							text:'音乐点亮世界',
							content:'本仓库为了帮助更多初学者或是爱好者，仅供学习交流，严禁用于商业用途，仓库中使用Api均来自于网络，如涉及侵犯个人或者团体利益，请与我取得联系，我将主动删除一切相关资料，谢谢！'
						},
						{
							avatar:'https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/avatar1.png',
							name:'Frodo Baggins',
							userId:1,
							text:'音乐点亮世界',
							content:'本仓库为了帮助更多初学者或是爱好者，仅供学习交流，严禁用于商业用途，仓库中使用Api均来自于网络，如涉及侵犯个人或者团体利益，请与我取得联系，我将主动删除一切相关资料，谢谢！'
						}
					]
				}
			this.$nextTick(()=>{
				this.$refs['pop'].show()
			})
		},
		methods: {
			// 视频错误
			error(event){
				console.log(event)
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
</style>
