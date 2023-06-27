<template>
	<view style="display: flex;flex-wrap: wrap;justify-content: center;">
		<view class="content">

			<view style="display: flex;margin-top: 10px;">
				<view style="width: 30%;text-align-last: justify;">发布日期：</view>
				<view>{{taskData.updated_at}}</view>
			</view>
			<view style="display: flex;margin-top: 10px;">
				<view style="width: 30%;text-align-last: justify;">发布人：</view>
				<view>{{taskData.user.nickname}}</view>
			</view>
			<view style="display: flex;margin-top: 10px;">
				<view style="width: 30%;text-align-last: justify;">发布名称：</view>
				<view>{{taskData.task_title}}</view>
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
		<view class="content_bottom">
			<view style="padding: 10px;">审批建议:</view>
			<textarea @blur="worddd(e)" style="margin: 10px;" auto-height v-model="receiveData.suggestion"	placeholder="请输入问题具体描述内容" />
		


		</view>
		<view style="width: 100%; margin-top: 5%; position: relative; display: flex;justify-content: space-between;">
			<button @click="Return()"
				style="width: 40%; border-radius: 10px;color: #5086ff;background-color: #fff;">审批退回</button>
			<button @click="receive()"
				style="width: 40%; border-radius: 10px;color: #fff;background-color: #5086ff;">审批通过</button>
		</view>

	</view>
</template>

<script>
	import {
		taskDetails,
		getSuperviseType,
		getSuperviseContent,
		groupDetails,
		saveWorkflowBusiness,
		questionList,
		workflowBusinessList
	} from '../../api/api'
	export default {
		data() {
			return {
				total: '',
				taskId: '',
				taskData: {},
				questionData: [],
				receiveData: {
					workflow_id: '1',
					business_id: '',
					suggestion: "",
					status: '',
					type: ''

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
			this.workflowBusinessList()

		},
		methods: {
			worddd(e){
				
			},
			// 现场督察
			toScene() {
				uni.navigateTo({
					url: '../scene/scene?taskId=' + this.taskId
				})
			},
			async Return(){
				this.receiveData.business_id = 1
				this.receiveData.status = 2
				this.receiveData.type = 2
				console.log(this.receiveData)
				const res = await saveWorkflowBusiness(this.receiveData)
				console.log(res)
				if (res.data.code == 200) {
					uni.showToast({
						icon: 'success',
						title: '提交成功',
						mask: true,
						duration:1500,
						success() {
							uni.navigateBack({
								delta: 1 // 可以不傳delta值，默認為1
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
			// 接收任务
			async receive() {
				this.receiveData.business_id =1
				this.receiveData.status = 1
				this.receiveData.type = 2
				console.log(this.receiveData)
				const res = await saveWorkflowBusiness(this.receiveData)
				console.log(res)
				if (res.data.code == 200) {
					uni.showToast({
						icon: 'success',
						title: '提交成功',
						mask: true,
						duration:1500,
						success() {
							uni.navigateBack({
								delta: 1 // 可以不傳delta值，默認為1
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
			async workflowBusinessList(){
				const res = await workflowBusinessList(this.taskId)
				console.log(res)
				this.receiveData.workflow_id = res.data.data[0].workflow_id
			},

			// 获取任务详情
			async getTaskDetails() {
				const res = await taskDetails(this.taskId)
				console.log(res)
				// 获取问题列表
				const time1 = res.data.data.super_start_time.split(" ")[0];
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
				this.receiveData.business_id = result.data.data.workflow_id
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

	}
</style>