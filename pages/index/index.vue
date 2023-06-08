<template>
	<view>
		<view class="content">
			<image style="position: absolute;height: 100%;width: 100%;" src="/static/2300@3x.png"></image>
			<text style="position: absolute;z-index: 222;margin-top: -60%;font-size: 18px;color: #082C76;">廊坊市公安局督察管理平台</text>
			<image class="logo" src="/static/icon/1@3x.png"></image>
			<view class="text-area">
				<image style="height: 25px;width: 25px;margin-left: 10px;" src="/static/7245@3x.png"></image>
				<text class="title">{{title}}</text>
			</view>
		</view>
		<view class="list">
			<view style="font-size: 1.1em;font-weight: bold;"><text style="color: #5085FF;font-size: 1.5em;margin-right: 10px;">|</text>我的任务</view>
			<view style="display: flex;justify-content: space-around;">
				<view @click="toTaskD()" style="text-align: center;">
					<image style="height: 70pt;width: 70pt;" src="/static/7120@3x.png"></image>
					<view style="margin-top: -10px;">待处理</view>
				</view>
				<view @click="toTaskB()" style="text-align: center;">
					<image style="height: 70pt;width: 70pt;" src="/static/7118@3x.png"></image>
					<view style="margin-top: -10px;">办理中</view>
				</view>
				<view @click="toTaskY()" style="text-align: center;">
					<image style="height: 70pt;width: 70pt;" src="/static/7119@3x.png"></image>
					<view style="margin-top: -10px;">已完结</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view style="font-size: 1.1em;font-weight: bold;"><text style="color: #5085FF;font-size: 1.5em;margin-right: 10px;">|</text>督察业务</view>
			<view style="display: flex;justify-content: space-around;flex-wrap: wrap;">
				<view v-if="showA" style="text-align: center;">
					<image style="height: 70pt;width: 70pt;" src="/static/7125@3x.png"></image>
					<view style="margin-top: -10px;">问题记录</view>
				</view>
				<view v-if="showS" style="text-align: center;">
					<image @click="toRelease()" style="height: 70pt;width: 70pt;" src="/static//fabux.png"></image>
					<view style="margin-top: -10px;">督察发布</view>
				</view>
				<view v-if="showD" style="text-align: center;">
					<image @click="takeAPhoto()" style="height: 70pt;width: 70pt;" src="/static/7122@3x.png"></image>
					<view  style="margin-top: -10px;">问题随拍</view>
				</view>
				<view v-if="showF" style="text-align: center;">
					<image style="height: 70pt;width: 70pt;" src="/static/7124@3x.png"></image>
					<view style="margin-top: -10px;">维权反馈</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {uploadImage,getInfo} from '@/api/api.js'
	export default {
		data() {
			return {
				title: '新朝阳路口，发现他人辱骂民警事件！',
				showA:true,
				showS:true,
				showD:true,
				showF:true
			}
		},
		onLoad() {

		},
		onShow() {
			this.initInfo()
		},
		methods: {
			//获取登录信息
			async initInfo(){
					const that = this
				await getInfo().then(res=>{
					console.log(res)
					uni.setStorageSync('userType',res.data.data.user.user_type)
					if(res.data.data.user.user_type==100){
						this.showS=false
					}
					if(res.data.data.user.user_type==200){
						this.showA=false
						this.showS=true
						this.showF=false
					}
				})
			},
			// 待处理任务
			toTaskD(){
				uni.navigateTo({
					url:'/pages/task/task?type=0'
				})
			},
			toTaskB(){
				uni.navigateTo({
					url:'/pages/task/task?type=1'
				})
			},
			toTaskY(){
				uni.navigateTo({
					url:'/pages/task/task?type=2'
				})
			},
			// 督察发布
			toRelease(){
				uni.navigateTo({
					url:'/pages/release/release'
				})
			},
			// 问题随拍
			takeAPhoto(){
				uni.chooseImage({
				  	count: 1,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['camera','album'], //这要注意，camera掉拍照，album是打开手机相册
				    success: (res)=> {
						console.log(res);
						const tempFilePaths = res.tempFilePaths;
					const accessToken = uni.getStorageSync("access_token")
						uni.uploadFile({
							url: '/api/auth/system/uploadImage', //服务器地址
							header:{
								'Access-Control-Allow-Origin': '*',
								Authorization:`Bearer ${uni.getStorageSync("Token")}`,
								'x-api-header': 'yuanxibing',
								'x-access-token': accessToken
							},
							fileType:"image",//ZFB必填,不然报错
							filePath: tempFilePaths[0],//这个就是我们上面拍照返回或者先中照片返回的数组
							name: 'image',
							success: (ress) => {
								console.log(ress)
								let imgData = JSON.parse(ress.data)
								console.log(imgData)
								if(imgData.code==200){
									uni.showToast({
										title:'上传成功',
										icon:'success',
										mask:true,
										duration:2000
									})
								}else{
									uni.showToast({
										title:'上传失败，请重试',
										icon:'error',
										mask:true,
										duration:2000
									})
								}
							}
						});
				    }
				});
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		z-index: 444;
		height: 280rpx;
		width: 93%;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		width: 93%;
		display: flex;
		align-items: center;
		height: 35px;
		border-radius: 10px;
		z-index: 222;
		background-color: #F0F5FF;
	}

	.title {
		margin-left: 10px;
		font-size: 12px;
		color: #4574E0;
	}
	.list{
		margin:  0 3% 0 3%;
		position: relative;
		width: 93%;
	}
</style>
