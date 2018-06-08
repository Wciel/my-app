import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect,Switch } from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import AuthRoute from './component/authroute/authroute'
import GeniusInfo from './component/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'　//其他页面暂时交给dashboard页面管理
import reducers from './reducers'
import Chat from './component/chat/chat'
import './config'
import './index.css'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>　{/*单纯检测我们的路由是不是ok了*/}
					<Switch>　{/*swith的作用只要命中一个，其他下面的就不会执行了*/}
						<Route path='/bossinfo' component={BossInfo}></Route>
						<Route path='/geniusinfo' component={GeniusInfo}></Route>
						<Route path='/login' component={Login}></Route>
						<Route path='/register' component={Register}></Route>
						<Route path='/chat/:user' component={Chat}></Route>
						<Route component={Dashboard}></Route>　{/*在没有path的情况下就会自动跳到这里来，没有switch,进入任何一个页面都会显示dashboard
					                                   如果没有任何路由命中就会跳到Ｄashboard里面*/}
					</Switch>
				
			</div>
		</BrowserRouter>
	 </Provider>),
	document.getElementById('root')
)
