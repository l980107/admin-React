import axios from "axios";
import { message } from "antd";


/**
 * 
 * @param {*} url 请求地址
 * @param {*} data  携带的请求参数对象，默认{}因为可能没有请求参数
 * @param {*} type  请求类型, 默认GET 调用时如果为get可以不用传递
 * @returns 
 */
export default function ajax(url, data = {}, type = "GET") {

    return new Promise((resolve) => {
        let promise;
        //根据type发送get请求
        if (type === "GET") {
            promise = axios.get(url, {
                params: data
            });
        }
        
        //post请求
        else {
            promise = axios.post(url, data);
        }

        promise.then((response) => {
            resolve(response.data);
        }, (error) => {
            message.error("请求失败:" + error.message);
        })
    });


}