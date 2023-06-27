<template>
	<view>
		<view class="content">
			<view style="display: flex;flex-wrap: wrap;justify-content: center;">
				<view style="width: 100%;text-align: center;margin-top: 15%;font-size: 25px;font-weight: bold;">统计报表</view>
				<view style="display: flex;align-items: center;">日期：近一个月({{date2}}~{{date}})</view>
			</view>
			<view style="margin-top: 10%;display: flex;justify-content: space-around;">
				<view style="text-align: center;">
					<view width="100%" style="color: #5085FF;">{{this.task}}</view>
					<view>督察总数</view>
				</view>
				<view class="line"></view>
				<view style="text-align: center;">
					<view width="100%"style="color: #5085FF;">{{8}}</view>
					<view>出动警力</view>
				</view>
				<view class="line"></view>
				<view style="text-align: center;">
					<view width="100%"style="color: #5085FF;">{{this.task2}}</view>
					<view>问题总数</view>
				</view>
					
			</view>
			
		</view>
		
		<view style="font-size: 1.1em;font-weight: bold;margin-top: 10%;"><text style="color: #5085FF;font-size: 1.5em;margin-right: 10px;">|</text>趋势分析</view>
		<view style="width: 100%; background-color: #fff;margin-top: 5%;border-radius: 10px;display: flex;justify-content: center;">
			<image style="width: 90%;height: 150px" src="@/static/2d0f3e21b65db381fc81fd03bc3d15d.png"></image>
		</view>
		<view style="font-size: 1.1em;font-weight: bold;margin-top: 10%;"><text style="color: #5085FF;font-size: 1.5em;margin-right: 10px;">|</text>问题类型</view>
		<view style="width: 100%;height: ; display: flex;justify-content: center; background-color: #fff;margin-top: 5%;border-radius: 10px;">
			<image style="width: 90%;height: 220px;margin-bottom: 15%;" src="/static/5d3cde7391fb687008806498dc3e051.png" ></image>
		</view>
	</view>
	
</template>

<script>
import { taskStatistics } from '../../api/api'
	export default{
		data(){
			return {
				date:'',
				date2:'',
				task:'',
				task2:''
			}
			
		},
		onShow() {
			this.getDate()
			this.getTaskStatistics()
		},
		methods:{
			async getTaskStatistics(){
				const res = await taskStatistics()
				console.log(res)
				this.task2 = res.data.data.quetionTypeData.length
				this.task= res.data.data.quetionTypeData[2].count
			},
			// 获取时间
			getDate(){
				var currentTime = new Date();
				
				// 格式化当前时间
				var year = currentTime.getFullYear();
				var month = currentTime.getMonth() + 1;
				var month2 = currentTime.getMonth();
				var day = currentTime.getDate();
				var hour = currentTime.getHours();
				var minute = currentTime.getMinutes();
				var second = currentTime.getSeconds();
				this.date = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
				this.date2 = year + '-' + (month2 < 10 ? '0' + month2 : month2) + '-' + (day < 10 ? '0' + day : day) 
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
		background-color: #f2f4f8;
	}
	.content{
		width: 100%;
		height: 40%;
		background: linear-gradient(#afc6fe, #f2f4f8);;
	}
	.line{
	 	background:#ccc;/*背景色为浅灰色*/
		width:0.5px;/*设置宽高*/
		height:45px;
		
	
		
	}
</style>