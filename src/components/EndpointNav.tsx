import { NavLink } from 'react-router-dom';

const EndpointNav = ({method, path, endpoint}) => {
	
	return (
	
	<div className='endpoint-header-container'>
	<NavLink to={`/datacat/${method}/${path}`} className={ ({ isActive }) => isActive ? "side-button-active" : "side-button"}>
		{endpoint}
	</NavLink>
	
	<NavLink to={`/datacat/cache/${method}/${path}`} className={ ({ isActive }) => isActive ? "side-button-active" : "side-button"}>
		Cache vs API
	</NavLink>
	</div>
	)
}

export default EndpointNav;