<template>
	<view style="">
		<view style="height: 40%;">
			<image src="@/static/background.png" mode="" style="width: 100%;" />
		</view>
		<view style="margin-left: 20pt; margin-top: -120pt;display: flex;flex-wrap: wrap; justify-content: left;">
			<text style="width: 100%; font-size: 18pt;color: #fff;position: relative;">您好，</text>
			<view>
				<text style="font-size: 14pt;color: #fff;position: relative;">欢迎登录廊坊市督察管理平台</text>
			</view>
		</view>
		<view class="content">
			<view style="width: 90%;margin-top: 8%;margin-left: 8%;">
				<text style="color: #222;font-size: 15pt;font-weight: bold;">身份证号</text>
				<input v-model="form.username" style="margin-top: 20px;" type="idcard" placeholder="请输入您的身份证号">
			<view style="width: 100%;height: 0px;margin-top: 2px; border-bottom: #ccc 1px solid;"></view>
			</view>
				
			<view style="width: 90%;margin-top: 8%;margin-left: 8%;">
				<text style="color: #222;font-size: 15pt;font-weight: bold;">密码</text>

				<view class="uni-input-wrapper">
					<input @keydown.enter="login" @confirm="login" v-model="form.password" style="margin-top: 20px;" type="text" :password="showPassword"
						placeholder="请输入您的密码">
					<text class="uni-icon" :class="[!showPassword ? 'uni-eye-active' : '']"
						@click="changePassword"></text>
				</view>
				<view style="width: 100%;margin-top: 2px; height: 0px;border-bottom: #ccc 1px solid;"></view>
			</view>
			<button @click="login"
				style="color: #fff;background-color: #6694ff;width: 90%;margin-top: 50px;border-radius: 30px;">立即登录</button>
		</view>
	</view>
</template>

<script>	
	//140624198612112515
	//622133198612112535
	import axios from 'axios'
	import {
		getAccessToken,
		login
	} from '@/api/api'
	export default {
		data() {
			return {
				showPassword: true,
				form: {
					code: '2222'
				}
			}
		},
		onShow() {
			this.getAccessToken(),
			plus.device.getInfo({
						success: function(e) {
							const clientid = e.uuid;
							console.log(clientid);
							uni.setStorageSync('clientid', clientid);
						},
						fail: function(e) {
							console.log(e);
						}
					});
		},
		methods: {
			
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			async getAccessToken() {
				await getAccessToken({
					client_id: "yegfeisudzfT9j7OpHoLvkDrkI4GczcS",
					client_secret: "DmA2veG2YZoUUdxxyJZ3RJBJ8xz1fiCU",
					grant_type: "client_credentials",
					scope: "*"
				}).then(res => {
					console.log(res)
					uni.setStorageSync('access_token', res.data.access_token)
				})
			},
			async login() {
			
				const clientid = uni.getStorageSync('clientid')
				const accessToken = uni.getStorageSync('access_token')
				const res = await login(this.form, {
					'x-api-header': 'yuanxibing',
					'x-access-token': accessToken,
					'x-device-code':clientid
				})
				console.log(res)
				
				if (res.data.code === 200) {
					uni.setStorageSync('Token', res.data.data.token)
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else {
					console.log(res.data)
					if (res.data.message === 'username 字段是必须的') {
						uni.showToast({
							title: '请输入用户名',
							icon: 'error',
							mask:true,
							duration: 2000
						})
					}
					if (res.data.message === 'password 字段是必须的') {
						uni.showToast({
							title: '请输入密码',
							icon: 'error',
							mask:true,
							duration: 2000
						})
					}
					if (res.data.message === '该设备没有备案') {
						uni.showToast({
							title: '该设备没有备案',
							icon: 'error',
							mask:true,
							duration: 2000
						})
					}
					if (res.data.message === 'password 的最小长度为 6 字符') {
						uni.showToast({
							title: '密码至少6个字符',
							icon: 'error',
							mask:true,
							duration: 2000
						})
					}
					if (res.data.message === 'code 字段是必须的') {
						uni.showToast({
							title: '请输入验证码',
							icon: 'error',
							mask:true,
							duration: 2000
						})
					}
					if (res.data.code === 1004) {
						uni.showToast({
							title: '不存在该用户',
							icon: 'error',
							mask:true,
							duration: 2000
						})
					}
					if (res.data.code === 1011) {
						uni.showToast({
							title: '密码错误',
							icon: 'error',
							mask:true,
							duration: 2000
						})
					}
				}
			}
		}
	}
</script>

<style>
	.content {
		height: 100%;
		width: 100%;
		background-color: #fff;
		position: absolute;
	
		border-top-left-radius: 30px;
		border-top-right-radius: 30px;
		margin-top: 30pt;


	}
</style>