import { NavLink } from 'react-router-dom';

const DatacatNav = () => {
	
	return (
	
	<div className='endpoint-header-container'>
	<NavLink to={`/datacat/`} end className={ ({ isActive }) => isActive ? "side-button-active" : "side-button"}>
		Datacat
	</NavLink>
	
	<NavLink to={`/datacat/latent`} className={ ({ isActive }) => isActive ? "side-button-active" : "side-button"}>
		Most Latent
	</NavLink>
	
	<NavLink to={`/datacat/mostrequested`} className={ ({ isActive }) => isActive ? "side-button-active" : "side-button"}>
		Most Requested 
	</NavLink>
	</div>
		
	)
}

export default DatacatNav;