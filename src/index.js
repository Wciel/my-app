import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route,Switch } from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import AuthRoute from './component/authroute/authroute'

import Dashboard from './component/dashboard/dashboard'　//其他页面暂时交给dashboard页面管理
import reducers from './reducers'
import Chat from './component/chat/chat'
import App from './app'
import './config'
import './index.css'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<App></App>
		</BrowserRouter>
	 </Provider>),
	document.getElementById('root')
)
