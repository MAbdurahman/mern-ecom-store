import {createRoot} from 'react-dom/client';
import './index.css';
import App from './app/App.jsx';
import {BrowserRouter} from 'react-router-dom';
import NotificationProvider from './context/notificationContext.jsx';
import {Provider} from 'react-redux';
import store from './store/store.js';

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <Provider store={store}>
         <NotificationProvider>
            <App/>
         </NotificationProvider>
      </Provider>
   </BrowserRouter>
)