<template>
	<list>
		 <cell v-for="(item, index) in dataList" :key="item.id">
		     <view class="list">
				 <view>
					 <img style="width: 40px;height: 40px;border-radius: 40px;" :src="avatar" alt="">
				 </view>
				 <view>
					 <view>{{item.name}}</view>
					 <view></view>
					 <view></view>
					 <view></view>
					 <view></view>
				 </view>
				 <view>{{item.updated_at}}</view>
			 </view>
		    </cell>
	</list>
</template>

<script>
	import{getInfo, getTask} from '@/api/api.js'
</script>

<style>
</style>