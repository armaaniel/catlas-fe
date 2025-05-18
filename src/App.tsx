import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar'
import MainLayout from './MainLayout'
import CreateUsers from './CreateUsers'
import Users from './Users'
import ViewUsers from './ViewUsers'

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
