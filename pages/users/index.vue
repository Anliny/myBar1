<template>
	<view class="content" :style="{background:`url(${BGUrl})`}" style="background-size: 750upx;">
		<view class="appBar" :style="{ height: iStatusBarHeight + 'px'}"></view>
		<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
		    <swiper class="swiper-box" @change="change">
		        <swiper-item v-for="(item ,index) in info" :key="index">
		            <view class="swiper-item" >
						<view class="avatar" v-for="(content,index) in item.content" v-if="content !== null "  :key="index" @tap="subMit" :data-id="content.id">
							<view class="number" v-if="(index+1)%12 == 0">{{content.total}}+</view>
							<image :src="content.src || ''" mode="scaleToFill" :class="{shadow:content.isSide}"></image>
						</view>
						<view class="avatar" v-else></view>
		            </view>
		        </swiper-item>
		    </swiper>
		</uni-swiper-dot>
		<view class="textWapper">
			<view class="icon" @tap="submitBoy" data-id="1"><text class="icon_text">Live</text><text class="sex">girls</text></view>
			<view class="text tk-acumin-pro">Current Songs</view>
		</view>
		<view class="bottles">
			<image :src="bottles" mode="scaleToFill"></image> 
		</view>
		
		
		
		<view class="table">
			<view class="tableLeft">
				<view class="tableItem" v-for="(table,index) in tableList.tableLeft" :key= "table.id">
					<image class="tableBg" :src="tabelBg" mode="scaleToFill"></image>
					<image 
						v-for="(user,index) in table.users" 
						:key="user.id" 
						:style="{transform: `rotateZ(${(360/table.users.length)*index}deg) translateY(150rpx) rotateZ(${-(360/table.users.length)*index}deg)`}"
						:class="{shadow:user.isShadow,zIndex:user.isShadow}" 
						class="user" 
						:src="user.userUrl" 
						mode="scaleToFill" @tap="mySubmit" :data-id="user.userId">
						
					</image>
					<view class="number">{{table.tabelNumber}}</view>
				</view>
			</view>
			<view class="tableRight">
				<view class="tableItem" v-for="table in tableList.tableRight" :key= "table.id">
					<view class="number">{{table.number}}</view>
					<image class="seat redius" :class="{shadow:table.isShadow}" :src="table.tabelUrl" mode="scaleToFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
     import {userData,tableList,userData1} from "./mock.js"
	export default {
		components: {uniSwiperDot},
		data() {
			return {
				BGUrl: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/bg.jpg',
				tabelBg: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/tableBG.png',
				bottles:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/users/bottles.png',
				info: userData,
				tableList:tableList,
				current: 0,
				mode: 'round',
				iStatusBarHeight: 0
			}
		},
		onLoad() {
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
		},
		methods: {
			change(e) {
				this.current = e.detail.current;
			},
			mySubmit(e){
				// 获取我当前的数据  跳转个人中心
				var id=e.currentTarget.dataset.id;
				uni.navigateTo({
				  url: '/pages/mine/index'
				});
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
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("./style.scss");
</style>
