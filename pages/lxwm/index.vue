<template>
	<view class="content" :style="{background:`url(${BGUrl})`}" style="background-size: 750upx;">
		<view class="header">
			<image   class="wxlogo" :src="`${wxlogo}`" ></image>
			<view class="sdnum">微信客服</view>
		</view>
		<view class="btnTitle">Lovecloud1</view>
		<view class="xlBTN">
			<uni-collapse :accordion="true" class="btnTITL">
				<uni-collapse-item  v-for="item in accordion" :key="item.id" :title="item.title" :show-animation="item.animation">
					<text class="BTNcontent">{{ item.content }}</text>
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
				wxlogo:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/lxwm/wxlogo.png', 
				accordion: [{
						id: 0,
						title: '我可以反馈我的意见吗？',
						content: '我想要听到你对BeeHive 社交小程序服务的反馈、建议和提升意见。欢迎你添加我们的客服微信或发送邮件至 info@mustlisten.com',
						animation: true
					},
					{
						id: 1,
						title: '需要商务合作',
						content: '如果你想要和我们开展社交小程序的商务合作，请发送邮件至 info@mustlisten.com',
						animation: true
					}
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
