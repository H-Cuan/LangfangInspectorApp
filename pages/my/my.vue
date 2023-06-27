<template>
	<view class="content">
		<view class="mine-top">
			<view class="">
				<view class="mine-top-img">
					<image :src="avatar"
						style="width: 67px; height: 67px; border-radius: 50%; border: 1px white solid;" mode=""></image>
				</view>
				<view class="mine-top-info">
					<view class="">
						<text style="font-size: 19px;">{{name}}</text>
						<span style="
						padding: 0 2px 0 2px;
						text-align: center;
						display: inline-block;
						margin-left: 10px;
						height: 25px;
						line-height: 25px;
						background: linear-gradient(90deg, #FFE8C9 0%, #FCD39D 100%);
						border-radius: 10px 10px 10px 10px;
						opacity: 1;
						color: #B5713D;
						border: 0px solid #FFEBCB;">{{user_type}}</span>
					</view>
					<text style="font-size:14px ;margin-top: 8px;">ID:{{id}}</text>
				</view>
			</view>
		</view>
		<view class="mine-center">
			<view class="mine-center-content" @click="Personal">
				<image class="left-icon" src="@/static/gerenxx.png" mode=""></image>
				<view>
					个人信息
				</view>
				
			</view>
			<view class="mine-center-content" @click="changePassword">
				<image class="left-icon" src="@/static/xiugaimm.png" mode=""></image>
				<view>
					修改密码
				</view>
			
			</view>
			<view style="height: 10px;background-color: #f3f5f9;"></view>
			<view class="mine-center-content" @click="clearBuffer">
				<image class="left-icon" src="@/static/7552@3x.png" mode=""></image>
				<view>
					清除缓存
				</view>
			</view>
<view class="mine-center-content" @click="logout">
				<image class="left-icon" src="@/static/logout.png" mode=""></image>
				<view>
					退出登录
				</view>
			
			</view>
		</view>
		<tabbar></tabbar>
	</view>
</template>

<script>
	import axios from 'axios'
	import {getInfo, logout} from '@/api/api.js'
	export default {
		data() {
			return {
				avatar:'',
				name: '',
				id:"",
				token:"",
				user_type:''
				
			};
		},
		components: {},
		created() {
			this.initInfo()
		},
		mounted() {
			this.initInfo()
		},
		onShow() {
			this.initInfo()
		},
		methods: {
	
			async initInfo(){
					const that = this
				await getInfo().then(res=>{
					console.log(res)
					that.avatar = res.data.data.user.avatar
					that.id = res.data.data.user.id
					that.name =res.data.data.user.nickname
				console.log(that.avatar)
					res.data.data.user.user_type ==200?that.user_type = '基础民警':that.user_type='管理层'
				})
			},
			changePassword(){
				uni.navigateTo({
					url: '../changePw/changePw'
				})
			},
			Personal() { // 个人信息
				uni.navigateTo({
					url: '../Personal/Personal'
				})
			},
			// 清除缓存
			clearBuffer(){
				uni.showToast({
					icon:'success',
					mask:true,
					title:'清除成功'
				})
			},
			async exit(){
				const res = logout()
				res.then(ress=>{
						console.log(ress)
						if(ress.data.code === 200){
							uni.clearStorage ();
							setTimeout(() => {
								uni.showToast({
									icon: 'success',
									title: '退出成功',
									mask:true
								});
								setTimeout(() => {
									uni.hideToast();
									//关闭提示后跳转
									uni.navigateTo({
										url:'/pages/login/login'
									});
								}, 1500)
							}, 0);
						}else{
							uni.showToast({
								icon: 'error',
								title: '退出失败，请重试',
								mask:true
							});
						}
				})
				
			},
			 logout(){
				 const that = this
				uni.showModal({
						title: '提示',
						// 提示文字
						content: '确定要退出该账号吗？',
						// 取消按钮的文字自定义
						cancelText: "取消",
						// 确认按钮的文字自定义
						confirmText: "退出",
						//删除字体的颜色
						confirmColor:'red',
						//取消字体的颜色
						cancelColor:'#000000',
						success: function(res) {
						if (res.confirm) {
							// 执行确认后的操作
					that.exit()
						} 
						else {
							// 执行取消后的操作
						}
					}
				})
			
			}
		}
	}
</script>

<style>
	.content {
		background-color: white;
	}

	/deep/.uni-page-body .uni-page-refresh {
		background-color: red !important;
	}

	#img {
		width: 7.42px;
		height: 16px;
		position: absolute;
		right: 20px;
		margin-top: 20px;
	}

	.mine-top {
		height: 200px;
		/* border: 1px red solid; */
		padding-top: 50px;
		padding-left: 20px;
		z-index: 200;
		background-image: url('@/static/522799186018635776.png');
		background-size: cover;
		display: flex;
	}

	.mine-top>view {
		/* border: 1px red solid; */
		display: flex;
		position: relative;
		top: 60px;
	}

	.mine-top-info>text {
		/* border: 1px red solid; */
		display: block;
		margin-top: 5px;
	}

	.mine-top-info {
		padding-left: 20px;
		margin-top: 10px;
		color: white;
		/* border: 1px red solid; */
	}

	.mine-center {
		/* border: 1px grey solid; */
		border-radius: 20px;
		background-color: white;
		height: 100px;
		position: absolute;
		width: 100%;
		height: 226px;
		top: 230px;
		z-index: 1;
		/* 		position: relative;
		top: -20px; */
	}

	.mine-center-content {
		/* border: 1px red solid; */
		height: 60px;
		line-height: 60px;
		padding-left: 20px;
	}

	.mine-center-content span {
		display: inline-block;
		/* border: 1px red solid; */
		width: 20px;
		height: 20px;
		background-image: url('@/static/LOGO@3x.png');
		background-size: cover;
	}

	.left-icon {
		width: 20px;
		height: 20px;
	}

	.mine-center-content view {
		/* border: 1px red solid; */
		display: inline-block;
		height: 20px;
		width: 80px;
		position: relative;
		top: -5px;
		left: 20px;
	}
</style>