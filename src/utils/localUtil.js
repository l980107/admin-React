import store from "store";
/*
    永久性存储对象工具
*/
const USER_KEY = "user_key";
export default {



    /*
        保存user
    */
    saveUser(user) {
        // //转换成json格式字符串
        // localStorage.setItem(USER_KEY, JSON.stringify(user));
        store.set(USER_KEY, user);
    },
    /*
        读取
    */
    getUser() {
        //解析成对象
        // JSON.parse(localStorage.getItem(USER_KEY));
        return store.get(USER_KEY) || {};
    },
    /*
        删除
    */
    removeUser() {
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY);
    }
}