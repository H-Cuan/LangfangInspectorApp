<template>
	<view class="page">
		<view class="content">
		<view style="width: 90%; height: 20%; display: flex;border-bottom:0.5px #ccc solid;justify-content:space-between;"><text>原密码：</text><input v-model="change.oldPassword" placeholder="请输入原密码" password  type="text"/></view>
		<view style="width: 90%; height: 20%;display: flex;border-bottom:0.5px #ccc solid;justify-content:space-between;"><text>新密码：</text><input v-model="change.newPassword" placeholder="请输入新密码" password  type="text"/></view>
		<view style="width: 90%; height: 20%;display: flex;border-bottom:0.5px #ccc solid;justify-content:space-between;"><text>确认新密码：</text><input v-model="change.newPassword_confirmation" placeholder="请确认新密码" password  type="text"/></view>
		</view>
		<view style="font-size: 12px;color: #ccc; position: absolute;margin-top: 50%;">
		  备注：密码由6-20个大小写英文字母或数字组成
		</view>
		<view style="position: absolute;margin-top: 75%;width: 100%;">
		  <button @click="changePW()" style="display: flex;align-items: center;justify-content: center; width: 90%;border-radius: 10px;height: 50px;background-color: #2188fe;color: #fff;">保存修改</button>
		</view>
	</view>
</template>

<script>
	import {modifyPassword} from '@/api/api.js'
	export default {
		data() {
			return {
				change:{}
			}
		},
		methods: {
			async changePW(){
				const res = await modifyPassword(this.change)
				console.log(res)
				if(res.data.code ==200){
					uni.removeStorageSync('Token')
				setTimeout(() => {
					uni.showToast({
						icon: 'success',
						title: '修改成功',
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
						title: res.data.message,
						mask:true
					});
				}
			}
		}
	}
</script>

<style>
/* pages/changePassword/changePassword.wxss */
page{
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #f5f5f5;
}
.page{
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #f5f5f5;
}
.content{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
width: 93%;
height: 20%;
margin-top: 10%;
background-color: #fff;
}
input{
  text-align: right;
}
</style>
