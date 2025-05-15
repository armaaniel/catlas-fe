import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar'
import MainLayout from './MainLayout'
import CreateUsers from './CreateUsers'

function App() {

  return (
  <BrowserRouter>
  <Navbar />
  	<Routes>
	<Route element={<MainLayout/>}>
  		<Route path ='/' element={<Home />} />
  		<Route path ='/create_users' element={<CreateUsers />} />
	</Route>
  	</Routes>
  </BrowserRouter>
  )
}

export default App
