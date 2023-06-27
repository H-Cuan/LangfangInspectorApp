<template>
	<view>
		<view style="display: flex;justify-content: center;flex-wrap: wrap;">
			<view class="content">
				<view class="form">
					<view style="display: flex; align-items: center;height: 40px;justify-content: space-between;">
						<view>申请时间：</view>
						{{date}}
					</view>
					<view style="border-bottom: 1px #ccc solid;"></view>

					<view style="display: flex;align-items: center;height: 40px;justify-content: space-between;">
						<view>申请人名称：</view>
						{{updata.nickname}}
					</view>
					<view style="border-bottom: 1px #ccc solid;"></view>
					<view style="display: flex;align-items: center;height: 40px;justify-content: space-between;">
						<view>申请人单位：</view>
						{{dept}}
					</view>
					<view style="border-bottom: 1px #ccc solid;"></view>
				
				</view>
			</view>
			<view class="content">
				<view
					style="margin: 0 10px 0 10px; display: flex; align-items: center;height: 40px;justify-content: space-between;">
					<view>被侵权人信息：</view>
						<image style="height: 45px;width: 45px;"
							src="/static/23f6b108bfb64da1ff5d72202d815d9.png" alt="">
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
			<view class="form">事实与理由:</view>
			<textarea  style="margin: 10px;" auto-height  placeholder="(某年某月,何事发生情况导致结果)" />
		
		</view>
		<view class="content">
			<view class="form">案发环节:</view>
			<textarea  style="margin: 10px;" auto-height  placeholder="请输入案发环节描述信息" />
		
		</view>
		<view class="content">
			<view class="form">问题附件:</view>
			<view style="margin: 10px;display: flex;">
				<view v-if="show" style="margin-right: 10px;" v-for="(item, index) in imageData" :key="index">
					<image style="height: 45px;width: 45px;border-radius: 10px;" :src="item">
					<image @click='deleteUser12(imageData,index)' src="@/static/shanchu.png"
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
		</view>

		
		<view style="display: flex;width: 90%;justify-content: center;flex-wrap: wrap;margin-top: 5%;;margin-left: 5%;">
			<view style="width: 100%; display: flex;justify-content: space-between;">
				<view style="display: flex;justify-content: center;align-items: center;color: #666;">
					<view style="font-size: 2em;">·</view>
					<view>申请人</view>
				</view>
				<view>
					<view>
						<image :src="avatar" style="width: 40px;height: 40px;border-radius: 10px;" alt="">
					</view>
					<view>{{this.updata.nickname}}</view>
				</view>
			</view>
			<view class="line"></view>
			<view style="width: 100%; display: flex;justify-content: space-between">
				<view style="display: flex;justify-content: center;align-items: center;color: #666;">
					<view style="font-size: 2em;">·</view>
					<view>审批人</view>
				</view>
				<view>
					<view>
						<image src="http://120.211.58.75:26003/uploadfile/20230619/529437585009848320.png"
							style="width: 40px;height: 40px;border-radius: 10px;" alt="">
					</view>
					<view>创始人</view>
				</view>
			</view>
			<view class="line"></view>
			<view style="width: 100%; display: flex;justify-content: space-between;">
				<view style="display: flex;justify-content: center;align-items: center;color: #666;">
					<view style="font-size: 2em;">·</view>
					<view>抄送人</view>
				</view>
				<view style="display: flex;">
					<view v-if="show" style="margin-right: 10px;" v-for="(item, index) in auditData2" :key="index">
						<image style="height: 45px;width: 45px;border-radius: 10px;" :src="item.avatar">
							<image @click='deleteUser1(auditData2,index)' src="/static/shanchu.png"
								style="width: 15px;height: 15px;position: absolute;margin-left: -8px;margin-top: -5px;"
								alt="">
								<view style="display: flex;justify-content: center;">
									{{item.nickname}}
								</view>
					</view>
					<image @click="addUser2($event,index)" style="height: 45px;width: 45px;"
						src="/static/23f6b108bfb64da1ff5d72202d815d9.png" alt="">
				</view>
			</view>

		</view>

		<view style="padding: 20px 0 20px 0;">
			<button @click="submit()"
				style="color: #fff;background-color: #007aff;width: 90%;border-radius: 10px;">提交发布</button>
		</view>
	</view>
</template>

<script>
	import {
		getInfo,
		getSuperviseMethod,
		getSuperviseType,
		getSuperviseContent,
		superviseSave,
		getWorkflow,
		addGroup,
		saveWorkflowBusiness,
		workflowDesign
	} from '../../api/api'
	export default {
		data() {
			return {
				addImage: '',
				show: true,
				active: 3,
				avatar: '',
				auditData: [],
				auditData2: [],
				form: {
					addGroup: [

						// 默认显示一条
						{
							addMember: [],
							group_name: "",
							task_desc: "",
							user_ids: []
						}
					]
				},
				type: '',
				addMember: [],
				datetimerange: [],
				dept: '',
				date: '',
				date1: '',
				date2: '',
				updata: {},
				addTask: {
					super_group: [],
				},
				range: [],
				range2: [],
				range3: [],
				imageData:[],
				index: 0,
				index2: 0,
				index3: 0,
				addUserIndex: 0,
				addUserIndex1: 0,
				addUserIndex2: 0,

				addGroupIndex: 0,
				auditFlowData: {
					
						id: '',
						name: "审批流程",
						nodeConfig: {
							nodeName: "发起人",
							type: 0,
							nodeRoleList: [],
							childNode: {
								nodeName: "直接主管审批",
								type: 1,
								setType: 1,
								nodeUserList: [{
									id: 18916801334944,
									name: "创始人"
								}],
								nodeRoleList: [],
								examineLevel: 1,
								directorLevel: 1, 
								selectMode: 1,
								termAuto: false,
								term: 0,
								termMode: 1,
								examineMode: 1,
								directorMode: 0,
								childNode: {
									nodeName: "抄送人",
									type: 2,
									userSelectFlag: true,
									nodeUserList: []
								}
							}
						}
					
				}
			}
		},
		watch: {
			datetimerange(newval) {
				console.log('范围选:', this.datetimerange);
				this.addTask.super_start_time = this.datetimerange[0]
				this.addTask.super_end_time = this.datetimerange[1]
			}
		},

		onLoad(option) {


			this.getType()
			this.getMethod()
			this.getContent()
			this.getWorkflow()
		},
		onShow() {
			this.getInfo()
			this.otherFun()
		},
		methods: {
			deleteUser12(user, index) {
				console.log(user)
				user.splice(index, 1)
			},
			bindDateChange: function(e) {
				this.date1 = e.detail.value
			},
			bindDateChange2: function(e) {
				console.log(e)
				this.date2 = e.detail.value
			},
			deleteUser1(item, index) {
				console.log(item)
				item.splice(index, 1)
			},
			addUser1(e, index) {
				this.type = 1
				this.addUserIndex1 = index
				uni.navigateTo({
					url: '../userList/userList'
				})

			},
			addUser2(e, index) {
				this.type = 2
				this.addUserIndex2 = index
				uni.navigateTo({
					url: '../userList/userList'
				})

			},
			otherFun(object) {
				if (object) {
					console.log(object)

					if (this.type == 1) {
						this.auditData.push(...object)
					} else if (this.type == 2) {
						this.auditData2.push(...object)
					} else if (this.type == 0) {
						object.map(i => {
							this.form.addGroup[this.addUserIndex].user_ids.push(i.id)

						})
						this.form.addGroup[this.addUserIndex].addMember.push(...object)
					}


				} else {
					return
				}
			},
			addUser(e, index) {
				this.type = 0
				console.log(index)
				this.addUserIndex = index
				uni.navigateTo({
					url: '../userList/userList'
				})
			},
			// 获取审批人
			async getWorkflow() {
				const res = await getWorkflow()
				console.log(res)
			},
			// 删除分组
			deleteItem(item, index) {
				this.form.addGroup.splice(index, 1)
			},
			// 删除组员
			deleteUser(item, index) {

				item.addMember.splice(index, 1)
				item.user_ids.splice(index, 1)
			},
			// 添加组
			addItem(length) {
				if (length >= 10) {
					uni.showToast({
						icon: 'error',
						title: '最多可新增10条!'
					})
				} else {
					this.form.addGroup.push({
						addMember: [],
						group_name: "",
						task_desc: "",
						user_ids: []
					})
				}
			},
			bindPickerChange: function(e, range) {
				console.log(e)
				console.log(range)
				this.index = e.detail.value
				this.addTask.super_type = e.detail.value + 1
				console.log(this.addTask.super_type)
			},
			bindPickerChange2: function(e, range2) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index2 = e.detail.value
				this.addTask.super_method = e.detail.value + 1
				console.log(this.addTask.super_method)
			},
			bindPickerChange3: function(e, range3) {
				console.log(e)
				console.log(range3)
				this.index3 = e.detail.value
				this.addTask.content_id = range3[e.detail.value].id

			},
			// 获取督察方式
			async getMethod() {
				const res = await getSuperviseMethod()
				console.log(res)
				this.range2 = res.data.data
				this.addTask.super_method = res.data.data[0].value
			},
			// 获取督察内容
			async getContent() {
				const res = await getSuperviseContent()
				console.log(res)
				this.range3 = res.data.data
				this.addTask.content_id = res.data.data[0].id
			},
			// 获取督察类别
			async getType() {
				const res = await getSuperviseType()
				console.log(res)
				this.range = res.data.data
				this.addTask.super_type = res.data.data[0].value
			},
			// 获取个人信息
			async getInfo() {
				// 获取当前时间
				let now = new Date();

				// 获取年、月、日
				let year = now.getFullYear();
				let month = now.getMonth() + 1;
				let day = now.getDate();

				// 格式化成yy-mm-dd的形式
				let formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day :
					day);

				// 输出结果
				this.date = formattedDate
				this.date1 = formattedDate
				this.date2 = formattedDate
				const res = await getInfo()
				console.log(res)
				this.avatar = res.data.data.user.avatar
				this.updata = res.data.data.user
				this.dept = res.data.data.dept.name
				this.addTask.dept_id = res.data.data.user.dept_id
				this.addTask.user_id = res.data.data.user.id
			},
			// 提交审核
			async submit() {

				// this.auditFlowData.nodeConfig.childNode.nodeUserList.push(this.auditData)
				// this.auditFlowData.nodeConfig.childNode.childNode.push(this.auditData2)
				this.addTask.super_start_time = this.date1 + ' ' + '00:00:00'
				this.addTask.super_end_time = this.date2 + ' ' + '00:00:00'
				for (let i = 0; i < this.form.addGroup.length; i++) {
					const res = await addGroup(this.form.addGroup[i])
					console.log(res)

					if (res.data.code == 200) {
						this.addTask.super_group.push(res.data.data.id)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'error'
						})
					}
				}
				if (this.addTask.super_group != '') {
					console.log(this.addTask)
					const ress = await superviseSave(this.addTask)
					console.log(ress)
					if (ress.data.code == 200) {
						uni.showToast({
							title: '发布成功',
							icon: 'success',
							duration: 1500,
							success() {
								uni.navigateBack()
							}
						})
					} else {
						uni.showToast({
							title: ress.data.message,
							icon: 'error'
						})
					}
				}


			},
			// 上传附件
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
		border-radius: 3%;
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

	.line {
		width: 85%;
		height: 40px;
		border-left: #ccc 1px solid;
	}
</style>