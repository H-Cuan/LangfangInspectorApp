<template>
	<view>
		<view class="content">
			<list>
				<cell v-for="(item, index) in dataList" :key="item.id">
					<view class="list" @click="dealTask(item.id)">
						<view style="width: 10%;">
							<image style="width: 40px;height: 40px;border-radius: 40px;" :src="avatar" alt="">
						</view>
						<view v-if="jichu" style="width: 50%;">
							<view style="font-size: 1.1em;font-weight: bold;">{{item.name}}</view>
							<view style="margin: 5% 0 5% 0;">发布单位：{{item.dept.name}}</view>
							<view style="margin-bottom: 5%;">督察类别：{{item.super_type}}</view>
							<view style="margin-bottom: 5%;">督察方式：{{item.super_method}}</view>
							<view style="margin-bottom: 5%;">督察时间：{{item.super_start_time}}~{{item.super_end_time}}
							</view>
						</view>
						<view v-if="guanli" style="width: 50%;">
							<view style="font-size: 1.1em;font-weight: bold;">{{item.name}}</view>
							<view style="margin: 5% 0 5% 0;">问题涉及单位：{{item.dept.name}}</view>
							<view style="margin-bottom: 5%;">推送时间：{{item.updated_at}}</view>
							<view style="margin-bottom: 5%;">督察方式：{{item.super_method}}</view>
							<view style="margin-bottom: 5%;">预警级别：2级</view>
						</view>
						<view style="width: 30%;">
							<view>{{item.updated_at}}</view>
							<view v-if="stateD">
								<image v-if="guanli" style="width: 80px;height: 80px;margin-top: 20%;"src="@/static/daishenpi.png" alt="">
								<image v-if="jichu" style="width: 80px;height: 80px;margin-top: 20%;"src="@/static/daiducha.png" alt="">	
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
import { questionList2 } from '@/api/api'
	export default {
		data() {
			return {
				dataList:[]
			}
		},
		onShow() {
			this.getList()
		},
		methods: {
			async getList(){
				const res = await questionList2()
				console.log(res)
				this.dataList = res.data.data.items
			}
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
