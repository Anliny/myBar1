<script>
	export default {
	 globalData: {  
		BottomBlackLineHeight: 0  
	  },  
		onLaunch: function() { 
			console.log('App Launch')
			// 获取手机信息
			    this.getMobileInfo();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
		    getMobileInfo() {
		      const mobileInfo = uni.getSystemInfoSync();
		      let BottomBlackLineHeight = ""; //iphoneX底部一条黑线，有些页面要避开
		      let iphoneXArr = ["iPhone X", "iPhone 11", "iPhone 11 Pro Max"];
		      iphoneXArr.forEach(function(item) {
		        if (mobileInfo.model.search(item) !== -1) {
		          // BottomBlackLineHeight = "30rpx";
				  getApp().globalData.BottomBlackLineHeight = '30rpx'
		        }
		      });
		    }
		  },
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./static/style.css");
	@import url("./static/font.css");
	/* @import url("https://use.typekit.net/ngv0bfi.css") */
	/* <link rel="stylesheet" href="https://use.typekit.net/ngv0bfi.css"> */
	/* @import url("./static/font/iconfont.css"); */
</style>
