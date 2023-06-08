<template>
	 <uni-list>
			<uni-swipe-action>
		 		<uni-swipe-action-item v-for="(item,index) in list" :right-options="options1" @click="delMessage(item)" >
					<template >
							<uni-list-chat :clickable="true" :key="index" :title='item.title' avatar="http://192.168.2.206:9502/uploadfile/20230601/522805289091670016.png" :note="item.content" :time="item.updated_at" ></uni-list-chat>
					</template>
				</uni-swipe-action-item>
			</uni-swipe-action>
	</uni-list>
</template>
<script>
	import {delMsg, getMsgList} from '@/api/api.js'
	export default {
		data(){
			return{
				list:[],
				options1: [
								{
									text: '删除',
									style:{
										backgroundColor: '#dd524d'

									}
								}
							]
			}
		},
		onShow() {
			this.getMsg()
		},
		methods:{
			// 获取消息列表
			async getMsg(){
				const res =await getMsgList()
				console.log(res)
				res.data.data.items.sort(function(a, b) {
				  // 将 create_time 字段转换为时间戳进行比较
				  return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
				});
				const ww = res.data.data.pageInfo.total.toString()
				 uni.setTabBarBadge({
				        index: 2,//tabbar中的索引
				        text: ww,//角标内容字符串  不超过三个 `半角字符`
				    })
				this.list =res.data.data.items
				
			},
			// 删除消息
			 delMessage(e){
				 console.log(e)
				 const that = this
				 uni.showModal({    // 弹框询问是否进行下一步事件
				        title: '提示',
				        content: '是否删除该消息',
				        success: function(res) {
				            if (res.confirm) {
				                console.log('用户点击确定');
								delMsg({id:e.id}).then(res=>{
									console.log(res)
									if(res.data.code==200){
										uni.showToast({
											icon:'success',
											title:'删除成功',
											mask:true
										})
										that.getMsg()
									}else{
										uni.showToast({
											icon:'error',
											title:'删除失败',
											mask:true
										})
									}
								})
				            } else if (res.cancel) {
				                console.log('用户点击取消');
				                return
				            }
				        }
				    });
			}
		}
	}
</script>
<style>
	
</style>
