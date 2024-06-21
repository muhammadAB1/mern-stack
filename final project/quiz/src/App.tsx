import { WhoUser } from './components/askUser/whoUser'

import './App.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'




function App() {


  return (
    <Provider store = {store}>
            <WhoUser/>
          </Provider>
);
}

export default App
