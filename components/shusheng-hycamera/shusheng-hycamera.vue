<template>
	<view class="hycamera">
		<cover-image class="contentCamera" @tap="videoback" :src="cameraIcon" mode="scaleToFill"></cover-image>
		
		<cover-view :class="buttonClass" @touchstart="buttonStart" @touchend="buttonEnd">
			{{buttonNumber}}
		</cover-view>
		
		<camera   class="hycamera-camera" :device-position="back" bindstop="" flash="auto"></camera>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				buttonClass: "hycamera-button",
				cameraIcon:"http://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/camera/cameraIcon.png",
				isLX: false,
				buttonNumber:"",
				back:'back'
			}
		},
		created() {
			uni.authorize({
			    scope: 'scope.record',
			    success() {
			      
			    }
			})
			uni.showToast({
			    title: '成功------',
			    duration: 2000
			});
			this.cameraCTX = uni.createCameraContext();
		},
		methods: {
			videoback(){
				var back=this.back;
				console.log('back======'+back+'----------');
				if(back=='back'){
					this.back='front';
				}else{
					this.back='back';
				}
			},
			buttonStart() {
				console.log(2222222222222);
				let self = this
				this.buttonNumber = 0;
				this.buttonMethod = setInterval(function() {
					self.buttonNumber++
					
					if (self.buttonNumber > 0) {
						self.buttonClass = "hycamera-button-lx"
						uni.showToast({
						    title: self.isLX+'---长按-----',
						    duration: 2000
						});
						if (self.isLX == false) {
							self.isLX = true
						
							self.cameraCTX.startRecord({
								success: (res) => {
									uni.showToast({
									    title: self.isLX+'---长按成功-----',
									    duration: 2000
									});
								},
								fail(res) {
									uni.showToast({
									    title: self.isLX+'---失败-----',
									    duration: 2000
									});
									console.log("========= 调用开始录像失败 ===========",res)
								}
							})
						}else{
							uni.showToast({
							    title: self.isLX+'---失败11111-----',
							    duration: 2000
							});
						}
					}
				}, 1000)
			},
			buttonEnd() {
				let self = this
				clearInterval(this.buttonMethod)
				this.buttonClass = "hycamera-button"
				this.isLX = false
				console.log(1111111111111111111);
				if (this.buttonNumber > 0) {
			
					this.cameraCTX.stopRecord({
						success: (res) => {
							this.$emit("runMethod","vedio",res)
							console.log(res+'----+++++---');
							self.buttonNumber = ""
						},
						fail() {}
					})
				} else {
		
					this.cameraCTX.takePhoto({
						quality: 'high',
						success: (res) => {
							this.$emit("runMethod","photo",res);
							console.log(res+'-------');
							self.buttonNumber = ""

						}
					})
				}
				
				
			}
		}
	}
</script>

<style>
	.hycamera {
		position: fixed;
		height: 100%;
		width: 100%;
		z-index: 10;
	}
 .contentCamera{
		position: absolute;
		width: 46rpx;
		height: 38rpx;
		right: 53rpx;
		top: 114rpx;
		z-index:99;
	}
	.hycamera-camera {
		position: absolute;
		height: 100%;
		width: 100%;
		z-index: 1;
	}

	.hycamera-button {
		height: 60px;
		width: 60px;
		position: absolute;
		z-index: 999;
		background-color: #3F536E;
		bottom: 50px;
		left: 50%;
		margin-left: -50px;
		border: 2px solid #ffffff;
		border-radius: 50px;
		transition: all 0.2s linear;
		text-align: center;
		line-height: 60px;
		color:#ffffff;
		font-size: 30px;
	}

	.hycamera-button:active {
		background-color: #1c2632;
	}

	.hycamera-button-lx {
		height: 60px;
		width: 60px;
		position: absolute;
		z-index: 999;
		background-color: #ca0000;
		bottom: 50px;
		left: 50%;
		margin-left: -50px;
		border: 2px solid #ffffff;
		border-radius: 50px;
		text-align: center;
		line-height: 60px;
		color:#ffffff;
		font-size: 30px;
	}
	.hycamera-qh{
		height: 40px;
		width: 40px;
		position: absolute;
		z-index: 999;
		bottom: 80px;
		left: 20px;
	}
</style>
