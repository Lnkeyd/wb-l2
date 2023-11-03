import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { checkPermission, registerNotificationPermission, registerSW } from './utils/registerSW.js';

checkPermission();
registerSW();
registerNotificationPermission();

// структура: [App -> Home]
//            /     |     \
//           /      |      \
//       [Tasks] [MenuBar] [Modal]
//          |
//     [SingleTask]

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
