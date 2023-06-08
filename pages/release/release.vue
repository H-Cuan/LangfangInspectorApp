<template>
	<view style="display: flex;justify-content: center;flex-wrap: wrap;">
		<view class="content">
			<view class="form">
				<view style="display: flex; align-items: center;height: 40px;justify-content: space-between;">
					<view>发布日期：</view>
					{{date}}
				</view>
				<view style="border-bottom: 1px #ccc solid;"></view>
				
				<view style="display: flex;align-items: center;height: 40px;justify-content: space-between;">
					<view>发布人：</view>
					{{updata.nickname}}
				</view>
				<view style="border-bottom: 1px #ccc solid;"></view>
				<view style="display: flex;align-items: center;height: 40px;justify-content: space-between;">
					<view>发布单位：</view>
				{{dept}}
				</view>
				<view style="border-bottom: 1px #ccc solid;"></view>
				<view style="display: flex;align-items: center;height: 40px;justify-content: space-between;">
					<view>发布名称：</view>
					<input v-model="addTask.task_title" style="text-align: right;" type="text">
				</view>
				<view style="border-bottom: 1px #ccc solid;"></view>
			</view>
		</view>
		<view class="content">
			<view class="form">
				<view style="display: flex; align-items: center;height: 40px;justify-content: space-between;">
					<view>督察类别：</view>
				<picker @change="bindPickerChange($event,range)" :value="index" :range="range">
										<view class="uni-input">{{range[index]}}</view>
									</picker>
				</view>
				<view style="border-bottom: 1px #ccc solid;"></view>
				
				<view style="display: flex;align-items: center;height: 40px;justify-content: space-between;">
					<view>督察方式：</view>
					<picker @change="bindPickerChange2" :value="index2" :range="range2">
											<view class="uni-input">{{range2[index2]}}</view>
										</picker>
				</view>
				<view style="border-bottom: 1px #ccc solid;"></view>
				<view style="display: flex;align-items: center;height: 40px;justify-content: space-between;">
					<view>督察内容：</view>
			<picker @change="bindPickerChange3" :value="index3" :range="range3">
									<view class="uni-input">{{range3[index3]}}</view>
								</picker>
				</view>
				<view style="border-bottom: 1px #ccc solid;"></view>
				<view style="display: flex;align-items: center;height: 40px;justify-content: space-between;">
					<view>督察日期：</view>
					<input v-model="addTask.task_title" style="text-align: right;" type="text">
				</view>
				<view style="border-bottom: 1px #ccc solid;"></view>
			</view>
		</view>
		
	</view>
</template>

<script>
import { getInfo, getSuperviseMethod, getSuperviseType, getSuperviseContent} from '../../api/api'
	export default {
		data() {
			return {
				dept:'',
				date:'',
				updata:{},
				addTask:{},
				range:[],
				range2:[],
				range3:[],
				index:0,
				index2:0,
				index3:0
			}
		},
		onLoad() {
			this.getType()
			this.getMethod()
			this.getContent()
		},
		onShow() {
			this.getInfo()
		},
		methods: {
			bindPickerChange: function(e,range) {
			            console.log(e)
						  console.log(range)
			            this.index = e.detail.value
						this.addTask.super_type = e.detail.value + 1
						console.log(this.addTask.super_type)
			        },
			bindPickerChange2: function(e) {
			            console.log('picker发送选择改变，携带值为', e.detail.value)
			            this.index2 = e.detail.value
						this.addTask.super_method = e.detail.value + 1
						console.log(this.addTask.super_method)
			        },
					bindPickerChange3: function(e) {
					            console.log(e)
					            this.index3 = e.detail.value
	
					        },
			// 获取督察方式
			async getMethod(){
				const res = await getSuperviseMethod()
				console.log(res)
				for(let i = 0;i<res.data.data.length;i++){
					this.range2.push(res.data.data[i].label)
				}
			},
			// 获取督察内容
			async getContent(){
				const res = await getSuperviseContent()
				console.log(res)
				for(let i = 0;i<res.data.data.length;i++){
					this.range3.push(res.data.data[i].super_content)
				}
			},
			// 获取督察类别
			async getType(){
				const res = await getSuperviseType()
				console.log(res)
				for(let i = 0;i<res.data.data.length;i++){
					this.range.push(res.data.data[i].label)
				}
			 
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
				let formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
				
				// 输出结果
				this.date = formattedDate

				const res = await getInfo()
				console.log(res)
				this.updata = res.data.data.user
				this.dept = res.data.data.dept.name
			}
		}
	}
</script>

<style>
page{
	height: 100%;
	background-color: #f3f5f9;
}
.content{
	margin-top: 5%;
	border-radius: 3%;
	width: 90%;
	background-color: #fff;
}
.form{
	margin: 10px;
}
</style>
