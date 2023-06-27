<template>
	<view>
		<view style="display: flex;justify-content: center;flex-wrap: wrap;">
			<view class="content">
				<view class="form">
					<view style="display: flex; align-items: center;height: 40px;justify-content: space-between;">
						<view>录入时间：</view>
						{{date}}
					</view>
					<view style="border-bottom: 1px #ccc solid;"></view>

					<view style="display: flex;align-items: center;height: 40px;justify-content: space-between;">
						<view>被督察单位：</view>
		
			<picker @change="bindPickerChange1($event,array)" :value="index12" :range="array":range-key="'name'">
									<view class="uni-input">{{array[index12].name}}</view>
								</picker>
					</view>
					<view style="border-bottom: 1px #ccc solid;"></view>
					<view style="display: flex;align-items: center;height: 40px;justify-content: space-between;">
						<view>具体问题：</view> 
						<view style="display: flex;align-items: center;">
							<picker @change="bindPickerChange($event,range)" :value="index" :range="range"
								:range-key="'label'">
								<view class="uni-input">{{range[index].label}}</view>
							</picker>
							<image src="@/static/right.png" style="height: 15px;width: 15px;margin-left: 10px;"
								alt="">
						</view>
					</view>

					<view style="border-bottom: 1px #ccc solid;"></view>
				</view>
			</view>
			<view class="content">
				<view class="form">具体描述:</view>
				<textarea @blur="word" style="margin: 10px;" auto-height v-model="questionData.question_desc" placeholder="请输入问题具体描述内容" />
			
			</view>
			<view class="content">
				<view class="form">被督察人员:</view>
				<view style="margin: 10px;display: flex;">
					<view v-if="show" style="margin-right: 10px;" v-for="(user, index) in addUserData" :key="index">
						<image style="height: 45px;width: 45px;border-radius: 10px;" :src="user.avatar">
						<image @click='deleteUser(addUserData,index)' src="@/static/shanchu.png"
							style="width: 15px;height: 15px;position: absolute;margin-left: -8px;margin-top: -5px;"
							alt="">
						<view style="display: flex;justify-content: center;">
							{{user.nickname}}
						</view>
					</view>
					<image @click="addUser" style="height: 45px;width: 45px;"
						src="@/static/23f6b108bfb64da1ff5d72202d815d9.png" alt="">
				</view>
			</view>
			<view class="content">
				<view
					style="margin: 0 10px 0 10px; display: flex; align-items: center;height: 40px;justify-content: space-between;">
					<view>处置期限：</view>
						<picker mode="date" :value="date1" :start="startDate" :end="endDate" @change="bindDateChange">
												<view class="uni-input">{{date1}}</view>
											</picker>
				</view>
			</view>

			<view class="content">
				<view class="form">问题附件:</view>
				<view style="margin: 10px;display: flex;">
					<view v-if="show" style="margin-right: 10px;" v-for="(item, index) in imageData" :key="index">
						<image style="height: 45px;width: 45px;border-radius: 10px;" :src="item">
						<image @click='deleteUser(imageData,index)' src="@/static/shanchu.png"
							style="width: 15px;height: 15px;position: absolute;margin-left: -8px;margin-top: -5px;"
							alt="">
						<view style="display: flex;justify-content: center;">
							上传图片
						</view>
					</view>
					<image @click="addImg" style="height: 45px;width: 45px;"
						src="@/static/23f6b108bfb64da1ff5d72202d815d9.png" alt="">
				</view>
			</view>

			<view class="content">
				<view style="margin: 0 10px 0 10px; display: flex; align-items: center;height: 40px;">
					<view>发生位置：</view>
					<input type="text" v-model="questionData.question_location" placeholder="请输入问题发生地址">
				</view>
			</view>

			<view class="content">
				<view class="form" style="display: flex;">督察人员: <view style="color: #ccc;font-size: 14px;margin-left: 10px;">(至少两个督察人员)</view> </view>
				<view style="margin: 10px;display: flex;">
					<view style="margin-right: 10px;" v-for="(item, index) in UserData" :key="index">
						<image style="height: 45px;width: 45px;border-radius: 10px;" :src="item.avatar"></image> 
						<image @click='deleteUser(UserData,index)' src="@/static/shanchu.png"
							style="width: 15px;height: 15px;position: absolute;margin-left: -8px;margin-top: -5px;"
							alt="">
						<view style="display: flex;justify-content: center;">
							{{item.nickname}}
						</view>
					</view>
					<image @click="addUser1" style="height: 45px;width: 45px;"
						src="@/static/23f6b108bfb64da1ff5d72202d815d9.png" alt="">
				</view>
			</view>
			<button @click="submit()" style="width: 90%;color: #fff;background-color: #5086ff;margin: 10% 0 10% 0">确认</button>
		</view>


	</view>
</template>

<script>
	import {
		getInfo,
		getQuesition,
		addQuesiton,
		getDeptTreeList
	} from '@/api/api.js'
	export default {
		data() {
			return {
				index12:0,
				array:[
					
					    { id: 26603003832480, name: "廊坊市总队" },
					    { id: 26603173969056, name: "廊坊市大队" },
					    { id: 28295468799136, name: "廊坊市第一支队"},
						{ id: 28295493513888, name: "廊坊市第二支队"}

				],
				deptName:'22',
				type: '',
				index: 0,
				date: '',
				date1:'',
				show: true,
				wordCount: '',
				value: '',
				range: [],
				classificationGoodsList:[],
				imageData: [],
				UserData: [],
				UserDataId:[],
				addUserDataId:[],
				addUserData: [],
				addUserIndex: '',
				questionData: {
					user_id: '',
					task_id: '',
					dept_id: [
							26603003832480
					],
					question_type: '1',
					question_desc: '',
					handel_date: '',
					record_date: '',
					question_location: '',
					question_file: '',
					question_group: [

					],
					question_person: [

					]
				},
				deptTreeList:[]
			}
		},
		onLoad(e) {
			console.log(e)
			this.questionData.task_id = e.taskId
		},
		onShow() {
			this.getDeptTreeList()
			this.getQuesition()
			this.getUserInfo()
			// 获取当前时getUserInfo()间
			var currentTime = new Date();
			
			// 格式化当前时间
			var year = currentTime.getFullYear();
			var month = currentTime.getMonth() + 1;
			var day = currentTime.getDate();
			var hour = currentTime.getHours();
			var minute = currentTime.getMinutes();
			var second = currentTime.getSeconds();
			this.date = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + " " + hour +
				":" + minute
				this.date1 = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + " " + hour +
					":" + minute


		},
		methods: {
			bindDateChange: function(e) {
			          this.date1 = e.detail.value
					 
			      },
			changeLog(e){
				console.log(e)
				this.questionData.handel_date = e
			},
			onchange(e){
				console.log(e)
			},
			onnodeclick(e){
				console.log(e)
				this.questionData.dept_id.push(e.value)
			},
			 action(data){ // 使用递归函数
			    // if(!(data?.length <= 0)){ 
			    // 等价于
				if(!data || data.length <= 0){ // 递归的出口
					return null;
				}
				return data.map(x => { // 循环数据
				    const model = { // 把后端返回过来的数据里面的键给替换成我想要的键
					children:x.children,
						text: x.label,
						value: x.value,
					};
				    const children = this.action(x.children); // 子级数据
										
				    if(children){ // 一直往下循环查找有没有children这个键，如果有就直接添加一个子级字段名，这个字段名就是存子级数据
					    model.children = children;
				    }
										
				return model; // 返回这个数据
				});
			},
			// 获取部门
			async getDeptTreeList(){
				const res = await getDeptTreeList()
				console.log(res)
				this.deptTreeList = res.data.data
				this.classificationGoodsList = this.action(res.data.data); // 这个classificationGoodsList 就是我存数据的数组
				console.log(this.classificationGoodsList);
			},
			// 上传图片
			async addImg() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'], //这要注意，camera掉拍照，album是打开手机相册
					success: (res) => {
						console.log(res);
						const tempFilePaths = res.tempFilePaths;
						const accessToken = uni.getStorageSync("access_token")
						uni.uploadFile({
							url: '/api/auth/system/uploadImage', //服务器地址
							header: {
								'Access-Control-Allow-Origin': '*',
								Authorization: `Bearer ${uni.getStorageSync("Token")}`,
								'x-api-header': 'yuanxibing',
								'x-access-token': accessToken
							},
							fileType: "image", //ZFB必填,不然报错
							filePath: tempFilePaths[0], //这个就是我们上面拍照返回或者先中照片返回的数组
							name: 'image',
							success: (ress) => {
								console.log(ress)
								let imgData = JSON.parse(ress.data)
								console.log(imgData)
								if (imgData.code == 200) {
									uni.showToast({
										title: '上传成功',
										icon: 'success',
										mask: true,
										duration: 2000
									})
									this.imageData.push('http://120.211.58.75:26003' + imgData
										.data.url)
									
									
							
								
								if (this.questionData.question_file === "") {
								  // 如果 question_file 是空的，直接将新的文件路径赋值给 question_file
								 this.questionData.question_file = imgData.data.url;
								} else {
								  // 如果 question_file 不是空的，使用逗号将新的文件路径添加到 question_file
									this.questionData.question_file = this.questionData.question_file.concat(',',imgData.data.url);
								}
								

								} else {
									uni.showToast({
										title: '上传失败，请重试',
										icon: 'error',
										mask: true,
										duration: 2000
									})
								}
							}
						});
					}
				})
			},
			bindPickerChange: function(e, range) {
				console.log(e)
				console.log(range)
				this.index = e.detail.value
				this.questionData.question_type = e.detail.value + 1
				console.log(this.questionData.question_type)
			},
			bindPickerChange1: function(e, array) {
				console.log(e)
				console.log(array)
				this.index12 = e.detail.value
				this.questionData.dept_id = array[this.index12].id
				console.log(this.questionData.dept_id)
				//this.questionData.question_type = e.detail.value + 1
				//console.log(this.questionData.question_type)
			},
			// 获取发布人信息
			async getUserInfo() {
				const res = await getInfo()
				console.log(res.data.data.user.id)
				this.questionData.user_id = res.data.data.user.id
			},
			// 获取具体问题
			async getQuesition() {
				const res = await getQuesition()
				console.log(res)
				this.range = res.data.data
			},
			// 处理用户列表返回信息
			otherFun(object) {
				if (object) {
					console.log(object)
					if (this.type == 1) {
						this.addUserData.push(...object)
						object.map(i=>{
							this.addUserDataId.push(i.id)
						})
					}
					if (this.type == 2) {
						this.UserData.push(...object)
						object.map(i=>{
							this.UserDataId.push(i.id)
						})
					}
				} else {
					return
				}
			},
			// 字数
			word(e) {
				console.log(e.length)
				this.wordCount = e.length
			},
			// 被督察人员
			addUser(e) {
				this.type = 1
				uni.navigateTo({
					url: '../userList/userList'
				})
			},
			deleteUser(user, index) {
				console.log(user)
				user.splice(index, 1)
			},
			addUser1(e) {
				this.type = 2
				uni.navigateTo({
					url: '../userList/userList'
				})
			},
			// 添加任务
			async submit(){
				 this.questionData.handel_date = this.date1
				this.questionData.question_group = this.addUserDataId
				this.questionData.question_person = this.UserDataId
				this.questionData.record_date = this.date
				console.log(this.questionData)
				const res = await addQuesiton(this.questionData)
				console.log(res)
				if(res.data.code==200){
					uni.showToast({
						title: '上传成功',
						icon: 'success',
						mask: true,
						duration: 2000,
						success() {
							uni.navigateBack({
							    delta:1 // 可以不傳delta值，默認為1
							})
						}
					})
				}else{
					uni.showToast({
						title: res.data.message,
						icon: 'error',
						mask: true,
						duration: 2000
					})
				}
			}
		},
		computed: {

		}
	}
</script>

<style>
	page {
		height: 100%;
		background-color: #f3f5f9;
	}

	.content {
		margin-top: 5%;
		border-radius: 10px;
		width: 90%;
		background-color: #fff;
	}

	.form {
		margin: 10px;
	}

	.add {
		border: 1px #007aff solid;
		width: 40px;
		height: 40px;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 25px;
		color: #007aff;
	}

	.word-count {

		margin-top: 20%;
		color: #999;
	}
</style>