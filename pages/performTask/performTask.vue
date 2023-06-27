<template>
	<view style="display: flex;flex-wrap: wrap;justify-content: center;">
		<view class="content">
			<view style="display: flex;justify-content: space-between;">
				<view style="width: 70%;word-break:break-all;"></view>
				<view style="width: 30%;word-break:break-all;color: #ccc;margin-left: 10%;">{{taskData.updated_at}}
				</view>
			</view>
			<view style="display: flex;justify-content: space-between;margin-top: 3%;">
				<view style="width: 70%;word-break:break-all;">{{taskData.task_title}}</view>
			</view>
			<view style="display: flex;margin-top: 10px;">
				<view style="width: 30%;text-align-last: justify;">发布人：</view>
				<view>{{taskData.user.nickname}}</view>
			</view>
			<view style="display: flex;margin-top: 10px;">
				<view style="width: 30%;text-align-last: justify;">发布单位：</view>
				<view style="width: 70%;word-break:break-all;">{{taskData.dept.name}}</view>
			</view>
			<view style="display: flex;margin-top: 10px;">
				<view style="width: 30%;text-align-last: justify;">督察类别：</view>
				<view style="width: 70%;word-break:break-all;">{{taskData.super_type}}</view>
			</view>
			<view style="display: flex;margin-top: 10px;">
				<view style="width: 30%;text-align-last: justify;">督察方式：</view>
				<view style="width: 70%;word-break:break-all;">{{taskData.super_method}}</view>
			</view>
			<view style="display: flex;margin-top: 10px;">
				<view style="width: 30%;text-align-last: justify;">督察分组：</view>
				<view style="width: 70%;word-break:break-all;">
					<view style="" v-for="(item,index) in taskData.group" :key="index">
						{{item.group_name}}:
						<view style="padding-left: 5px;word-break:break-all;" v-for="(item1,index) in item.userList"
							:key="index">{{item1.nickname}}</view>
					</view>
				</view>
			</view>
			<view style="display: flex;margin-top: 10px;">
				<view style="width: 30%;text-align-last: justify;">督察时间：</view>
				<view style="width: 70%;word-break:break-all;">{{taskData.super_start_time}}~{{taskData.super_end_time}}
				</view>
			</view>
			<view style="display: flex;margin-top: 10px;">
				<view style="width: 30%;text-align-last: justify;">督察内容：</view>
				<view style="width: 70%;word-break:break-all;">{{taskData.super_content}}</view>
			</view>
			<view style="display: flex;margin-top: 10px;">
				<view style="width: 30%;text-align-last: justify;">督察描述：</view>
				<view style="width: 70%;word-break:break-all;">{{taskData.task_title}}</view>
			</view>

		</view>
		<view class="content_bottom" v-for="(item,index) in taskData.group" :key="index">
			<view style="font-size: 18px;font-weight: bold;">
				{{item.group_name}}
			</view>
			<view style="margin-top: 10px;display: flex;">
				<view style="padding: 10px;" v-for="(item1,index) in item.userList" :key="index">
					<view>
						<img :src="item1.avatar" style="width: 40px;height: 40px;border-radius: 10px;" alt="">
						<view>{{item1.nickname}}</view>
					</view>
				</view>
			</view>
			<view style="display: flex;">
				<view style="font-size: 16px;width: 30%;">备注信息：</view>
				<view style="width: 70%;word-break:break-all;"></view>
			</view>
		</view>
		<view style="width: 90%;display: flex;justify-content: space-between;margin-bottom: 2%;">
			<view>问题数量：{{this.total}}</view><view @click="toScene" style="color: #1296db;justify-content: center;align-items: center;display: flex;font-size: 16px;">添加 <image style="width: 20px;height: 20px;" src="@/static/addtask.png" alt=""> </view>
		</view>
		<view style="display: flex;flex-wrap: wrap;justify-content: center;">
			<view class="content_bottom" v-for="(item,index) in questionData">
				<view>
					<view>录入时间：{{item.record_date}}</view>
				</view>
				<view style="margin-top: 5px;display: flex;flex-wrap: wrap;">
					督察人员：
					<view style="margin-left: 10px;" v-for="(item1,index) in item.question_person_list">{{item1.nickname}}</view>
				</view>
				<view>
					<view style="margin-top: 5px;">被督察单位：{{item.dept.name}}</view>
				</view>
				<view style="display: flex;margin-top: 5px;">
					<view style="">督察时间：</view><view style="width: 70%;word-break: break-all;">{{item.task.super_start_time}}~{{item.task.super_end_time}}</view>
				</view>
				<view>
					<view style="display: flex;margin-top: 5px;">
						<view style="">督察描述：</view><view style="width: 70%;word-break: break-all;">{{item.question_desc}}</view>
					</view>
				</view>
			</view>
		</view>
		<button @click="receive()"
			style="width: 90%;border-radius: 10px;color: #fff;background-color: #5086ff;">结束本组督察</button>
	</view>
</template>

<script>
	import {
		taskDetails,
		getSuperviseType,
		getSuperviseContent,
		groupDetails,
		taskStatus,
		questionList
	} from '../../api/api'
	export default {
		data() {
			return {
				total: '',
				taskId: '',
				taskData: {},
				questionData: [],
				receiveData: {
					statusName: 'status',
					statusValue: 2
				}
			}
		},
		onLoad(e) {
			console.log(e)
			this.taskId = e.taskId
			this.getTaskDetails()
		},
		onShow() {
			this.getTaskDetails()
			
		},
		methods: {
			// 现场督察
			toScene(){
				uni.navigateTo({
					url:'../scene/scene?taskId='+this.taskId
				})
			},
			// 接收任务
			async receive() {
				const res = await taskStatus(this.receiveData)
				console.log(res)
				if (res.data.code == 200) {
					uni.showToast({
						icon: 'success',
						title: '提交成功',
						mask: true,
						success() {
							uni.navigateTo({
								url: '/pages/task/task?type=1'
							})
						}
					})
				} else {
					uni.showToast({
						icon: 'error',
						title: '提交失败',
						mask: true
					})
				}
			},
			
			
			// 获取任务详情
			async getTaskDetails() {
				const res = await taskDetails(this.taskId)
				console.log(res)
				// 获取问题列表
				const time1 =res.data.data.super_start_time.split(" ")[0];
				const time2 = res.data.data.super_end_time.split(" ")[0];
				const result = await questionList(res.data.data.dept_id)
				console.log(result)
				this.total = result.data.data.pageInfo.total
				result.data.data.items.sort((a, b) => {
				  // 将时间字符串转换为Date对象进行比较
				  let timeA = new Date(a.record_date);
				  let timeB = new Date(b.record_date);
				  
				  // 按照时间的先后顺序进行排序
				  return timeB - timeA;
				});
				this.questionData = result.data.data.items
				this.receiveData.task_id = result.data.data.id
				await getSuperviseContent().then(ress => {
					console.log(ress)
					ress.data.data.map(j => {
						res.data.data.content_id == j.id ? res.data.data.super_content = j
							.super_content : ''
					})
				})
				await getSuperviseType().then(resss => {
					// for(let a=0;a<ress.data.length;a++){
					// 	i.super_type == ress.data[a].value?i.super_type=ress.data[a].label:''
					// }
					resss.data.data.map(a => {
						res.data.data.super_type == a.value ? res.data.data.super_type = a.label : ''
					})
				})
				res.data.data.dept !== null ? res.data.data.dept = res.data.data.dept : res.data.data.dept = ''

				const datePart = res.data.data.updated_at.split(" ")[0]

				console.log(res.data.data.updated_at)
				res.data.data.updated_at = datePart
				this.taskData = res.data.data
				this.taskData.super_method == 1 ? this.taskData.super_method = '明察' : this.taskData.super_method = '暗查'

			}
		}
	}
</script>

<style>
	page {
		background-color: #f2f5f7;
	}

	.content {
		background-color: #fff;
		width: 90%;
		padding: 10px;
		border-radius: 10px;
		margin: 5% 0 5% 0;

	}

	.content_bottom {
		background-color: #fff;
		width: 90%;
		padding: 10px;
		border-radius: 10px;
		margin-bottom: 3%;
	}
</style>