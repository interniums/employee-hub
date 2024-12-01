import { Outlet } from 'react-router'
import Header from './components/Header'
import Popup from './components/common/PopUp'

function App() {
  return (
    <>
      <Popup />
      <Header />
      <Outlet />
    </>
  )
}

export default App
