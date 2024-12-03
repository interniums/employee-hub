import { Outlet } from 'react-router'
import Header from './components/Header'
import Popup from './components/common/PopUp'
import Sheet from './components/NavSheet'

function App() {
  return (
    <>
      <Sheet />
      <Popup />
      <Header />
      <Outlet />
    </>
  )
}

export default App
