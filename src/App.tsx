import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Navbar from './components/Navbar'
import MainLayout from './components/MainLayout'
import LayoutTwo from './components/LayoutTwo'
import CreateUsers from './views/CreateUsers'
import UsersOverview from './views/UsersOverview'
import ViewUsers from './views/ViewUsers'
import ModifyUsers from './views/ModifyUsers'
import UsersActivity from './views/UsersActivity'
import MarginDashboard from './views/MarginDashboard'
import Datacat from './views/Datacat'
import Endpoint from './views/Endpoint'
import Cache from './views/Cache'
import Latent from './views/Latent'
import MostRequested from './views/MostRequested'






function App() {

  return (
  <BrowserRouter>
  <Navbar />
  	<Routes>
	<Route element={<MainLayout/>}>
  		<Route path ='/' element={<Home />} />
  		<Route path ='/create_users' element={<CreateUsers />} />
		<Route path = '/users/' element={<ViewUsers />} />
		<Route path = '/margin_dashboard/' element={<MarginDashboard />} />
		<Route path = '/users/overview/:id' element={<UsersOverview />} />
		<Route path = '/users/modifyusers/:id' element={<ModifyUsers />} />
		<Route path = '/users/activity/:id' element={<UsersActivity />} />
		<Route path = '/datacat' element={<Datacat />} />		
		<Route path = '/datacat/mostrequested' element={<MostRequested />} />		
		
	</Route>
	
	<Route element={<LayoutTwo/>}>
		<Route path = '/datacat/:method/*' element={<Endpoint />} />
		<Route path = '/datacat/cache/:method/*' element={<Cache />} />
		<Route path = '/datacat/latent/' element={<Latent />} />
		
		
	</Route>
	
  	</Routes>
  </BrowserRouter>
  )
}

export default App
