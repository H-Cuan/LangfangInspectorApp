import axios from 'axios'

// const request = axios.create({
// 	baseURL: '/api',
// 	timeout:100000,
// 	headers:{
// 					'x-api-header': 'yuanxibing',
// 					'x-access-token': accessToken
// 				}
// });
// request.interceptors.request.use(function(config){
// 	console.log(config)
// 	 if(config){
// 		 let accessToken = uni.getStorageSync("access_token")
// 		 let token = `Bearer ${uni.getStorageSync("Token")}`
// 		 let x_access_token = 'x-access-token'
// 		 console.log(token)
// 		  if (token) {
// 		     config.headers.Authorization = token // 设置请求时携带token回到服务器0448c510293ec25fb130e8334a392874
// 			 config.headers['x-access-token'] = accessToken
// 		   }
// 		 }
// 	 return  config
// }
// , function (error) {
// 	console.log(error)
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })
// // 响应拦截器
// request.interceptors.response.use(function(response){
// 	// console.log(response)
// 	return response.data
// },function(err){
// 	console.log(err)
// 	if(err.response.status==401){
// 			uni.navigateTo({
// 				url:'/pages/login/login'
// 			})
// 		}
// 	return err
// }
// )


// 请求服务器地址
const baseUrl = '/api'
//const baseUrl = 'https://192.168.2.77:8443'
// 向外暴露一个方法 myRequest
const request = (options) => {
	//加载loading
	 uni.showLoading({
	    title: "加载中",
	    mask: true,
	  });
	const Token =  `Bearer ${uni.getStorageSync("Token")}`
	  // 获取 token
	  const token = uni.getStorageSync("Token");
	const accessToken = uni.getStorageSync("access_token")
	  // 在请求头中添加 token
	  if (token) {
	    options.header={
			'x-api-header': 'yuanxibing',
			'x-access-token':  accessToken,
	      Authorization: Token,
	    };
	  }
	return new Promise((resolve, reject) => {
		uni.request({
			// 开发者服务器接口地址（请求服务器地址 + 具体接口名）
			url: baseUrl + options.url,
			// 请求方式（若不传，则默认为 GET ）
			method: options.method || 'GET',
			// 请求参数（若不传，则默认为 {} ）
			data: options.data || {},
			header:options.header||{
				'x-api-header': 'yuanxibing',
				'x-access-token':  accessToken,
				Authorization: Token
			},
			// 请求成功
			success: (res) => {
				 uni.hideLoading();
				// 此判断可根据自己需要更改
				// 添加响应拦截器
				        if (res.statusCode === 401) {
				          // 对响应数据做些什么
				          uni.navigateTo({
				          	url:'/pages/login/login'
				          })
				          // 返回响应数据
				          resolve(res.data);
				        } 
				resolve(res)
			},
			// 请求失败
			fail: (err) => {
			 uni.hideLoading();
		
				reject(err)
			},
			//请求结束之后，执行的回调函数（成功或失败都会执行）
			complete() {
			
			}
		})
	})
}

export default request
