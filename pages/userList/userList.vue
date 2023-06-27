<template>
	<view>
		<list>
			<checkbox-group @change="selectUser">
				<label>
					<cell v-for="(item, index) in List" :key="item.id">
						<view class="content">
							<view style="display: flex;align-items: center;">
								<checkbox :value="item" color="#126bff" style="transform:scale(0.7)" />
								<img style="margin-left: 10px; width: 40px;height: 40px;border-radius: 40px;"
									:src="item.avatar" alt="">
								<view style="margin-left: 10%;">{{item.nickname}}</view>
							</view>
						</view>
					</cell>
				</label>
			</checkbox-group>
		</list>
		<button @click="addUser" style="position:fixed;width: 80%;margin-top: 30%;margin-left: 10%;background-color: #588bf9;color: #fff;">添加组员</button>
	</view>
</template>

<script>
	import {
		getUserList
	} from '../../api/api'
	export default {
		data() {
			return {
				List: [],
				selectList: []
			}
		},
		onShow() {
			this.getUserList()
		},
		methods: {
			async getUserList() {
				const res = await getUserList()
				console.log(res)
				this.List = res.data.data.items
			},
			selectUser(e) {
				console.log(e)
				this.selectList = e.detail.value
			},
			addUser(){
				let pages = getCurrentPages(); // 获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				let object = this.selectList
	
				prevPage.$vm.otherFun(object)// 給上一頁綁定方法otherFun,傳參object
				uni.navigateBack({
				    delta:1 // 可以不傳delta值，默認為1
				})
			}
		}
	}
</script>

<style>
	page {}

	.content {
		background-color: #fff;
		width: 100%;
		margin-top: 10px;
	}
</style>