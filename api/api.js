import request from '../utils/request.js'
// 登录
export const login =(data,header) => {
	// console.log()
	return request({
		url:'/auth/system/idcardLogin',
		method:'post',
		data:data,
		header:header
	})
};
// 退出
export const logout =(data) => {
	// console.log()
	return request({
		url:'/auth/system/logout',
		method:'post',
		data:data,
	})
};
// 修改密码
export const modifyPassword =(data) => {
	// console.log()
	return request({
		url:'/auth/system/user/modifyPassword',
		method:'post',
		data:data,
	})
};
// access token 
export const getAccessToken =(data) => {
	// console.log()
	return request({
		url:'/oauth2/token',
		method:'post',
		data:data,
	})
};
// 获取个人信息
export const getInfo =(data) => {
	// console.log()
	return request({
		url:'/auth/system/getInfo',
		method:'get',
		data:data,
	})
};
// 获取消息列表
export const getMsgList =(data) => {
	// console.log()
	return request({
		url:'/auth/system/queueMessage/receiveList',
		method:'get',
		params:{
			page:1,
			pageSize:20,
			read_status:'all'
		},
		data:data,
	})
};
// 删除消息
export const delMsg =(data) => {
	// console.log()
	return request({
		url:'/auth/system/queueMessage/deletes/'+data.id,
		method:'delete',
		data:data,
	})
};
// 上传图片
export const uploadImage =(data) => {
	// console.log()
	return request({
		url:'/auth/system/uploadImage',
		method:'post',
		data:data,
	})
};
// 获取部门树
export const getDeptTreeList =(data) => {
	// console.log()
	return request({
		url:'/auth/system/common/getDeptTreeList',
		method:'get',
		data:data,
	})
};
// 更新用户信息
export const updateInfo =(data) => {
	// console.log()
	return request({
		url:'/auth/system/user/updateInfo',
		method:'post',
		data:data,
	})
};
// 获取基层民警任务
export const getTask =(data) => {
	// console.log()
	return request({
		url:'/auth/supervise/task/index?page=1&pageSize=20&status=' + data,
		method:'get',
		
	})
};
// 获取督察类别
export const getSuperviseType =(data) => {
	// console.log()
	return request({
		url:'/auth/system/dataDict/list?code=supervise_type',
		method:'get',
		
	})
};
// 获取督察类别
export const getSuperviseMethod =(data) => {
	// console.log()
	return request({
		url:'/auth/system/dataDict/list?code=supervise_method',
		method:'get',
		
	})
};
// 获取督察内容
export const getSuperviseContent =(data) => {
	// console.log()
	return request({
		url:'/auth/supervise/content/list',
		method:'get',
		
	})
};