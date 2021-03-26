import ajax from "./ajax.js";

/**
 * 这是登陆的接口请求函数
 * @param {*} username 用户名
 * @param {*} password 密码
 * @returns promise对象
 */
export const reqLogin = (username, password) =>
    ajax("/login", { username, password }, 'POST');


/**
 * 添加用户接口请求函数
 * @param {*} user 用户对象
 * @returns promise对象
 */
export const reqAddUser = (user) =>
    ajax('/manage/user/add', { user }, 'POST');


/**
 * @param {*} user 用户对象
 * @returns promise对象
 */
export const reqUpdateUser = (user) => ajax('/manage/user/update', { user }, 'POST');