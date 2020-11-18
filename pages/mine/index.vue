<template>
	<view class="content" :style="{background:`url(${BGUrl})`}" style="background-size: 750upx;">
		<view class="header">
			<image  class="head_img1" :src="`${head_img1}`"></image>
			<image  class="head_img2" :src="`${head_img2}`"></image>
			<image  class="sex" :src="`${sex}`"></image>
			<image  class="sex_1" :src="`${sex_1}`"></image>
		</view>
		<view class="nickname">nickname</view>
		<view class="btn-title">音乐点亮世界</view>
		<view class="btn-sdhz">
			<view  @tap="widraw"   class="btn-hz" :style="{background:`url(${sdhz}) no-repeat center`}">
				<image class="hz-img" :src="`${hz_img}`"></image>
				<view class="myhz" >我的赫兹</view>
				<view  class="btntx" :style="{background:`url(${cz_tx}) no-repeat center`}">可提现</view>
				<view class="btnhz">1856<text>hz</text></view>
			</view>
			<view  @tap="rechange"  class="btn-sd" :style="{background:`url(${sdhz}) no-repeat center`}">
				<image class="sd-img" :src="`${sd_img}`"></image>
				<view class="mysd">我的水滴</view>
				<view  class="btncz" :style="{background:`url(${cz_tx}) no-repeat center`}">可充值</view>
				<view class="btnsd" >22698</view>
			</view>
		</view>
		<view >
		<ul>
			<li class="btnPHONT" @tap="llmine">
				<image class="phone_img"  :src="phone_img"></image>
				<text>联络我们</text>
				<image class="right_img"  :src="right_img"></image>
				<view class="xian"></view>
			</li>
			<li class="btnPHONT" @tap="xybz">
				<image class="wen_img"  :src="wen_img"></image>
				<text>需要帮助</text>
				<image class="right_img"  :src="right_img"></image>
				<view class="xian"></view>
			</li>
		</ul>
		</view>
		<view class="btnSubmit" @tap="tcSubmit">
			<image class="tc_img" :src="tc_img"></image>
			<view class="">退出登录</view>
		</view>
		
	</view>
</template>

<script>
	// import adCell from '@/components/andy-adcell/andy-adcell.vue';
	export default {
		// components: {adCell},
		data() {
			return {
				
				BGUrl: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/mine_bg.png',
				head_img1:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/head_img1.png',
				head_img2:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/head_img2.png',
				sex:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/sex.png',
				sex_1:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/sex_1.png',
				sdhz:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/sdhz.png',
				hz_img:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/hz.png',
				sd_img:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/sd.png',
				cz_tx:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/cz_tx.png',
				phone_img:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/phone.png',
				right_img:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/right.png',
				wen_img:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/wen.png',
				tc_img:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/submit.png',
				current: 0,
				mode: 'round',
			}
		},
		onLoad() {
		},
		methods: {
			change(e) {
				this.current = e.detail.current;
			},
			submitBoy(e){
				// console.log(JSON.stringify(e));
				var id=e.currentTarget.dataset.id;
				
				 this.current=0;
				this.info=[];
				
				if(id==1){
					console.log(id+'--boy----'+this.current);
					uni.redirectTo({
					  url: '/pages/users_grils/index'
					});
				
					// this.info=userData1;
					// console.log(userData1);
				}else{
					// this.info=userData;
				}
			},
			subMit(e){
				//跳转对应的应邀页面
				var id=e.currentTarget.dataset.id;
				console.log(id);
				uni.navigateTo({
				   url: '/pages/share/index?id='+id
				});
			},
			widraw(){
				console.log(222222);
				uni.navigateTo({
				   url: '/pages/widraw/index'
				});
			},
			rechange(){
				console.log(222222);
				uni.navigateTo({
				   url: '/pages/rechange/index'
				});
			},
			llmine(){
				console.log(666666);
				uni.navigateTo({
				   url: '/pages/lxwm/index'
				});
			},
			xybz(){
				console.log(777777);
				uni.navigateTo({
				   url: '/pages/xybz/index'
				});
			},
			tcSubmit(){
				
				uni.switchTab({
				   url: '/pages/home/index'
				});
			}
			
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("./style.scss");
</style>
