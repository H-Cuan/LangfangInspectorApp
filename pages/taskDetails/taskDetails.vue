<template>
	<view style="display: flex;flex-wrap: wrap;justify-content: center;">
		<view class="content">
			<view style="display: flex;justify-content: space-between;"><view style="width: 40%;word-break:break-all;font-weight: bold;font-size: 18px;">{{taskData.task_title}}</view><view>{{taskData.updated_at}}</view></view>
			<view style="display: flex;margin-top: 10px;"><view style="width: 30%;text-align-last: justify;">发布人：</view><view>{{taskData.user.nickname}}</view></view>
			<view style="display: flex;margin-top: 10px;"><view style="width: 30%;text-align-last: justify;">发布单位：</view><view style="width: 70%;word-break:break-all;">{{taskData.dept.name}}</view></view>
			<view style="display: flex;margin-top: 10px;"><view style="width: 30%;text-align-last: justify;">督察类别：</view><view style="width: 70%;word-break:break-all;">{{taskData.super_type}}</view></view>
			<view style="display: flex;margin-top: 10px;"><view style="width: 30%;text-align-last: justify;">督察方式：</view><view style="width: 70%;word-break:break-all;">{{taskData.super_method}}</view></view>
			<view style="display: flex;margin-top: 10px;"><view style="width: 30%;text-align-last: justify;">督察日期：</view><view style="width: 70%;word-break:break-all;">{{taskData.super_start_time}}~{{taskData.super_end_time}}</view></view>
			<view style="display: flex;margin-top: 10px;"><view style="width: 30%;text-align-last: justify;">督察内容：</view><view style="width: 70%;word-break:break-all;">{{taskData.super_content}}</view></view>
			<view style="display: flex;margin-top: 10px;"><view style="width: 30%;text-align-last: justify;">督察描述：</view><view style="width: 70%;word-break:break-all;">{{taskData.task_title}}</view></view>
			
		</view>
		<view class="content_bottom" v-for="(item,index) in taskData.group" :key="index">
			<view style="font-size: 18px;font-weight: bold;">
				{{item.group_name}}
			</view>
			<view style="margin-top: 10px;display: flex;">
				<view  style="padding: 10px;" v-for="(item1,index) in item.userList" :key="index">
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
		<button v-if="hidden" @click="receive()" style="position: fixed;width: 90%;border-radius: 10px;color: #fff;background-color: #5086ff;margin-top: 140%;">接收任务</button>
	</view>
</template>

<script>
import { taskDetails, getSuperviseType, getSuperviseContent, groupDetails, taskStatus } from '../../api/api'
	export default {
		data() {
			return {
				hidden:false,
				taskId:'',
				taskData:{},
				receiveData:{
					statusName:'status',
					statusValue:1
				}
			}
		},
		onLoad(e) {
			console.log(e)
			this.taskId=e.taskId
			this.getTaskDetails()
		},
		methods: {
			// 接收任务
			async receive(){
				const res = await taskStatus(this.receiveData)
				console.log(res)
				if(res.data.code==200){
					uni.showToast({
						icon:'success',
						title:'接收成功',
						mask:true,
					success() {
						uni.navigateTo({
							url:'/pages/task/task?type=1'
						})
					}
					})
				}else{
					uni.showToast({
						icon:'error',
						title:'接收失败',
						mask:true
					})
				}
			},
			// 获取任务详情
			async getTaskDetails(){
				const res = await taskDetails(this.taskId)
				console.log(res)
				this.receiveData.task_id = res.data.data.id
				await getSuperviseContent().then(ress=>{
					console.log(ress)
					ress.data.data.map(j=>{
						res.data.data.content_id == j.id?res.data.data.super_content = j.super_content:''
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
				res.data.data.dept!==null?res.data.data.dept=res.data.data.dept:res.data.data.dept = ''
				this.taskData = res.data.data
				this.taskData.super_method == 1 ? this.taskData.super_method = '明察' : this.taskData.super_method = '暗查'
				
			}
		}
	}
</script>

<style>
page{
	background-color: #f2f5f7;
}
.content{
	background-color: #fff;
	width: 90%;
	padding: 10px;
	border-radius: 10px;
	margin: 5% 0 5% 0;

}
.content_bottom{
	background-color: #fff;
	width: 90%;
	padding: 10px;
	border-radius: 10px;
	margin-bottom: 3%;
}
</style>

