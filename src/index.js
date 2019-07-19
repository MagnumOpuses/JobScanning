import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store/index'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider 
      preventDuplicate
      maxSnack={3} 
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Router>
        <Route path="/" component={App} />
      </Router>
    </SnackbarProvider>
  </Provider>
,
  document.getElementById('root')
)
registerServiceWorker()
