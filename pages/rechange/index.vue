<template>
	<view class="content" :style="{background:`url(${BGUrl})`}" style="background-size: 750upx;">
		<view class="header">
			<image  class="sdbg" :src="`${sdbg}`"></image>
			<image   class="mysd" :src="`${mysd}`" ></image>
			<view class="sdnum">123278</view>
		</view>
		<view class="example-body">
			<uni-grid :column="3" :showBorder="false" :square="false" :highlight="false" @change="change" >
				<uni-grid-item   v-for="(item, index) in list" :index="index" :key="index">
					<view class="grid-item-box" :class="{'active':item.type == 1}" @tap="tapInfo(index)">
						<image :src="item.url" class="image" mode="aspectFill" />
						<text class="sd">{{ item.sdnum }}</text>
						<text class="many">￥</text><text class="text">{{ item.text }}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="btnSubmit">
			立即充值
		</view>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import uniBadge from '@/components/uni-badge/uni-badge.vue'
	export default {
		components: {
			uniSection,
			uniGrid,
			uniGridItem,
			uniBadge
		},
		data() {
			return {
				BGUrl: 'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/mine_bg.png',
				sdbg:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/sdbg.png', 
				mysd:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/rechange/mysd.png', 
				list: [{
					
						url: 'https://lwsk0827.oss-cn-shanghai.aliyuncs.com/lwsk/imgs/20201111/sd.png',
						text: '25.00',
						id: '1',
						type: "1",
						sdnum:'12345'
					},
					{
						url: 'https://lwsk0827.oss-cn-shanghai.aliyuncs.com/lwsk/imgs/20201111/sd.png',
						text: '26.00',
						id: '2',
						type: "2",
						sdnum:'12345'
					},
					{
						url: 'https://lwsk0827.oss-cn-shanghai.aliyuncs.com/lwsk/imgs/20201111/sd.png',
						text: '27.00',
						id: '3',
						type: "2",
						sdnum:'12345'
					},
					{
						url: 'https://lwsk0827.oss-cn-shanghai.aliyuncs.com/lwsk/imgs/20201111/sd.png',
						text: '28.00',
						id: '4',
						type: "2",
						sdnum:'12345'
					},
					{
						url: 'https://lwsk0827.oss-cn-shanghai.aliyuncs.com/lwsk/imgs/20201111/sd.png',
						text: '29.00',
						id: '5',
						type: "2",
						sdnum:'12345'
					},
					{
						url: 'https://lwsk0827.oss-cn-shanghai.aliyuncs.com/lwsk/imgs/20201111/sd.png',
						text: '30.00',
						id: '6',
						type: "2",
						sdnum:'12345'
					},
					{
						url: 'https://lwsk0827.oss-cn-shanghai.aliyuncs.com/lwsk/imgs/20201111/sd.png',
						text: '32.00',
						id: '7',
						type: "2",
						sdnum:'12345'
					},
					{
						url: 'https://lwsk0827.oss-cn-shanghai.aliyuncs.com/lwsk/imgs/20201111/sd.png',
						text: '31.00',
						id: '8',
						type: "2",
						sdnum:'12345'
					},
					{
						url: 'https://lwsk0827.oss-cn-shanghai.aliyuncs.com/lwsk/imgs/20201111/sd.png',
						text: '33.00',
						id: '9',
						type: "2",
						sdnum:'12345'
					}
				]
			}
		},
		onLoad() {
		},
		methods: {
			change(e) {
				this.current = e.detail.current;
			},
			tapInfo(e) {
					var lits=this.list;
					var id=lits[e].id;
					var that=this;
					for(var i=0;i<lits.length;i++){
						if(id==lits[i].id){
							that.list[i].type=1;
						}else{
							that.list[i].type=2;
						}
					}
					
				}
			
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("./style.scss");
</style>
