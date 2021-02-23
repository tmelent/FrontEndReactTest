import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './containers/App'
import reportWebVitals from './reportWebVitals'
import store from './store/store'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DataTable from './containers/DataTable'


const routing = (
  <Router>
    <div className="page" />
    <React.StrictMode>
      <Provider store={store}>
        <Switch>

          <Route exact path="/" component={App} />
          <Route exact path="/table" component={DataTable} />

        </Switch>
      </Provider>
    </React.StrictMode>
  </Router>
)
/*
const old = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
*/
ReactDOM.render(routing, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

