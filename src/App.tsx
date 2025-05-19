import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Navbar from './components/Navbar'
import MainLayout from './components/MainLayout'
import CreateUsers from './views/CreateUsers'
import Users from './views/Users'
import ViewUsers from './views/ViewUsers'

function App() {

  return (
  <BrowserRouter>
  <Navbar />
  	<Routes>
	<Route element={<MainLayout/>}>
  		<Route path ='/' element={<Home />} />
  		<Route path ='/create_users' element={<CreateUsers />} />
		<Route path = '/users/' element={<ViewUsers />} />
		<Route path = '/users/:id' element={<Users />} />
	</Route>
  	</Routes>
  </BrowserRouter>
  )
}

export default App
