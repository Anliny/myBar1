<template>
	<view class="content" :style="{background:`url(${BGUrl})`}" style="background-size: 750upx;">
		<view class="header">
			<image   class="wxlogo" :src="`${phonelogo}`" ></image>
			<view class="sdnum">客服电话</view>
		</view>
		<view class="btnTitle">400-564-5246</view>
		<view class="ctime">工作时间:09:00~18:00</view>
		<view class="xlBTN">
			<uni-collapse :accordion="true" class="btnTITL">
				<uni-collapse-item  v-for="item in accordion" :key="item.id" :title="item.title" :show-animation="item.animation">
					<!-- <text class="BTNcontent" v-html="item.content"></text> -->
					
						<rich-text class="BTNcontent" :nodes="item.content"></rich-text>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
		},
		data() {
			return {
				BGUrl: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/mine_bg.png',
				phonelogo:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/xybz/phonelogo.png', 
				accordion: [
					{
						id: 0,
						title: '这是什么？',
						content: '这是我们为你准备的 BeeHive 社交小程序，它将帮助你子啊 BeeHive 酒吧里交到更多的好朋友。',
						animation: true
					},
					{
						id: 1,
						title: '如何重新载入小程序',
						content: '如果你的小程序使用异常，我们建议你重新载入小程序，这里提供了4种方法：<br>1.你可以点击有上角【...】按钮，选择下面的【重新进入小程序】图标；<br/>2.彻底退出微信，并出重新打开 BeeHive 社交小程序；<br/>3.退出小程序，重新扫描手环上的小程序码；<br/>4.退出小程序，长按小程序拖拽删除，重新添加小程序；',
						animation: true
					},
					{
						id: 2,
						title: '如何刷礼物给朋友？',
						content: '在小程序中选中朋友的头像，选择礼物的类型，点击“发送”即可',
						animation: true
					},
					{
						id: 3,
						title: '收到的礼物可以再转送给其他人吗？',
						content: '你收到的礼物是不可以转送他人，但可以将礼物折价后提现至你的微信钱包',
						animation: true
					},
				],
			}
		},
		onLoad() {
			console.log(1111111111111111111111111111);
		},
		methods: {
			
			
			
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("./style.scss");
</style>
