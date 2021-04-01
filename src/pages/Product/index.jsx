import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProductHome from './ProductHome';
import ProductAdd from './ProductAdd';
import ProductInfo from './ProductInfo';
/**
 * 商品管理路由
 */
export default class Product extends Component {
	render() {
		return (
			<Switch>
				<Route path='/product' component={ProductHome} exact></Route>
				<Route path='/product/add' component={ProductAdd}></Route>
				<Route path='/product/info' component={ProductInfo}></Route>
				<Redirect to='/product'></Redirect>
			</Switch>
		);
	}
}
