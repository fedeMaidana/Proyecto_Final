import ReactDOM from 'react-dom/client'
import { App } from './components/App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import reportWebVitals from 'reportWebVitals'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import './index.css'

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
    <Provider store={ store } >
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </Provider>
)

// reportWebVitals()

