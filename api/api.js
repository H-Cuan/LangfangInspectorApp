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
		url:'/auth/oauth2/token',
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
// 新建督察内容
export const superviseSave =(data) => {
	// console.log()
	return request({
		url:'/auth/supervise/task/save',
		method:'post',
		data:data
	})
};
// 获取审核流程
export const getWorkflow =(data) => {
	// console.log()
	return request({
		url:'/auth/process/workflow/read/1',
		method:'get',
	})
};
// 获取用户列表
export const getUserList =(data) => {
	// console.log()
	return request({
		url:'/auth/system/user/index?page=1&pageSize=20',
		method:'get',
	})
};
// 新建分组
export const addGroup =(data) => {
	// console.log()
	return request({
		url:'/auth/supervise/group/save',
		method:'post',
		data:data
	})
};
// 任务详情
export const taskDetails =(data) => {
	// console.log()
	return request({
		url:'/auth/supervise/task/read/'+ data,
		method:'get',
	})
};
// 获取分组信息
export const groupDetails =(data) => {
	// console.log()
	return request({
		url:'/auth/supervise/group/index?group_name='+ data,
		method:'get',
	})
};
// 接收任务
export const taskStatus =(data) => {
	// console.log()
	return request({
		url:'/auth/supervise/task/taskStatus',
		method:'put',
		data:data
	})
};
// 获取问题列表
export const questionList =(data) => {
	// console.log()
	return request({
		url:'/auth/supervise/question/index?page=1&pageSize=20&dept_id='+ data,
		method:'get',
	})
};
export const questionList2 =(data) => {
	// console.log()
	return request({
		url:'/auth/supervise/question/index?page=1&pageSize=20',
		method:'get',
	})
};
// 获取督察具体问题类型
export const getQuesition =(data) => {
	// console.log()
	return request({
		url:'/auth/system/dataDict/list?code=supervise_quesition',
		method:'get',
	})
};
// 新建督察问题
export const addQuesiton =(data) => {
	// console.log()
	return request({
		url:'/auth/supervise/question/save',
		method:'post',
		data
	})
};
// 督察统计
export const taskStatistics =(data) => {
	// console.log()
	return request({
		url:'/auth/supervise/task/taskStatistics',
		method:'get',
	})
};
// 督察审批
export const saveWorkflowBusiness =(data) => {
	// console.log()
	return request({
		url:'/auth/process/workflowBusiness/save',
		method:'post',
		data
	})
};
// 流程图列表
export const workflowBusinessList =(data) => {
	// console.log()
	return request({
		url:'/auth/process/workflowBusiness/list?business_id=' + data,
		method:'get',
		
	})
};
// 新建流程
export const workflowDesign =(data) => {
	// console.log()
	return request({
		url:'/auth/process/workflow/design',
		method:'post',
		data
	})
};
// 维权列表
export const safeguardingList =(data) => {
	// console.log()
	return request({
		url:'/auth/supervise/safeguarding/index?page=1&pageSize=&status=' + data,
		method:'get',
		
	})
};