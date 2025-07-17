import { Outlet, NavLink } from 'react-router-dom';
import { useState } from 'react'

function LayoutTwo() {
	
	const [selectedTrace, setSelectedTrace] = useState(null)
	
	return (
	
	<>
	
	<div className='home-parent'>
	
	<div className='home-left-two'>
	
	{selectedTrace ? (
	
	<div className='dc-side-header-container'>
	<h3 className='catlas-text'>{selectedTrace ? 'Details' : 'Dashboard'}</h3>
	<div className='dc-back-button-container'>
	<button className='dc-back-button' onClick={() => setSelectedTrace(null)}> x </button>
	</div>
	</div>
	
	):( 
	
	<h3 className='catlas-text'>{selectedTrace ? 'Details' : 'Dashboard'}</h3>
	
	
	)}
	
		<div className='sidebar-button-container'>
		
		{selectedTrace ? (

			<div className='trace-details'>
				<p>ID: {selectedTrace.id}</p>
				<p>Endpoint: {selectedTrace.endpoint}</p>
				<p>Duration: {selectedTrace.duration.toFixed(3)}ms</p>
				<p>DB Runtime: {selectedTrace.dbRuntime.toFixed(3)}ms</p>
				<p>View Runtime: {selectedTrace.viewRuntime.toFixed(3)}ms</p>
				<p>Status: {selectedTrace.status}</p>
				<p>Created At: {selectedTrace.createdAt}</p>
				<p>Controller Method: {selectedTrace.controller}#{selectedTrace.action}</p>
				
				<div>
				  <p>Method call:</p>
				  <pre className='trace-breakdown'>  {JSON.stringify(selectedTrace.breakdown, null, 1)?.replace(/[{}"]/g, '')?.trim()}</pre>
				</div>
				
			</div>
			
		) : (

			<>
				<NavLink to="/" className={({ isActive }) => isActive ? "side-button-active" : "side-button"}>
				  Overview
				</NavLink>
				
				<NavLink to="/create_users" className={({ isActive }) => isActive ? "side-button-active" : "side-button"}>
				  Create Users
				</NavLink>
				
				<NavLink to="/users/" className={({ isActive }) => isActive ? "side-button-active" : "side-button"}>
				  View Users
				</NavLink>
				
				<NavLink to="/margin_dashboard/" className={({ isActive }) => isActive ? "side-button-active" : "side-button"}>
				  Margin Dashboard
				</NavLink>
				
				<NavLink to="/datacat/" className={({ isActive }) => isActive ? "side-button-active" : "side-button"}>
				  Datacat
				</NavLink>
			</>
		)}
				
		</div>
	
	</div>	
	
	<div className='home-right'>
    <Outlet context={{selectedTrace, setSelectedTrace}} />
	</div>
	
	</div>
	
	</>
	
	
	)
}
export default LayoutTwo;