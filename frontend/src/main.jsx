
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './app/App.jsx';
import {BrowserRouter} from 'react-router-dom';
import NotificationProvider from './context/notificationContext.jsx';

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <NotificationProvider>
         <App/>
      </NotificationProvider>
   </BrowserRouter>
)