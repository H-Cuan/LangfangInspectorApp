<template>
	<view style="display: flex;justify-content: center;">
		<view class="content">
			<view class="form">
				<view style="display: flex;align-items: center;height: 50px;justify-content: space-between;">
					<view>头像：</view>
					<view @click="changeA" style="display: flex;align-items: center;">
						<img :src="avatar" style="height: 45px;width: 45px;border-radius: 45px;" alt="">
						<image src="/static/right.png" style="height: 20px;width: 20px;margin-left: 10px;" ></image>
					</view>
				</view>
				<view style="border-bottom: 1px #ccc solid;"></view>
				
				<view style="display: flex;align-items: center;height: 50px;justify-content: space-between;">
					<view>昵称：</view>
					<input v-model="updata.nickname" style="text-align: right;margin-right: 30px;" type="text">
				</view>
				<view style="border-bottom: 1px #ccc solid;"></view>
				
				<view style="display: flex;align-items: center;height: 50px;justify-content: space-between;">
					<view>单位：</view>
					<view style="margin-right: 30px;">{{dept}}</view>
					 <!-- <uni-data-picker :localdata="dept" popup-title="请选择单位" @change="onchange" @nodeclick="onnodeclick"></uni-data-picker> -->
				</view>
				<view style="border-bottom: 1px #ccc solid;"></view>
			<!-- 	
				<view style="display: flex;align-items: center;height: 50px;justify-content: space-between;">
					<view>岗位：</view>
					<input :value="updata.nickname" style="text-align: right;margin-right: 30px;" type="text">
				</view>
				<view style="border-bottom: 1px #ccc solid;"></view> -->
				
				<view style="display: flex;align-items: center;height: 50px;justify-content: space-between;">
					<view>身份证号码：</view>
					<input v-model="updata.idcard" style="text-align: right;margin-right: 30px;" type="text">
				</view>
				<view style="border-bottom: 1px #ccc solid;"></view>
				
				<view style="display: flex;align-items: center;height: 50px;justify-content: space-between;">
					<view>警员编号：</view>
					<input v-model="updata.police_no" style="text-align: right;margin-right: 30px;" type="text">
				</view>
				<view style="border-bottom: 1px #ccc solid;"></view>
				
			</view>
		</view>
		<view style="position: fixed;width: 90%;margin-top: 130%;">
			<button @click="updateInfo" style="color: #fff;background-color: #5085ff;">修改</button>
		</view>
	</view>
</template>

<script>
	import{getDeptTreeList, getInfo,updateInfo}from'@/api/api.js'
	export default {
		data() {
			return {
				updata:{
					avatar:'',
					nickname:'',
					idcard:'',
					police_no:'',
					
				},
				avatar:'',
				dept:''
			}
		},
		onShow() {
			// this.getDept()
			this.getInfo()
		},
		methods: {
			// 获取单位树
			// async getDept(){
			// 	const res = await getDeptTreeList()
			// 	console.log(res)
			// 	res.data.map(i=>{
			// 		i.text = i.label
			// 		i.children.map(j=>{
			// 			j.text = j.label
			// 			j.children.map(a=>{
			// 				a.text = a.label
			// 			})
			// 		})
			// 	})
			// 	console.log(res.data)
			// 	this.dept = res.data
			// },
			// 更换头像
			changeA(e){
				const that = this
				uni.chooseImage({
				  	count: 1,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'], //这要注意，camera掉拍照，album是打开手机相册
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
									that.avatar = 'http://120.211.58.75:26003' + imgData.data.url
									that.updata.avatar = imgData.data.url
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
			},
			// 更改信息
			async updateInfo(){
				const res = await updateInfo(this.updata)
				console.log(res)
				if(res.data.code==200){
					uni.showToast({
						title:'修改成功',
						icon:'success',
						mask:true,
						duration:2000,
					})
						this.getInfo()
				}else{
					uni.showToast({
						title:'修改失败请重试',
						icon:'error',
						mask:true,
						duration:2000
					})
				}
			
			},
			// 获取个人信息
			async getInfo() {
				const res = await getInfo()
				console.log(res)
				this.dept = res.data.data.dept.name
				this.avatar = res.data.data.user.avatar
				this.updata.nickname = res.data.data.user.nickname
				this.updata.idcard = res.data.data.user.idcard
				this.updata.police_no = res.data.data.user.police_no
				this.updata.email = res.data.data.user.email
				this.updata.id = res.data.data.user.id
				this.updata.phone = res.data.data.user.phone
				this.updata.signed = res.data.data.user.signed
				this.updata.remark = res.data.data.user.remark
			},
			onchange(e) {
			    const value = e.detail.value
				console.log(value)
			  },
			  onnodeclick(node) {
				  console.log(node)
			  }
		},
		   
	}
</script>

<style>
page{
	height: 100%;
	background-color: #f3f5f9;
}
.content{
	margin-top: 5%;
	position: absolute;
	border-radius: 3%;
	width: 90%;
	height: 60%;
	background-color: #fff;
}
.form{
	margin: 10px;
}
</style>
