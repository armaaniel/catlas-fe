import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Navbar from './components/Navbar'
import MainLayout from './components/MainLayout'
import CreateUsers from './views/CreateUsers'
import UsersOverview from './views/UsersOverview'
import ViewUsers from './views/ViewUsers'
import ModifyUsers from './views/ModifyUsers'


function App() {

  return (
  <BrowserRouter>
  <Navbar />
  	<Routes>
	<Route element={<MainLayout/>}>
  		<Route path ='/' element={<Home />} />
  		<Route path ='/create_users' element={<CreateUsers />} />
		<Route path = '/users/' element={<ViewUsers />} />
		<Route path = '/users/overview/:id' element={<UsersOverview />} />
		<Route path = '/users/modifyusers/:id' element={<ModifyUsers />} />
	</Route>
  	</Routes>
  </BrowserRouter>
  )
}

export default App
