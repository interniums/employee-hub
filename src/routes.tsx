import { RouteObject } from 'react-router'
import App from './App'
import Notes from './components/Notes'
import Sign from './components/Sign'
import Login from './components/Login'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/notes', element: <Notes /> },
      { path: '/sign-up', element: <Sign /> },
      { path: '/sign-in', element: <Login /> },
    ],
  },
]
