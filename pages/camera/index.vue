<template>
	<view class="content" >
		<hycamera class="videoSUBMIT"   @runMethod="getCarmera"></hycamera>
	</view>
</template>

<script>
	import hycamera from "@/components/shusheng-hycamera/shusheng-hycamera.vue"
	export default {
		components:{
			hycamera
		},
		data() {
			return {
				show:false,
				cameraIcon:"http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/camera/cameraIcon.png",
				downIcon:'http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/camera/down.png'
			}
		},
		onLoad() {
			// this.cameraCTX = uni.createCameraContext();
			this.show = true;
			
			// this.cameraCTX.takePhoto({
			// 	success: (res) => {
			// 		console.log(res);
			// 	},
			// 	fail(res) {
			// 		console.log("========= 调用开始录像失败 ===========",res)
			// 	}
			// })
		},
		created() {
			uni.showToast({
			    title: '成功------',
			    duration: 2000
			});
			this.cameraCTX = uni.createCameraContext();
			
		},
		methods: {
			// buttonStart() {
			// 	console.log(2222222222222);
			// 	let self = this
			// 	this.buttonNumber = 0;
			// 	this.buttonMethod = setInterval(function() {
			// 		self.buttonNumber++
					
			// 		if (self.buttonNumber > 0) {
			// 			console.log('按键开始');
			// 			self.buttonClass = "hycamera-button-lx"
			// 			if (self.isLX == false) {
			// 				self.isLX = true
							
			// 				console.log('进来了');
							
			// 				self.cameraCTX.startRecord({
			// 					success: (res) => {},
			// 					fail(res) {
			// 						console.log("========= 调用开始录像失败 ===========",res)
			// 					}
			// 				})
			// 			}
			// 		}
			// 	}, 1000)
			// },
			// buttonEnd() {
			// 	let self = this
			// 	clearInterval(this.buttonMethod)
			// 	this.buttonClass = "hycamera-button"
			// 	this.isLX = false
			// 	console.log('按键结束');
			// 	if (this.buttonNumber > 0) {
			// 		this.cameraCTX.stopRecord({
			// 			success: (res) => {
			// 				// this.$emit("runMethod","vedio",res)
			// 				console.log(res+'----+++++---');
			// 				// self.buttonNumber = ""
			// 			},
			// 			fail() {}
			// 		})
			// 	} else {
					
			// 		this.cameraCTX.takePhoto({
			// 			quality: 'high',
			// 			success: (res) => {
			// 				// this.$emit("runMethod","photo",res);
			// 				console.log(res+'-------');
			// 				// self.buttonNumber = ""
			
			// 			}
			// 		})
			// 	}
				
				
			// },
			
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
			// handleGoPhotos1(){
			// 	// 跳转商品购买 (这种跳转方式在H5上只能用相对路径)
			// 	uni.navigateTo({url:'../photos/index'});
			// },
			// handleGoPhotos() {
			//             const ctx = uni.createCameraContext();
			//             ctx.takePhoto({
			//                 quality: 'high',
			//                 success: (res) => {
			//                     this.src = res.tempImagePath
			//                 }
			//             });
			//         },
			//         error(e) {
			//             console.log(e.detail);
			//         }
			
		}
	}
</script>

<style lang="scss" scoped>
	/*每个页面公共css */
	
	
	.videoSUBMIT{
		position:absolute;
		z-index:9999999999999;
	}
</style>
