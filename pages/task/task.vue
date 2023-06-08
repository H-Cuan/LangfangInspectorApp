<template>
	<view>
		<!-- tab栏切换动态改变激活样式 -->
		<view class="nav">
			<view class="nav-list" v-for="(item,index) in list" :key="item.id" @tap="changeAct(item)">

				<!-- 激活样式名字是红色 判断act==index 和act==item.id都行-->
				<view :class="[act==index?'name':'']">
					{{item.name}}
				</view>
				<!-- 名字下面的横线 -->
				<view :class="[act==index?'line':'']">
				</view>
			</view>

		</view>

		<!-- 内容的改变 -->
		<view class="content">
			<list>
				<cell v-for="(item, index) in dataList" :key="item.id">
					<view class="list">
						<view style="width: 10%;">
							<img style="width: 40px;height: 40px;border-radius: 40px;" :src="avatar" alt="">
						</view>
						<view style="width: 50%;">
							<view style="font-size: 1.1em;font-weight: bold;">{{item.name}}</view>
							<view style="margin: 5% 0 5% 0;">发布单位：</view>
							<view style="margin-bottom: 5%;">督察类别：{{item.super_type}}</view>
							<view style="margin-bottom: 5%;">督察方式：{{item.super_method}}</view>
							<view style="margin-bottom: 5%;">督察时间：{{item.super_start_time}}~{{item.super_end_time}}
							</view>
						</view>
						<view style="width: 30%;">
							<view>{{item.updated_at}}</view>
							<view><img v-if="stateD" style="width: 80px;height: 80px;margin-top: 20%;"
									src="../../static/daishenpi.png" alt=""></view>
							<view><img v-if="stateB" style="width: 80px;height: 80px;margin-top: 20%;"
									src="../../static/banlizhong.png" alt=""></view>
							<view><img v-if="stateY" style="width: 80px;height: 80px;margin-top: 20%;"
									src="../../static/yiwancheng.png" alt=""></view>
						</view>
					</view>
				</cell>
			</list>
		</view>
	</view>
</template>

<script>
	import {
		getInfo,
		getTask,
		getSuperviseType
	} from '@/api/api.js'
	export default {
		data() {
			return {
				// 默认激活样式是第一个
				act: 0,
				avatar: '',
				dataList: [

				],
				stateD: false,
				stateB: false,
				stateY: false,
				status: '',
				list: [{
						id: 0,
						name: '待处理'
					},
					{
						id: 1,
						name: '办理中'
					},
					{
						id: 2,
						name: '已完结'
					}

				],

			};
		},
		onLoad(e) {
			this.getSuperviseType()
			console.log(uni.getStorageSync('userType'))
			this.status = e.type
			this.act = e.type
			this.getAvatar()
			this.getTask()
		},
		methods: {
			// 获取督察类别
			async getSuperviseType() {
				const res = await getSuperviseType()
				console.log(res)
			},
			 changeAct(item) {
				// 激活样式是当前点击的对应下标--list中对应id
				this.act = item.id;
				const that = this
			 getTask(item.id).then(res => {
				 console.log(res)
					if(res.data.data.items!=''){
						res.data.data.items.map(i => {
							i.name = i.task_title
							i.updated_at = i.updated_at.replace(/\s\d{2}:\d{2}:\d{2}$/, '');
							i.super_method == 1 ? i.super_method = '明察' : i.super_method = '暗查'
							 getSuperviseType().then(ress => {
								 console.log(ress)
								// for(let a=0;a<ress.data.length;a++){
								// 	i.super_type == ress.data[a].value?i.super_type=ress.data[a].label:''
								// }
								ress.data.data.map(a => {
									i.super_type == a.value ? i.super_type = a.label : ''
								
									if (item.id == 0) {
										this.stateD = true,
											this.stateB = false,
											this.stateY = false
									}
									if (item.id == 1) {
										this.stateD = false,
											this.stateB = true,
											this.stateY = false
									}
									if (item.id == 2) {
										this.stateD = false,
											this.stateB = false,
											this.stateY = true
									}
									this.dataList = res.data.data.items
								})
							})
						
						
						})
					}else{
						this.dataList = res.data.data.items
					}
					
					
				})

				// 可以根据点击事件改变内容

			},
			// 获取个人头像
			async getAvatar() {
				const res = await getInfo()
				console.log(res)
				this.avatar = res.data.data.user.avatar
			},
			// 获取任务列表
			async getTask() {
				const res = await getTask(this.status)
				console.log(res)
				res.data.data.items.map(i => {
					i.name = i.task_title
					i.updated_at = i.updated_at.replace(/\s\d{2}:\d{2}:\d{2}$/, '');
					i.super_method == 1 ? i.super_method = '明察' : i.super_method = '暗查'
					getSuperviseType().then(ress => {
						// for(let a=0;a<ress.data.length;a++){
						// 	i.super_type == ress.data[a].value?i.super_type=ress.data[a].label:''
						// }
						ress.data.data.map(a => {
							i.super_type == a.value ? i.super_type = a.label : ''
							if (this.status == 0) {
								this.stateD = true,
									this.stateB = false,
									this.stateY = false
							}
							if (this.status == 1) {
								this.stateD = false,
									this.stateB = true,
									this.stateY = false
							}
							if (this.status == 2) {
								this.stateD = false,
									this.stateB = false,
									this.stateY = true
							}
							this.dataList = res.data.data.items
						})
					})
				})

			}

		},
		onShow(e) {

			// 页面默认显示的是list列表中第一条数据

		}
	}
</script>

<style>
	page {
		width: 100%;
		background-color: #f2f5f7;
	}

	cell {
		display: flex;
		justify-content: center;
	}

	.nav {
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #fff;
		font-size: 30rpx;
		letter-spacing: 2.14rpx;
	}

	.nav-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		width: 20%;
		height: 100%;
		margin-top: 40rpx;
		opacity: .9;
	}

	.nav-list .name {
		color: #5085FF;
	}

	.nav-list .line {
		margin-top: 10rpx;
		width: 65%;
		height: 4rpx;
		background-color: #5085FF;
	}

	.list {
		padding-top: 10px;
		display: flex;
		width: 90%;
		border-radius: 10px;
		justify-content: space-around;
		margin: 10px 0 10px 0;
		background-color: #fff;
	}

	/* 内容 */
	.content {}
</style>