import { Outlet, NavLink } from 'react-router-dom';

function MainLayout() {
	
	return (
	
	<>
	
	<div class='home-parent'>
	
	<div class='home-left'>
	
	<h3 class='catlas-text'>Dashboard</h3>
	
		<div class='sidebar-button-container'>
		
		<NavLink to="/" className={ ({ isActive }) => isActive ? "side-button-active" : "side-button"}>
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
				
		</div>
	
	</div>	
	
	<div class='home-right'>
    <Outlet />
	</div>
	
	</div>
	
	</>
	
	
	)

}

export default MainLayout;
