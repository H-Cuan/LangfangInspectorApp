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
					<view class="list" @click="dealTask(item.id)">
						<view style="width: 10%;">
							<image style="width: 40px;height: 40px;border-radius: 40px;" :src="avatar" alt="">
						</view>
						<view  style="width: 50%;">
							<view style="font-size: 1.1em;font-weight: bold;">{{item.user.nickname}}</view>
							<view style="margin: 5% 0 5% 0;">申请人名称：{{item.user.nickname}}</view>
							<view style="margin-bottom: 5%;">申请人单位：{{item.dept.name}}</view>
							<view style="margin-bottom: 5%;">事实和理由：{{item.desc}}</view>
							<view style="margin-bottom: 5%;">事发时间：{{item.incident_time}}
							</view>
						</view>
					
						<view style="width: 30%;">
							<view>{{item.updated_at}}</view>
							<view v-if="stateD">
								<image style="width: 80px;height: 80px;margin-top: 20%;"src="@/static/daishenpi.png" alt="">
							
									</view>
							<view><image v-if="stateB" style="width: 80px;height: 80px;margin-top: 20%;"
									src="@/static/banlizhong.png" alt=""></view>
							<view><image v-if="stateY" style="width: 80px;height: 80px;margin-top: 20%;"
									src="@/static/yiwancheng.png" alt=""></view>
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
		safeguardingList,
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
						name: '已处理'
					},
					

				],

			};
		},
		
		onLoad(e) {
	
			console.log(uni.getStorageSync('userType'))
			
			this.status = e.type
			this.act = e.type
			this.getAvatar()
			this.getTask()
		},
		methods: {
			// 接收任务
			dealTask(e){
				
			},
		
			 changeAct(item) {
				// 激活样式是当前点击的对应下标--list中对应id
				this.act = item.id;
				const that = this
				
				uni.showLoading({
				                    title: '加载中',
									mask:true
				                });
			 safeguardingList(item.id).then(res => {
				 console.log(res)
					if(res.data.data.items!=''){
						
							
							
							
								// for(let a=0;a<ress.data.length;a++){
								// 	i.super_type == ress.data[a].value?i.super_type=ress.data[a].label:''
								// }
							
									
								
									if (item.id == 0) {
										this.stateD = true,
											this.stateB = false,
											this.stateY = false
									}
									
									if (item.id == 1) {
										this.stateD = false,
											this.stateB = false,
											this.stateY = true
									}
									uni.hideLoading();
									this.dataList = res.data.data.items.sort((a, b) => {
										// 将时间字符串转换为Date对象进行比较
											let timeA = new Date(a.created_at);
											let timeB = new Date(b.created_at);
				  
											// 按照时间的先后顺序进行排序
											return timeB - timeA;
									});
								
							
						
						
						
					}else{
						
uni.hideLoading();
						this.dataList = res.data.data.items.sort((a, b) => {
										// 将时间字符串转换为Date对象进行比较
											let timeA = new Date(a.created_at);
											let timeB = new Date(b.created_at);
				  
											// 按照时间的先后顺序进行排序
											return timeB - timeA;
									});
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
				uni.showLoading({
				                    title: '加载中',
									mask:true
				                });
				const res = await safeguardingList(this.status)
				console.log(res)
			
						
							if (this.status == 0) {
									this.stateD = true,
									this.stateB = false,
									this.stateY = false
							}
							
							if (this.status == 1) {
									this.stateD = false,
									this.stateB = false,
									this.stateY = true
							}
							uni.hideLoading();
							this.dataList = res.data.data.items
				

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