import { message } from 'antd';
import jsonp from 'jsonp';
import ajax from './ajax.js';

/**
 * 这是登陆的接口请求函数
 * @param {*} username 用户名
 * @param {*} password 密码
 * @returns promise对象
 */
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST');

/**
 * 添加用户接口请求函数
 * @param {*} user 用户对象
 * @returns promise对象
 */
export const reqAddUser = user => ajax('/manage/user/add', { user }, 'POST');

/**
 * 更新用户接口请求函数
 * @param {*} user 用户对象
 * @returns promise对象
 */
export const reqUpdateUser = user => ajax('/manage/user/update', { user }, 'POST');

/**
 * 返回一级或二级品类列表
 * @param parentId  父分类列表的id
 * @returns {Promise | Promise<unknown>}
 */
export const reqCategory = parentId => ajax('/manage/category/list', { parentId });

/**
 * 添加品类信息
 * @param parentId  添加品类的父品类id
 * @param categoryName  添加品类的名称
 */
export const addCategory = (parentId, categoryName) => {
	ajax('/manage/category/add', { parentId, categoryName }, 'POST');
};

/**
 * 更新品类名称
 * @param categoryId    父级分类的ID
 * @param categoryName  名称
 */
export const updataCategory = (categoryId, categoryName) => {
	return ajax('/manage/category/update', { categoryId, categoryName }, 'POST');
};

/**
 *
 * @param  pageNum 页码
 * @param  pageSize 每页条目数
 */
export const getProducts = (pageNum, pageSize) => {
	return ajax('/manage/product/list', { pageNum, pageSize });
};

/**
 *
 * @param city 高德城市码
 */
export const getWeather = city => {
	//jsonp发送请求
	return new Promise((resolve, reject) => {
		//请求url
		const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=3cb4f0ed55ba32b2a979897ef3b114a4&city=${city}&extensions=base`;
		jsonp(url, {}, (err, data) => {
			// console.log("jsonp() ", err, data);
			//如果成功了
			if (!err && data.status === '1') {
				//取出需要数据 区域、温度、天气
				const { city, temperature, weather, winddirection } = data.lives[0];
				resolve({ city, temperature, weather, winddirection });
			} else {
				message.error('获取天气信息失败！');
			}
		});
	});
};

// getWeather("330105");
